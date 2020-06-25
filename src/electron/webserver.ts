import { ipcMain } from 'electron';
import http from 'http';
import path from 'path';
import fs from 'fs';
import URL from 'url';
import mime from 'mime-types';

const paths: { [key: string]: any } = {};

const serve = http.createServer((req, res) => {
  try {
    const url = URL.parse(req.url || '');
    if (!url.path) {
      throw new Error('not found');
    }

    url.path = decodeURI(url.path);

    const split = url.path.split('/');
    const fileURL = split.length < 3;
    if (fileURL) {
      // file
      const data = paths[url.path];
      if (!data) {
        throw new Error('not found');
      }

      const headers: { [key: string]: any } = {};
      if (data.directory) {
        throw new Error('not found');
      }

      headers['Content-Length'] = fs.lstatSync(data.path).size;
      headers['Content-Type'] = mime.lookup(data.filename);
      res.writeHead(200, headers);
      const stream = fs.createReadStream(data.path);
      stream.pipe(res);
    } else {
      // directory
      const key = '/' + split[1];
      const data = paths[key];
      if (!data) {
        throw new Error('not found');
      }

      const headers: { [key: string]: any } = {};
      const path = data.path + '/' + split.slice(2).join('/');
      const filename = split[split.length - 1];

      // 파일이 없음
      if (!fs.existsSync(path)) {
        throw new Error('not found');
      }

      const stat = fs.lstatSync(path);

      // 폴더임
      if (stat.isDirectory()) {
        throw new Error('not found');
      }

      headers['Content-Length'] = stat.size;
      headers['Content-Type'] = mime.lookup(filename);
      res.writeHead(200, headers);
      const stream = fs.createReadStream(path);
      stream.pipe(res);
    }
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write(err.message);
    res.end();
  }
});

interface ServerAddress {
  port: number;
}

let port: number;
serve.listen(0, () => {
  port = (serve.address() as ServerAddress).port;
  console.info('binding port: ' + port);
});

ipcMain.on('get-port', (event) => {
  event.reply('get-port', port);
});

ipcMain.on('add-file', (event, filePath) => {
  const stat = fs.lstatSync(filePath);
  const filename = path.basename(filePath);

  paths['/' + filename] = {
    directory: stat.isDirectory(),
    filename,
    path: filePath
  };
});

ipcMain.on('del-file', (event, filename) => {
  delete paths['/' + filename];
});

ipcMain.on('refresh', (event) => {
  const files: any[] = [];
  const dirs: any[] = [];

  Object.keys(paths).forEach(key => {
    const data = paths[key];
    if (data.directory) {
      dirs.push(data);
    } else {
      files.push(data);
    }
  });

  event.reply('update', {
    files, dirs
  });
});

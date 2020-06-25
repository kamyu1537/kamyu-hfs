<template>
  <div>
    <vue-headful :title="`File Server [PORT: ${port}]`" />

    <DragFile :active="addFile" :onCancel="toggleAddFile" />
    <Setting :active="setting" :onClose="toggleSetting" />

    <b-loading :is-full-page="true" :active.sync="loading" :can-cancel="false"></b-loading>

    <div class="k-main">
      <div class="k-title">
        File Server
      </div>

      <div class="k-buttons">
        <a @click="toggleAddFile">
          <unicon name="file-plus" fill="black" />
        </a>
        <a @click="toggleSetting">
          <unicon name="setting" fill="black" />
        </a>
      </div>

      <div class="k-content">
        <div class="empty" v-show="files.length < 1 && dirs.length < 1">Empty</div>
        <div class="k-item" data-isList v-for="dir in dirs" :key="dir.filename" @click="copyLink(dir.filename)" @contextmenu="delItem(dir.filename)">
          <unicon name="folder" />
          {{ dir.filename }}
        </div>
        <div class="k-item" data-isList v-for="file in files" :key="file.filename" @click="copyLink(file.filename)" @contextmenu="delItem(file.filename)">
          <unicon name="file" />
          {{ file.filename }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Main.ts">
</script>

<style lang="scss" src="./Main.scss">
</style>

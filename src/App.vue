<template>
  <div id="app">
    <WebsocketsDemo />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WebsocketsDemo from './components/WebsocketsDemo';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

@Component({
  components: { WebsocketsDemo }
})
export default class App extends Vue {}
</script>

<style>
.list-item {
  background: #F6F2F2;
}
.pointer {
  cursor: pointer;
}
#container {
  margin-left: 1em;
  width: 98%;
}
#list {
  height: 81vh;
  overflow-y: auto;
}
#map {
  border: 2px solid #ddd;
  height: 87vh;
}
</style>

<template>
  <config-list />
</template>

<script>
import { reactive, onMounted } from "vue";
import ConfigList from "./components/ConfigList.vue";

export default {
  name: "App",
  components: {
    ConfigList,
  },
  setup() {
    const state = reactive({});
    onMounted(() => {
      // chrome?.tabs
      // ?.executeScript
      // { code: "(function(){return;})();" },
      // ([results]) => {}
      // ();
    });
    return state;
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  background: #54328a;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 250px;
  min-height: 250px;
  padding: 10px;
}
</style>
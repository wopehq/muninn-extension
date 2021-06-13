<template>
  <config-list />
</template>

<script>
import { reactive, onMounted } from "vue";
import ConfigList from "./components/ConfigList.vue";
import executeScript from "./utils/executeScript";
import injectTooltip from "./inject/injectTooltip";
import addHighlight from "./inject/addHighlight";
import { getVisibleConfigList } from "./utils/config";

export default {
  name: "App",
  components: {
    ConfigList,
  },
  setup() {
    const state = reactive({});
    onMounted(() => {
      executeScript(injectTooltip);
      executeScript(addHighlight(getVisibleConfigList()));
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
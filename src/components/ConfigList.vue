<template>
  <div class="config-list">
    <config-item
      v-for="[name, data] in Object.entries(state.configs)"
      :deleteConfig="deleteConfig"
      :updateConfigs="updateConfigs"
      :key="name"
      :name="name"
      :data="data"
    />
  </div>
</template>

<script>
import { reactive } from "vue";
import ConfigItem from "./ConfigItem.vue";
import {
  getConfigs,
  deleteConfigItem,
  setConfigs,
  getVisibleConfigList,
} from "../utils/config";
import addHighlight from "../inject/addHighlight";
import removeHighlight from "../inject/removeHighlight";
import executeScript from "../utils/executeScript";
export default {
  name: "ConfigList",
  components: { ConfigItem },
  props: {},
  setup(props) {
    const state = reactive({ configs: getConfigs() });

    const deleteConfig = (name) => {
      state.configs = deleteConfigItem(name);
      executeScript(removeHighlight);
      executeScript(addHighlight(getVisibleConfigList()));
    };

    const updateConfigs = (configs) => {
      state.configs = setConfigs(configs);
    };

    return {
      state,
      deleteConfig,
      updateConfigs,
    };
  },
};
</script>

<style scoped>
.config-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
</style>
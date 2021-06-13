<template>
  <div class="config-list">
    <config-item
      v-for="[name, data] in Object.entries(state.configs)"
      :deleteConfig="deleteConfig"
      :key="name"
      :name="name"
      :data="data"
    />
  </div>
</template>

<script>
import { reactive } from "vue";
import ConfigItem from "./ConfigItem.vue";
import { getConfigs, deleteConfigItem } from "../utils/config";
export default {
  name: "ConfigList",
  components: { ConfigItem },
  props: {},
  setup(props) {
    const state = reactive({ configs: getConfigs() });

    const deleteConfig = (name) => {
      state.configs = deleteConfigItem(name);
    };

    return {
      state,
      deleteConfig,
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
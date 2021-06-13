<template>
  <div class="config-list">
    <config-item
      v-for="[name, data] in configs"
      :key="name"
      :name="name"
      :data="data"
    />
  </div>
</template>

<script>
import { reactive } from "vue";
import ConfigItem from "./ConfigItem.vue";
import { getConfigs } from "../utils/config";
export default {
  name: "ConfigList",
  components: { ConfigItem },
  props: {},
  setup(props) {
    const configs = reactive(getConfigs());
    console.log(configs);

    return {
      configs: Object.entries(configs),
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
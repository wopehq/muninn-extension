<template>
  <div class="config-item-edit-area">
    <div class="config-item-edit-field">
      <span>Config*:</span>
      <textarea v-model="state.configs" type="text" />
    </div>
    <div class="actions">
      <button class="close" @click="closeForms">Close</button>
      <button @click="update">Save</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import {
  deleteVisibleConfigs,
  getConfigs,
  setConfigs,
  setVisibleConfigs,
} from "../utils/config";
import removeHighlight from "../inject/removeHighlight";
import addHighlight from "../inject/addHighlight";
import executeScript from "../utils/executeScript";

export default {
  name: "ConfigImportForm",
  components: {},
  props: {
    updateConfigs: Function,
    closeForms: Function,
  },
  setup({ updateConfigs, closeForms }) {
    let state = reactive({ configs: JSON.stringify(getConfigs(), null, 2) });

    const update = () => {
      deleteVisibleConfigs();
      const configs = JSON.parse(state.configs || "{}");

      setVisibleConfigs([]);
      setConfigs(configs);
      updateConfigs(configs);

      executeScript(removeHighlight);
      executeScript(addHighlight(visibleConfigs));
    };

    return {
      state,
      update,
      closeForms,
    };
  },
};
</script>

<style scoped>
@import "./form.css";
</style>
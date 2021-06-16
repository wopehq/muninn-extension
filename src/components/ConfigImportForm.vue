<template>
  <div class="config-item-edit-area">
    <div class="config-item-edit-field">
      <span>Config*:</span>
      <textarea v-model="state.configs" type="text" />
    </div>
    <button @click="update">Save</button>
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
  },
  setup({ updateConfigs }) {
    let state = reactive({ configs: JSON.stringify(getConfigs(), null, 2) });

    const update = () => {
      deleteVisibleConfigs();
      const configs = JSON.parse(state.configs || "{}");
      const visibleConfigs = Object.keys(configs);

      setVisibleConfigs(visibleConfigs);
      setConfigs(configs);

      executeScript(removeHighlight);
      executeScript(addHighlight(visibleConfigs));
      updateConfigs(configs);
    };

    return {
      state,
      update,
    };
  },
};
</script>

<style scoped>
.config-item-edit-area {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 8px;
  padding-top: 0;
}

.config-item-edit-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
}

.config-item-edit-field span {
  display: flex;
  flex: 1;
  margin-top: 7px;
  color: #d5bbff;
  font-weight: bold;
  margin-bottom: 2px;
}
.config-item-edit-field input,
.config-item-edit-field textarea {
  display: flex;
  flex: 3;
  resize: none;
  background: #54328a;
  border: 0;
  color: white;
  padding: 7px;
  border-radius: 3px;
}

.config-item-edit-field textarea {
  min-height: 200px;
}

button {
  background: #71a2fc;
  border: 0;
  border-radius: 4px;
  padding: 8px;
  color: white;
  box-shadow: 0px 1px 1px #401781;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

button:hover {
  opacity: 0.8;
}
</style>
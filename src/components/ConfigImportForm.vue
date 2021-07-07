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

.actions {
  display: flex;
  justify-content: flex-end;
}

button {
  background: #71a2fc;
  border: 0;
  display: flex;
  flex: 1;
  justify-content: center;
  border-radius: 4px;
  padding: 8px;
  margin: 5px;
  color: white;
  box-shadow: 0px 1px 1px #401781;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

button.close {
  background: tomato;
}

button:hover {
  opacity: 0.8;
}
</style>
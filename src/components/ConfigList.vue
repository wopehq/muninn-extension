<template>
  <div class="config-list">
    <div class="new-config-area">
      <button @click="openForm"><add-icon /> New Config</button>
      <config-form
        v-if="state.formVisible"
        :name="state.form.name"
        :data="state.form.data"
        :handleUpdate="handleUpdate"
      />
    </div>
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
  setConfigItem,
  getVisibleConfigList,
} from "../utils/config";
import addHighlight from "../inject/addHighlight";
import removeHighlight from "../inject/removeHighlight";
import executeScript from "../utils/executeScript";
import AddIcon from "../icons/plus.vue";
import ConfigForm from "../components/ConfigForm.vue";

export default {
  name: "ConfigList",
  components: { ConfigItem, ConfigForm, AddIcon },
  props: {},
  setup(props) {
    const state = reactive({
      configs: getConfigs(),
      form: { name: "", data: {} },
      formVisible: false,
    });

    const openForm = () => {
      state.formVisible = true;
    };

    const deleteConfig = (name) => {
      state.configs = deleteConfigItem(name);
      executeScript(removeHighlight);
      executeScript(addHighlight(getVisibleConfigList()));
    };

    const updateConfigs = (configs) => {
      state.configs = setConfigs(configs);
    };

    const handleUpdate = async (id, name, data) => {
      state.form = { name: "", data: {} };
      state.formVisible = false;

      if (!name || !data) return;

      if (id !== name) {
        deleteConfigItem(id);
      }

      setConfigItem(name, data);
      executeScript(removeHighlight);
      updateConfigs(getConfigs());
      executeScript(addHighlight(getVisibleConfigList()));
    };

    return {
      state,
      deleteConfig,
      updateConfigs,
      handleUpdate,
      openForm,
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

.new-config-area {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  background-color: #7145b6;
}

.new-config-area svg {
  width: 12px;
  height: 12px;
  fill: white;
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
  margin: 8px;
}

button:hover {
  opacity: 0.8;
}
</style>
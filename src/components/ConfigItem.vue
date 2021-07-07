<template>
  <div class="config-item" :class="{ invisible: !state.isVisible }">
    <div class="config-item-content-area">
      <div class="config-item-name" @click="toggleVisible">
        <invisible-icon v-if="!state.isVisible" class="config-item-invisible" />
        <visible-icon v-if="state.isVisible" class="config-item-visible" />
        <span>{{ name }}</span>
      </div>
      <div class="config-item-action">
        <edit-icon
          :class="{ active: state.editMode }"
          @click="handleEdit"
          class="config-item-edit"
        />
        <trash-icon @click="handleDelete" class="config-item-delete" />
      </div>
    </div>
    <config-form
      v-if="state.editMode"
      :handleUpdate="handleUpdate"
      :data="data"
      :name="name"
    />
  </div>
</template>

<script>
import { reactive } from "vue";
import ConfigForm from "../components/ConfigForm.vue";
import VisibleIcon from "../icons/visible.vue";
import InvisibleIcon from "../icons/invisible.vue";
import TrashIcon from "../icons/trash.vue";
import EditIcon from "../icons/pencil.vue";
import executeScript from "../utils/executeScript";
import removeHighlight from "../inject/removeHighlight";
import addHighlight from "../inject/addHighlight";
import {
  isVisibleConfigItem,
  setVisibleConfigItem,
  deleteVisibleConfigItem,
  getVisibleConfigList,
  setConfigItem,
  deleteConfigItem,
  getConfigs,
} from "../utils/config";

export default {
  name: "ConfigItem",
  components: { ConfigForm, VisibleIcon, InvisibleIcon, TrashIcon, EditIcon },
  props: {
    name: String,
    data: Object,
    deleteConfig: Function,
    updateConfigs: Function,
  },
  setup({ name, deleteConfig, updateConfigs }) {
    let state = reactive({
      isVisible: isVisibleConfigItem(name),
      editMode: false,
    });

    const toggleVisible = () => {
      if (state.isVisible) {
        deleteVisibleConfigItem(name);
        state.isVisible = false;
      } else {
        setVisibleConfigItem(name);
        state.isVisible = true;
      }

      updateConfigs(getConfigs());
      executeScript(removeHighlight);
      executeScript(addHighlight(getVisibleConfigList()));
    };

    const handleDelete = () => {
      deleteConfig(name);
    };

    const handleEdit = () => {
      state.editMode = !state.editMode;
    };

    const handleUpdate = async (id, name, data) => {
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
      toggleVisible,
      handleDelete,
      handleEdit,
      handleUpdate,
    };
  },
};
</script>

<style scoped>
.config-item {
  display: flex;
  flex-direction: column;
  background-color: #7145b6;
  border-radius: 4px;
  margin-bottom: 10px;
}

.config-item-content-area {
  display: flex;
  align-items: center;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 4px;
  margin-bottom: 4px;
  min-height: 20px;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
}

.config-item-name {
  display: flex;
  align-items: center;
}

.config-item.invisible {
  color: #aaa;
}

.config-item-name svg {
  margin-right: 10px;
}

.config-item svg {
  width: 16px;
  height: 16px;
  fill: white;
}

svg.config-item-edit {
  fill: #daf8ff;
}

svg.config-item-edit.active {
  fill: #6ce4ff;
}

svg.config-item-delete {
  fill: tomato;
}

svg.config-item-invisible {
  fill: #aaa;
}

.config-item-action {
  margin-left: auto;
}

.config-item-action svg {
  margin-left: 10px;
}
</style>
<template>
  <div class="config-item" :class="{ invisible: !state.isVisible }">
    <div class="config-item-name" @click="toggleVisible">
      <invisible-icon v-if="!state.isVisible" class="config-item-invisible" />
      <visible-icon v-if="state.isVisible" class="config-item-visible" />
      <span class="config-item-name">{{ name }}</span>
    </div>
    <div class="config-item-action">
      <trash-icon @click="handleDelete" class="config-item-delete" />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import VisibleIcon from "../icons/visible.vue";
import InvisibleIcon from "../icons/invisible.vue";
import TrashIcon from "../icons/trash.vue";
import executeScript from "../utils/executeScript";
import removeHighlight from "../inject/removeHighlight";
import addHighlight from "../inject/addHighlight";
import {
  isVisibleConfigItem,
  setVisibleConfigItem,
  deleteVisibleConfigItem,
  getVisibleConfigList,
} from "../utils/config";

export default {
  name: "ConfigItem",
  components: { VisibleIcon, InvisibleIcon, TrashIcon },
  props: {
    name: String,
    data: Object,
    deleteConfig: Function,
  },
  setup({ name, deleteConfig }) {
    let state = reactive({ isVisible: isVisibleConfigItem(name) });

    const toggleVisible = () => {
      if (state.isVisible) {
        deleteVisibleConfigItem(name);
        state.isVisible = false;
      } else {
        setVisibleConfigItem(name);
        state.isVisible = true;
      }

      executeScript(removeHighlight);
      executeScript(addHighlight(getVisibleConfigList()));
    };

    const handleDelete = () => {
      deleteConfig(name);
    };

    return {
      state,
      toggleVisible,
      handleDelete,
    };
  },
};
</script>

<style scoped>
.config-item {
  display: flex;
  align-items: center;
  background-color: #7145b6;
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

.config-item-name {
  margin-left: 10px;
}

.config-item svg {
  width: 16px;
  height: 16px;
  fill: white;
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
</style>
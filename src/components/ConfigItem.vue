<template>
  <div class="config-item">
    <invisible-icon />
    <span class="config-item-name">{{ name }}</span>
    <div class="config-item-action">
      <trash-icon />
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import VisibleIcon from "../icons/visible.vue";
import InvisibleIcon from "../icons/invisible.vue";
import TrashIcon from "../icons/trash.vue";
export default {
  name: "ConfigItem",
  components: { VisibleIcon, InvisibleIcon, TrashIcon },
  props: { name: String, data: Object },
  setup(props) {
    return {};
  },
};
</script>

<style scoped>
.config-item {
  display: flex;
  align-items: center;
  background-color: #5887e0;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 4px;
  margin-bottom: 4px;
  min-height: 20px;
  padding: 5px;
  font-size: 14px;
}

.config-item-name {
  margin-left: 10px;
}

.config-item svg {
  width: 15px;
  height: 15px;
  fill: white;
}

.config-item-action {
  margin-left: auto;
}
</style>
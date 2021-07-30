<template>
  <div class="config-item-edit-area">
    <div class="config-item-edit-field">
      <span>Name*:</span>
      <input v-model="state.name" type="text" />
    </div>
    <div class="config-item-edit-field">
      <span>Parent:</span>
      <input v-model="state.parent" type="text" />
    </div>
    <div class="config-item-edit-field">
      <span>Config*:</span>
      <textarea v-model="state.schema" type="text" />
    </div>
    <div class="actions">
      <button class="close" @click="closeForms">Close</button>
      <button @click="update">Save</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "ConfigForm",
  components: {},
  props: {
    name: String,
    data: Object,
    handleUpdate: Function,
    closeForms: Function,
  },
  setup({ name, data, handleUpdate, closeForms }) {
    let state = reactive({
      name,
      parent: data.parent,
      schema: JSON.stringify(data.schema, null, 2),
    });

    const update = () => {
      handleUpdate(name, state.name, {
        parent: state.parent,
        schema: state.schema ? JSON.parse(state.schema) : null,
      });
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
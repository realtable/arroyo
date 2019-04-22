<template>
  <div class="d-flex mx-0 my-2 rounded-lg feed-item">
    <div class="flex-grow-1 my-auto text-center">{{ item }}</div>
    <div class="p-2">
      <button type="button" class="btn btn-outline-dark btn-sm" v-on:click="$emit('remove-signal', index)">
        <b>&times;</b>
      </button>
    </div>
  </div>
</template>

<style>
  .feed-item {
    background-color: #eee;
  }

  .remove-feed {
    color: #999 !important;
  }

  .remove-feed:hover {
    color: #777 !important;
  }
</style>

<script>
export default {
  name: 'Feed',
  props: {
    item: String,
    index: Number
  }
}
</script>

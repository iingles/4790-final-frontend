<template>
  <b-btn  variant="link">
    <b-icon v-if="liked" icon="heart-fill" style="color: #fc4343!important"></b-icon>
    <b-icon v-else icon="heart"></b-icon>
    <b-badge variant="light">{{ likes }}</b-badge>
  </b-btn>
</template>

<script>
export default {
  props: {
    postId: String,
    userId: String
  },
  data: () => {
    return {
      liked: false,
      likes: 0
    }
  },
  methods: {
    // update likes in post and in user
  }
}
</script>

<style lang="less" scoped>
    .btn:hover {
        color: #fc4343!important;
    }

    .badge {
        color: #a1a1a1!important;
    }
</style>

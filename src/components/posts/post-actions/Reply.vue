<template>
    <b-btn variant="link" @click="reply()">
      <b-icon icon="chat-dots"></b-icon>
      <b-badge variant="light">{{ replies }}</b-badge>
    </b-btn>
</template>

<script>
export default {
  props: {
    post: Object
  },
  data: () => {
    return {
      replies: 0
    }
  },
  methods: {
    reply () {
      // Do modal stuff here
    }
  }
}
</script>

<style scoped>
    .btn:hover {
        color: #007BFF!important;
    }

    .badge {
        color: #a1a1a1!important;
    }
</style>

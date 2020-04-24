<template>
   <b-btn variant="link">
       <b-icon icon="arrow-repeat"></b-icon>
       <b-badge variant="light">{{ reposts }}</b-badge>
   </b-btn>
</template>

<script>
export default {
  data: () => {
    return {
      reposts: 0
    }
  }
}
</script>

<style lang="less" scoped>
    .btn:hover {
        color: #43e943!important;
    }

    .badge {
        color: #a1a1a1!important;
    }
</style>

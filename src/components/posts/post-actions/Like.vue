<template>
  <ApolloMutation
    :mutation="require('../../../graphql/UpdateLikes.gql')"
    :variables="{
      postId,
      userId,
      action
    }"
    @done="liked=!liked"
  >
    <template v-slot="{ mutate }">
      <b-btn @click="mutate()" variant="link">
        <transition name="bounce">
          <b-icon v-if="liked" key="liked" icon="heart-fill" style="color: #fc4343!important"></b-icon>
          <b-icon v-else key="unliked" icon="heart"></b-icon>
        </transition>
        <b-badge variant="light">{{ numLikes.length }}</b-badge>
      </b-btn>
    </template>
  </ApolloMutation>
</template>

<script>

export default {
  props: {
    postId: String,
    userId: String,
    likes: Array
  },
  data: () => {
    return {
      numLikes: [],
      liked: false,
      action: ''
    }
  },
  mounted () {
    const vm = this
    vm.numLikes = vm.likes
    // If the likes include the current userId
    // set "liked" to false, and the action to take to 'like'.
    if (!vm.likes.find(el => el._id === vm.userId)) {
      vm.liked = false
      vm.action = 'like'
    } else {
      vm.liked = true
      vm.action = 'unlike'
    }
  },
  watch: {
    likes () {
      const vm = this
      vm.numLikes = vm.likes
    }
  },
  methods: {
    onLikesUpdated () {
      console.log('updated')
    }
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

    .btn {
      font-size: 2rem;
      color: #a1a1a1;

      .badge-light {
          color: #a1a1a1!important;
      }

      @media screen and (min-width: 992px) {
          font-size: 1.4rem;
      }
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  // .bounce-leave-active {
  //   position: static;
  //   animation: bounce-in .5s reverse;
  // }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>

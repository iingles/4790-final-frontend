<template>
    <section>
      <ApolloQuery
        :query="require('../graphql/Posts.gql')"
        @result="setFeedStack"
      >
        <ApolloSubscribeToMore
          :document="require('../graphql/NewPostSub.gql')"
          :updateQuery="onPostAdded"
        />
        <ApolloSubscribeToMore
          :document="require('../graphql/UpdatePostSub.gql')"
          :updateQuery="onPostUpdated"
        />
        <ApolloSubscribeToMore
          :document="require('../graphql/DeletePostSub.gql')"
        />
        <template v-slot="{ result: { error, data }, isLoading }">
          <!-- Loading -->
          <div v-if="isLoading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <transition-group name="post-list" tag="div" v-else-if="feedStack.length > 0" class="result apollo">
              <div class="post-wrapper" v-for="post in feedStack" :key="post._id">
                <SinglePost
                  :post="post"
                  :token="token"
                  :userId="userId"
                />
              </div>
          </transition-group>
          <!-- No result -->
          <div v-else class="no-result apollo">There isn't anything in your feed :(</div>
        </template>
      </ApolloQuery>
    </section>
</template>

<script>

import SinglePost from './posts/SinglePost'
import { bus } from '../main'

export default {
  data: () => {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      feedStack: []
    }
  },
  components: {
    SinglePost
  },
  created () {
    bus.$on('deleted', (postId) => {
      const vm = this
      // Subscriptions aren't working the way I want, so remove the post from the
      // feedStack manually for now
      if (vm.feedStack.find(el => el._id === postId)) {
        const idx = vm.feedStack.findIndex(el => el._id === postId)
        vm.feedStack.splice(idx, 1)
      }
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.feedStack = this.$store.getters.feed
    })
  },
  watch: {
    $route: 'setFeedStack'
  },
  methods: {
    setFeedStack ({ data }) {
      const vm = this
      this.$store.dispatch('loadFeed', data.posts.posts)
      vm.feedStack = this.$store.getters.feed
    },
    onPostAdded (previousResult, { subscriptionData }) {
      const vm = this
      const newPost = subscriptionData.data.newPost

      this.$store.dispatch('newPost', newPost)
      vm.feedStack = this.$store.getters.feed
      return vm.feedStack
    },
    onPostUpdated (previousPostData, { subscriptionData }) {
      const vm = this
      const prevId = subscriptionData.data.updatePost._id

      if (vm.feedStack.find(el => el._id === prevId)) {
        // Just to make sure that the edited post shows up,
        // Find out if its currently being displayed (in the feed stack)
        // and update it manually.
        const idx = vm.feedStack.findIndex(el => el._id === prevId)
        vm.feedStack[idx].content = subscriptionData.data.updatePost.content
      }
    },
    onPostDeleted (prev, { subscriptionData }) {
      console.log('deleted')
      console.log(subscriptionData)
    }
  }
}
</script>

<style scoped>
.post-list-move {
  transition: transform 2.5s;
}

.post-list-enter-active, .post-list-leave-active {
   transition: all 1.5s;
}

.post-list-enter, .post-list-leave-to {
  opacity: 0;
  z-index: 1;
  transform: translateY(-30px);
}

</style>

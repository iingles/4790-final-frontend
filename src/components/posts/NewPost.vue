<template>
    <b-card
    title="Write a new post"
    class="mb-1"
    >
      <ApolloMutation
      :mutation="require('../../graphql/CreatePost.gql')"
      :variables="{
        content: newPostData.content,
        creatorId: newPostData.creator
      }"
      @done="createPost"
      >
      <template v-slot="{ mutate, loading, error }">
          <b-form class="d-flex flex-column">
              <b-form-group
              label="What do you want to say?"
              >
                  <b-form-textarea
                  rows="3"
                  max-rows="6"
                  v-model="newPostData.content"
                  >
                  </b-form-textarea>
              </b-form-group>
              <b-button class="align-self-end" @click="!newPostData.content ? 'Cannot be empty' : mutate()" pill variant="primary">Post</b-button>
          </b-form>
          <p v-if="error">An error occured: {{ error }}</p>
        </template>
      </ApolloMutation>
    </b-card>
</template>

<script>
export default {
  data: () => {
    return {
      newPostData: {
        creator: localStorage.getItem('userId'),
        content: ''
      },
      local: localStorage.getItem('userId')
    }
  },
  methods: {
    createPost (postData) {
      const vm = this
      vm.newPostData.content = ''
    }
  }
}
</script>

<style scoped>
    .post {
        padding: 1rem;
    }
</style>

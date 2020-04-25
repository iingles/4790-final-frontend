<template>
  <div>
    <b-btn @click="showModal" variant="link"><b-icon icon="pencil"></b-icon>Edit</b-btn>
    <b-modal hide-footer :ref="`${postId}-modal-edit`"  centered title="Edit Post">
       <ApolloMutation
        :mutation="require('../../../graphql/UpdatePost.gql')"
        :variables="{
          id: postId,
          creatorId: postData.creatorId,
          content: postData.content
        }"
        @done="hideModal()"
      >
        <template v-slot="{ mutate }">
          <b-form @submit.prevent="mutate()">
              <b-textarea
              v-model="postData.content"
              >
              </b-textarea>
              <template v-if="content !== postData.content && postData.content !== ''">
                <b-button type="submit" class="mt-4 align-self-end" pill variant="primary">Post</b-button>
              </template>
          </b-form>
        </template>
      </ApolloMutation>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    token: String,
    postId: String,
    content: String,
    creator: String
  },
  data: () => {
    return {
      postData: {
        creatorId: '',
        content: ''
      }

    }
  },
  created () {
    this.postData.content = this.content
    this.postData.creatorId = this.creator
  },
  methods: {
    showModal () {
      const vm = this
      this.$refs[`${vm.postId}-modal-edit`].show()
    },

    hideModal () {
      const vm = this
      this.$refs[`${vm.postId}-modal-edit`].hide()
    }
  }
}
</script>

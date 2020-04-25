<template>
    <div>
        <b-btn variant="link" @click="showModal"><b-icon icon="trash"></b-icon>Delete</b-btn>

        <b-modal hide-footer :ref="`${postId}-modal-delete`"  centered title="Delete Post">
            <ApolloMutation
            :mutation="require('../../../graphql/DeletePost.gql')"
            :variables="{
              id: postId
             }"
             @done="hideModal()"
             @error="error()"
            >
              <p>Are you sure you want to delete this post?</p>
              <template  v-slot="{ mutate }" >
                  <b-btn @click="hideModal">Cancel</b-btn>
                  <b-btn @click.prevent="mutate()">Delete</b-btn>
              </template>
              <template v-if="errorMsg">
                {{ errorMsg }}
              </template>
            </ApolloMutation>
        </b-modal>
    </div>
</template>

<script>
export default {
  props: {
    postId: String,
    token: String
  },
  data: () => {
    return {
      errorMsg: ''
    }
  },
  methods: {
    showModal () {
      const vm = this
      this.$refs[`${vm.postId}-modal-delete`].show()
    },

    hideModal () {
      const vm = this
      this.$refs[`${vm.postId}-modal-delete`].hide()
    },

    error (err) {
      const vm = this
      vm.errorMsg = err
    }
  }
}
</script>

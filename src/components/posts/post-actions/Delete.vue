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
              <template  v-slot="{ mutate }" >
                <div class="pl-3 pr-3">
                  <b-row class="pt-2 pb-2">
                    <p>Are you sure you want to delete this post?</p>
                  </b-row>
                  <b-row class="d-flex" align-h="end">
                    <b-btn pill class="mr-3" @click="hideModal">Cancel</b-btn>
                    <b-btn pill variant="primary" @click.prevent="mutate()">Delete</b-btn>
                  </b-row>
                </div>
              </template>
              <template v-if="errorMsg">
                {{ errorMsg }}
              </template>
            </ApolloMutation>
        </b-modal>
    </div>
</template>

<script>
import { bus } from '../../../main'

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
      bus.$emit('deleted', vm.postId)
    },

    error (err) {
      const vm = this
      vm.errorMsg = err
    }
  }
}
</script>

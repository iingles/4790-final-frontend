<template>
    <b-col cols="12" sm="12" md="4" lg="4" class="d-flex flex-column main-content" align-h="center">
      <b-card title="Login">
        <b-row>
          <b-col>
            <ApolloMutation
              :mutation="require('../graphql/Login.gql')"
              :variables="{
                email: authData.email,
                password: authData.password
              }"
              @error="notAuth"
              @done="authCheck"
            >
              <template v-slot="{ mutate }">
                <b-form class="d-flex flex-column" @submit.prevent="mutate()" @keyup.enter="mutate()">
                  <b-form-group id="input-group-1" label="Email" label-for="email">
                    <input class="pt-2 pb-2 pl-2" id="email" type="email" v-model="authData.email" />
                  </b-form-group>
                  <b-form-group id="input-group-2" label="Password" label-for="password">
                    <input class="pt-2 pb-2 pl-2" id="password" type="password" v-model="authData.password" />
                  </b-form-group>
                  <!-- <b-button variant="link" href="/account-recovery">Forgot Password?</b-button> -->
                  <b-button type="submit" class="align-self-end" pill variant="outline-primary">log in</b-button>
                </b-form>
              </template>
            </ApolloMutation>
           </b-col>
         </b-row>
      </b-card>
      <p>
        Need an account?
        <router-link to="/signup">&nbsp;Sign up here.</router-link>
      </p>
    </b-col>
</template>

<script>
import { bus } from '../main'

export default {
  data: () => {
    return {
      authData: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    bus.$on('demoUser', ({ email, password }) => {
      const vm = this
      vm.authData.email = email
      vm.authData.password = password
    })
  },
  methods: {
    notAuth (returnData) {
      console.log('not authenticated')
    },
    authCheck (returnData) {
      // This isn't the most secure option, just getting the app working for now
      localStorage.setItem('token', returnData.data.login.accessToken)
      localStorage.setItem('userId', returnData.data.login.userId)

      this.$router.push('/home').catch(err => err)
    }
  }
}
</script>

<style lang="less" scoped>
 input {
   width: 100%;
 }
</style>

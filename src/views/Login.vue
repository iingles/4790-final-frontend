<template>
    <b-col cols="12" sm="12" md="11" lg="6" class="d-flex flex-column main-content" align-h="center">
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
                <b-form @submit.prevent="mutate()" @keyup.enter="mutate()">
                  <b-form-group id="input-group-1" label="Email" label-for="email">
                    <input id="email" type="email" v-model="authData.email" />
                  </b-form-group>
                  <b-form-group id="input-group-2" label="Password" label-for="password">
                    <input id="password" type="password" v-model="authData.password" />
                  </b-form-group>
                  <b-button variant="link" href="/account-recovery">Forgot Password?</b-button>
                  <b-button type="submit" pill variant="outline-primary">log in</b-button>
                </b-form>
              </template>
            </ApolloMutation>
           </b-col>
            <b-col class="demo-users">
            <h3>Demo Users</h3>
            <b-button @click="setDemoUser('jerry90@example.com', 'Morrison90^(')">Log in as Jerry Morrison</b-button>
            <b-button @click="setDemoUser('brandon94@example.com', 'Obrien94!%')">Log in as Brandon Obrien</b-button>
            <b-button @click="setDemoUser('sean.day@example.com', 'Day86(')">Log in as Sean Day</b-button>
            <b-button @click="setDemoUser('virginia90@example.com', 'Nguyen90&(')">Log in as Virginia Nguyen</b-button>
            <b-button @click="setDemoUser('kathryn-91@example.com', 'Carroll91(%')">Log in as Kathryn Carroll</b-button>
            <b-button @click="setDemoUser('christina_97@example.com', 'Herrera97%)')">Log in as Christina Herrera</b-button>
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

export default {
  data: () => {
    return {
      authData: {
        email: '',
        password: ''
      }
    }
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
    },
    setDemoUser (email, password) {
      const vm = this
      vm.authData.email = email
      vm.authData.password = password
    }
  }
}
</script>

<style lang="less" scoped>
  .demo-users .btn {
    margin: .5rem 0;
  }
</style>

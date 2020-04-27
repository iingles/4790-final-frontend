<template>
    <div>
        <h3>Demo Users</h3>
        <b-dropdown variant="primary" text="Select a Demo User">
            <b-dropdown-item v-for="(person, key) in peoples" :key="key" @click="userSelected(person.email, person.password)">
                {{ person.firstName }} {{ person.lastName }}
            </b-dropdown-item>
        </b-dropdown>
    </div>
</template>

<script>
import { people } from '../../data/people'
import { bus } from '../main'

export default {
  data: () => {
    return {
      peoples: []
    }
  },
  mounted () {
    const vm = this

    for (let i = 0; i < people.length; i++) {
      const person = {
        firstName: people[i].firstName,
        lastName: people[i].lastName,
        email: people[i].email,
        password: people[i].password
      }
      vm.peoples.push(person)
    }
  },
  methods: {
    userSelected (email, password) {
      bus.$emit('demoUser', { email, password })
    }
  }
}
</script>

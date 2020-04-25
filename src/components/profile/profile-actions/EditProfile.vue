<template>
    <div>
        <b-button v-b-modal.editProfileModal pill variant="outline-primary" href="">Edit Profile</b-button>
        <!-- Edit profile modal window -->
        <b-modal hide-footer id="editProfileModal" title="Edit Profile">
            <ApolloMutation
                :mutation="require('../../../graphql/EditProfile.gql')"
                :variables="{
                    id: userInput._id,
                    email: userInput.email,
                    firstName: userInput.firstName,
                    lastName: userInput.lastName,
                    bio: userInput.bio,
                    status: userInput.status
                }"
            >
                <template v-slot="{ mutate }">
                    <b-form @submit.prevent="mutate()">
                        <b-form-group
                        id="profile-group-1"
                        label="First Name"
                        label-for="firstname"
                        >
                            <input
                                v-model.lazy="userInput.firstName"
                                type="text"
                                name="firstName"
                            >
                        </b-form-group>
                        <b-form-group
                        id="profile-group-2"
                        label="Last Name"
                        label-for="lastname"
                        >
                            <input
                                v-model.lazy="userInput.lastName"
                                type="text"
                                name="lastName"
                            >
                        </b-form-group>
                        <b-form-group
                        id="profile-group-3"
                        label="Bio"
                        label-for="bio"
                        >
                            <b-form-textarea
                                rows="3"
                                max-rows="3"
                                v-model="userInput.bio"
                            >
                            </b-form-textarea>
                        </b-form-group>
                        <b-form-group
                        id="profile-group-4"
                        label="Status"
                        label-for="status"
                        >
                            <b-form-textarea
                                rows="3"
                                max-rows="3"
                                v-model="userInput.status"
                            >
                            </b-form-textarea>
                        </b-form-group>
                        <b-btn type="submit" pill>Cancel</b-btn>
                        <b-btn type="submit" pill variant="primary">Submit</b-btn>
                    </b-form>
                </template>
            </ApolloMutation>
        </b-modal>
    </div>
</template>

<script>
export default {
  props: {
    userData: Object
  },
  data: () => {
    return {
      userInput: {
        firstName: '',
        lastName: '',
        bio: '',
        status: ''
      }
    }
  },
  watch: {
    userData () {
      this.userInput = this.userData
      console.log(this.userInput)
    }
  }
}
</script>

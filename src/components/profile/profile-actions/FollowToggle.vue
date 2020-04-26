<template>
  <div>
    <template v-if="!isFollowing">
      <b-button @click="changeFollow(profileId, 'add')" pill variant="outline-primary">Follow</b-button>
    </template>
    <template v-else>
      <b-button @click="changeFollow(profileId, 'remove')" pill variant="outline-primary">Unfollow</b-button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    isFollowing: Boolean,
    profileId: String
  },
  methods: {
    changeFollow(id, act) {
      console.log(id, act, localStorage.getItem("userId"));
      const graphQLQuery = {
        query: `
          mutation {
            updateFollows(id: "${localStorage.getItem(
              "userId"
            )}", followInput: { _id:"${
          this.$route.params.id
        }", action: "${act}"} ) {
              following {
                _id
            }
          }
        }`
      };

      fetch("http://206.189.215.72:4000/graphql", {
        method: "POST",
        body: JSON.stringify(graphQLQuery),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(resData => {
          if (resData.errors) {
            throw new Error("Failed to update followers");
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

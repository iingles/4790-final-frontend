<template>
    <b-form >
        <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text>
                <b-icon icon="search"
                :model="searchString"
                ></b-icon>
            </b-input-group-prepend>
            <b-form-input type="search" placeholder="Search"></b-form-input>
        </b-input-group>
    </b-form>
</template>

<script>
export default {
  data: () => {
    return {
      results: [],
      searchString: ''
    }
  },
  methods: {
    async executeSearch (params) {
      // Take in search parameters
      // Execute this function
      // ???
      // Profit!
    }
  }
}
</script>

<template>
    <b-navbar fixed="top" fluid class="main-nav container-tw">
        <b-container class="d-flex justify-content-center">
            <b-row class="d-flex">
                <b-col cols="10" sm="10" md="10" lg="12">
                    <Search />
                </b-col>
                <b-col cols="2" sm="2" md="2">
                </b-col>
            </b-row>
        </b-container>
    </b-navbar>
</template>

<script>
import Search from '../Search'

export default {
  components: {
    Search
  }
}
</script>

<style lang="less" scoped>
    .main-nav {
        background: #fff;
    }
</style>

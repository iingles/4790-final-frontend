<template>
    <div>
        <b-container fluid class="dark-grad p-5">
            <b-container class="d-flex justify-content-center">
                <div>
                    <header class="section-header">
                       <h1>Twitter Clone</h1>
                    </header>
                    <b-button pill variant="primary" href="/signup">sign up</b-button>
                </div>
            </b-container>
        </b-container>
        <b-container fluid class="p-5">
            <b-container class="d-flex justify-content-center">
                <div>
                    <header class="section-header">
                        <h1>Have an account?</h1>
                    </header>
                    <b-button pill variant="outline-primary" href="/login">log in</b-button>
                </div>
            </b-container>
        </b-container>
    </div>
</template>

<style lang="less" scoped>

    .dark-grad {
        background: rgb(62,80,91);
              color: #fff;
    }

</style>

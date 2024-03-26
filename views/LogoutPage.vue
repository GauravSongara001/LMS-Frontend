<template>
    <div class="container">

    </div>
</template>

<script>
import store from '../src/stores'
export default {
    data() {
        return {
            
        }
    },

    created() {
        store.dispatch('logout');
        localStorage.clear();
        this.$router.push('/login')
    }
}
</script>

<style>

</style>
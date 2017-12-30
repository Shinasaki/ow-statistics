<template>
    <div>
        Logout
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'logout',
    created() {
        this.clearProfile()
        this.$router.push({ name: 'index' })
    },
    methods: {
        ...mapMutations(['clearProfile']),
    }
}
</script>

<style>

</style>

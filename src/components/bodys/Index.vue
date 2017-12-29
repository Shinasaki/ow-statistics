<template>
    <div class="app-index">
        <div class="block text-center">
            <div v-if="!user">
                <button type="button" class="button" @click="getToken()">
                    LOGIN WITH BLIZZARD
                </button>
            </div>
            <div v-else>
                
                User Profile
            </div>
        </div>
        <div class="block">
            Block1
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'index',
    data() {
        return {
            user: null,
        }
    },
    created() {
    },
    methods: {
        ...mapActions(['getToken']),
    }
}
</script>

<style>
</style>

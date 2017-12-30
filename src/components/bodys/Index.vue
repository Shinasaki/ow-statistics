<template>
    <div class="app-index">
        <div class="block text-center">
            <div v-if="!user">
                <a href="https://grabkeys.net:3443/bnet/login" @click="loadingActive()">
                    <button type="button" class="button">
                        LOGIN WITH BLIZZARD
                    </button>
                </a>
            </div>
            <div v-else>
                <button type="button" class="button" @click="logout()">Logout</button>
                <router-link v-if="user.profile.permission >= 2" :to="{ name: 'backend'}"><button class="button">Backend</button></router-link>
            </div>
        </div>
        <div class="block">
            Block1
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'index',
    data() {
        return {
        }
    },
    created() {

    },
    computed: {
        ...mapState(['user', 'token'])
    },
    methods: {
        ...mapMutations(['clearProfile', 'loadingActive']),
        logout () {
            window.history.replaceState(null, null, window.location.pathname);
            this.loadingActive();
            setTimeout(this.loadingActive, 500);
            setTimeout(this.clearProfile(), 1000);
        }
    }
}
</script>

<style>
</style>

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
            <div class="row p-0 m-0 " v-else>
                <div class="col-12 col-md-3 block-portrait">
                    <div class="row">
                        <div class="col-3 text-left"><img v-bind:src="user.users.overwatch.portrait"></div>
                        <div class="col-9 text-left"><p><b>{{ user.users.blizzard.tag }} </b></p></div>
                    </div>
                </div>
                <div v-if="user.users.overwatch.competitive.rank" class="col-12 col-md-3 block-rank text-left">
                    <div class="row">
                        <div class="col-3 text-left pl-4"><img v-bind:src="user.users.overwatch.competitive.rank_img"></div>
                        <div class="col-9 text-left" ><p ><b>{{ user.users.overwatch.competitive.rank }} SR</b></p></div>
                    </div>
                    
                    
                </div>
                <div v-else class="col-12 col-md-3 block-rank">
                    <div class="row">
                        <div class="col-3 text-left"><img src="../../assets/img/unrank.png"></div>
                        <div class="col-9 text-left"><p><b>Jeff said 'unrank'. </b></p></div>
                    </div>
                </div>

                <div class="col block-menu" v-if="user.profile.blizzard.permission >= 2">
                    <router-link :to="{ name: 'backend'}"><button class="button">Backend</button></router-link>
                </div>
                <div class="col block-menu">
                    <button type="button" class="button" @click="logout()">Logout</button>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="block-title">
                Overwatch Thailand Rank Statistics
                <div class="block-title-sub" style="font-size: 15px">Dataset: <b>{{ all }}</b></div>
                <div class="block-title-sub" v-if="user" style="font-size: 15px">Your Rank: <b>{{ user.users.blizzard.userRank }}</b></div>
            </div>
            <hr>
            <div class="p-4"><canvas ref="canvas" width="900"></canvas></div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import VueCharts from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
export default {
    name: 'index',
    extends: Pie,
    data() {
        return {
            all: 0
        }
    },
    created() {
    },
    computed: {
        ...mapState(['user', 'token', 'rank'])
    },
    methods: {
        ...mapMutations(['clearProfile', 'loadingActive', 'updateRank']),
        logout () {
            window.history.replaceState(null, null, window.location.pathname);
            this.loadingActive();
            setTimeout(this.loadingActive, 500);
            setTimeout(this.clearProfile(), 1000);
        },
    },
    mounted () {
    this.$http.get('https://grabkeys.net:3443/bnet/rank').then( response => {
        if (response.status == 200 && response.body) {
            this.all = response.body.all;
            this.renderChart(
                {
                    labels: ['Unrank', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'],
                    datasets: [{
                    backgroundColor: [ '#3d3d3d', '#73413a', '#818380', '#bd9b41', '#fdfdfd', '#babefe', '#ffc047', '#ffff73'],
                    data: [
                        response.body.unrank, 
                        response.body.bronze, 
                        response.body.silver, 
                        response.body.gold, 
                        response.body.platinum, 
                        response.body.diamond, 
                        response.body.master, 
                        response.body.grandmaster
                    ]
                    }]
                }, 
                {
                    responsive: true, 
                    maintainAspectRatio: false,
                    lineWidth: 3,
                    legend: {
                        labels: {
                            fontColor: '#F9F9FA'
                        },
                        position: 'bottom',
                        fullWidth: true, 
                    }
                }
            )
        }
    })
  }
}

</script>

<style>
.block-portrait, .block-rank, .block-menu {
    
    background: #2F2F5A;
    padding: 0;
    margin: 5px;
    border-radius: 30px;
}
    .block-portrait span, .block-rank span {
        margin-left: 10px;
        position: relative;
    }
    .block-portrait p, .block-rank p {
        display: inline-block;
        max-width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; 
        position: absolute;
        top: 48%;
        transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
    }
.block-portrait img, .block-rank img{
    width: 60px;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
}

.block-menu .button {
    padding: 15px;
    margin: 0;
    border-radius: 30px;
    width: 100%;
}
</style>

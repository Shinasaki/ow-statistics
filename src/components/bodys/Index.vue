<template>
    <div class="app-index mb-4">
        <div class="block text-center">
            <div v-if="!user">
                <a href="https://grabkeys.net:3443/bnet/login" @click="loadingActive()">
                    <button type="button" class="button">
                        LOGIN WITH BLIZZARD
                    </button>
                </a>
            </div>
            <div class="row p-0 m-0" v-else>
                <div class="col-12 col-lg-3 block-portrait">
                    <div class="row p-0">
                        <div class="col-3 text-left"><img v-bind:src="user.overwatch.portrait"></div>
                        <div class="col-9 text-left"><p><b>{{ user.blizzard.tag }} </b></p></div>
                    </div>
                </div>
                <div v-if="user.overwatch.competitive.rank" class="col-12 col-lg-3 block-rank text-left">
                    <div class="row p-0">
                        <div class="col-3 text-left"><img v-bind:src="user.overwatch.competitive.rank_img"></div>
                        <div class="col-9 text-left"><p ><b>{{ user.overwatch.competitive.rank }} SR</b></p></div>
                    </div>
                </div>
                <div v-else class="col-12 col-lg-3 block-rank">
                    <div class="row p-0">
                        <div class="col-3 text-left"><img src="../../assets/img/unrank.png"></div>
                        <div class="col-9 text-left"><p><b>Jeff said 'unrank'. </b></p></div>
                    </div>
                </div>

                <div class="col-12 col-lg block-menu p-0" v-if="user.profile.permission >= 2">
                    <router-link :to="{ name: 'backend'}"><button class="button">Backend</button></router-link>
                </div>
                <div class="col-12 col-lg block-menu p-0">
                    <button type="button" class="button" @click="logout()">Logout</button>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="block-title">
                Overwatch Thailand Rank Statistics
                <div class="block-title-sub" style="font-size: 15px">Dataset: <b>{{ all }}</b></div>
                <div class="block-title-sub" v-if="user" style="font-size: 15px">Your Rank: <b>{{ user.profile.userRank }}</b></div>
            </div>
            <hr>
            <div class="p-4"><canvas ref="canvas" width="900"></canvas></div>
        </div>
        <div class="block">
            <div class="block-title">
                Top 100
            </div>
            <table class="table table-responsive block-table">
                <tr v-for="item in top" class="row m-0">
                    <td class="col-2"><img v-bind:src="item.portrait" style="height: 50px; border-radius: 50%;"></td>
                    <td class="col">{{ item.tag }}</td>
                    <td class="col">{{ item.rank }} SR</td>
                    <td class="col mobile">{{ item.time }}</td>
                    <td class="col-1 mobile">#{{ item.top }}</td>
                </tr>
            </table>
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
        ...mapState(['user', 'token', 'rank', 'top'])
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
.block-table {margin-top: 15px; border-spacing: 0px; border-collapse: separate; border: none !important;}
.block-table td:not(:first-child) { padding: 25px; }
.block-table tr { border-radius: 10px }
.block-table tr:first-child td:first-child { border-top-left-radius: 10px;}
.block-table tr:first-child td:last-child { border-top-right-radius: 10px;}
.block-table tr:last-child td:first-child { border-bottom-left-radius: 10px;}
.block-table tr:last-child td:last-child { border-bottom-right-radius: 10px;}
.block-table tr:nth-child(even) { background: #9DA8CA}
.block-table tr:nth-child(odd) { background: #2f2f5a}

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
        max-width: 70%;
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



@media screen and (max-width: 768px) {
    .mobile {
        display: none;
    }
    .block-portrait p, .block-rank p {
        left: 25%;
        max-width: 60%;
    }
}
@media screen and (max-width: 1024px) and (min-width: 768px) {
    .block-portrait p, .block-rank p {
        left: 25%;
        max-width: 60%;
    }
}
@media screen and (min-width: 1024px) {
    .block-portrait p, .block-rank p {
        padding-left: 30px;
    }
}
</style>

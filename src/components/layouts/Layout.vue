<template>
    <div class="row m-0">
        <div class="app-layout col-11 col-md-10 col-lg-9 mx-auto">
            <transition name="loading-fade">
                {{ token }}
                <div v-if="(token && !user) || loading" class="loading">
                    <div class="loader block-center">
                        <div id="largeBox"></div>
                        <div id="smallBox"> </div>
                    </div>
                </div>
            </transition>
            <transition name="component-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>


</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'layout',
    data() {
        return {
        }
    },
    created() {
        // เจอ token
        if (getUrlVars()["token"]) {
            this.updateToken(getUrlVars()["token"])
        } 
        if (localStorage.token !== 'undefined' && localStorage.token !== undefined) {
            this.updateToken(localStorage.token)
            this.updateProfile(localStorage.token)
        }
    },
    updated() {

    },
    
    computed: {
        ...mapState(['user', 'token', 'loading'])
    },
    methods: {
        ...mapMutations(['updateProfile', 'clearProfile', 'updateToken']),
    }
}



function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
</script>











<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
.loading-fade-enter-active, .loading-fade-leave-active {
  transition: opacity 0.3s ease;
}
.loading-fade-enter, .loading-fade-leave-to {
  opacity: 0;
}

/* set element float on middle of screen */
.block-center {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    /* transition: 0.3s; */
}

/* Global */
* { 
    font-family: 'Open Sans', 'Prompt', sans-serif; 
    color: #F9F9FA;
}

body, html {
    height: 100%;
    min-height: 100%;
    background: #2F2F5A;
}

/* Block */
.block {
    background: #3E5198;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 1px 2px #1E1E3f;
    margin-bottom: 10px;
}
    .block-title {
        font-size: 20px;
        color: #F9F9FA;
        font-weight: bold;
        padding-left: 5px;
        border: 5px #4A71A3;
        border-style: none none none solid;
    }
    .block-sub {
        color: #D1D1DC;
    }

/* Button */
.button {
    cursor: pointer;
    padding: 10px 20px;
    background: none;
    border: 2px solid #F9F9FA;
    border-radius: 5px;
    box-shadow: 0 2px 3px #1E1E3f;
    text-shadow: 0 3px 4px #1E1E3f;
    margin: 10px;
    color: #F9F9FA;
    font-weight: bold;
    transition: box-shadow 0.3s ease-in-out, text-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
    -moz-transform: box-shadow 0.3s ease-in-out, text-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
    -o-transition: box-shadow 0.3s ease-in-out, text-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
    -webkit-transition: box-shadow 0.3s ease-in-out, text-shadow 0.3s ease-in-out, background 0.3s ease-in-out;
}
    .button:hover {
        box-shadow: 0 1px 3px #1E1E3f;
        text-shadow: 0 1px 2px #1E1E3f;
    }
    .button:focus { 
        outline: none;
        box-shadow: 0 1px 1px #1E1E3f;
        text-shadow: none;
    }


/* Loading */
.loading {
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background: rgba(33, 33, 68, 0.8);
}




/* App Layout */

@media screen and (max-width: 768px) {
    .app-layout { margin-top: 15px }
}
@media screen and (max-width: 1024px) and (min-width: 768px) {
    .app-layout { margin-top: 30px }
}
@media screen and (min-width: 1024px) {
    .app-layout { margin-top: 50px }
}



/* animate */
.loader {
    width: 3em;
    height: 3em;
    animation: loaderAnim 1.25s infinite;
    outline: 1px solid transparent;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    margin-left: -1.5em;
    margin-top: -1.5em;

}
#largeBox {
    height: 3em;
    width: 3em;
    background-color: #ECECEC;
    outline: 1px solid transparent;
    position: fixed;
}
#smallBox {
    height: 3em;
    width: 3em;
    background-color: #1E1E3f;
    position: fixed;
    z-index: 1;
    outline: 1px solid transparent;
    animation: smallBoxAnim 1.25s alternate infinite ease-in-out;
}

@keyframes smallBoxAnim {
  0% {transform: scale(0.2);}
  100% {transform: scale(0.75);}
}

@keyframes loaderAnim {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(90deg);}
}
</style>





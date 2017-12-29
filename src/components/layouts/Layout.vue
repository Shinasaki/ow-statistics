<template>
    <div class="row m-0">
        <div class="app-layout col-11 col-md-10 col-lg-9 mx-auto">
            <transition name="component-fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>


</template>

<script>
export default {
    name: 'layout',
}
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
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
</style>

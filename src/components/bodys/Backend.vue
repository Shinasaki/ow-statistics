<template>
    <div>
        <div class="block">
            <div class="row m-0">
                <div class="col block-title">
                    Admin Panel
                </div>
                <div class="col text-right">
                    <router-link :to="{ name: 'index'}" style="color: #fff; font-size: 20px;">Back</router-link>
                </div>
            </div>
        </div>
        <div class="block">
            <div class="block-titles-sub">
                Upload Users
                <hr>
                <input type="file" @change="onFileChange">
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'backend',
    computed: {
        ...mapState(['user', 'token', 'rank', 'top'])
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) { console.log('Wrong file type')}

            var readFile = new FileReader();
            readFile.onload = function(e) { 
                var contents = e.target.result;
                var json = JSON.parse(contents);
                console.log(json);
            };
            readFile.readAsText(files);
        }
    }
}
</script>

<style>

</style>

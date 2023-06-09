<script lang="ts">
    import { defineComponent } from 'vue'
import Post from './Post.vue'
    
    export default defineComponent({
    props: {
        posts: Array,
        haveHeader: Boolean
    },
    components: { Post }
});
</script>
<template>
    <div class="feed-container" :class="{profile:haveHeader}">
        <Post :post="item" v-for="item in posts"/>
    </div>
</template>

<style lang="scss" src="@/assets/styles/feed.scss" />
<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'

export default defineComponent({
    components: { Header },
    data() {
        return {
            posts: [],
            loading: false
        }
    },

});
</script>
<template>
    <Header />
</template>
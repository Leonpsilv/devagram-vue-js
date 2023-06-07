<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue'
import Avatar from './Avatar.vue'

export default defineComponent({
    props: {
        name: String,
        email: String,
        avatar: String,
        id: String,
    },
    methods: {
        goToUser() {
            router.push("/user/" + this.id);
        }
    },
    components: { Avatar }
});
</script>
<template>
    <div class="result-container" @click="goToUser">
        <Avatar :image="avatar" />
        <div class="info">
            <strong>{{ name }}</strong>
            <span>{{ email }}</span>
        </div>
    </div>
</template>

<style lang="scss" src="@/assets/styles/searchResult.scss" />
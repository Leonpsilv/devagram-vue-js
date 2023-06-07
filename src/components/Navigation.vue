<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import activeHomeImg from '../assets/images/activeHome.svg';
import grayHomeImg from '../assets/images/grayHome.svg';
import activePostImg from '../assets/images/activePost.svg';
import grayPostImg from '../assets/images/grayPost.svg';
import activeUserImg from '../assets/images/activeUser.svg';
import grayUserImg from '../assets/images/grayUser.svg';

export default defineComponent({

    methods: {
        doNavigation(name: string) {
            router.push({ name });
        },
        getIcon(name: string) {
            switch (name) {
                case 'home':
                    if (router.currentRoute.value.name === 'home') {
                        return activeHomeImg;
                    }
                    return grayHomeImg;
                case 'post':
                    if (router.currentRoute.value.name === 'publicacao') {
                        return activePostImg;
                    }
                    return grayPostImg;
                case 'profile':
                    if (router.currentRoute.value.name === 'perfil') {
                        return activeUserImg;
                    }
                    return grayUserImg;
                default:
                    return '';
            }
        }
    }
});
</script>
<template>
    <nav class="navigation-container">
        <ul>
            <li @click="doNavigation('home')">
                <img :src="getIcon('home')" alt="Home" class="navIcon" />
            </li>
            <li @click="doNavigation('publicacao')">
                <img :src="getIcon('post')" alt="publicação" class="navIcon" />
            </li>
            <li @click="doNavigation('perfil')">
                <img :src="getIcon('profile')" alt="perfil" class="navIcon" />
            </li>
        </ul>
    </nav>
</template>
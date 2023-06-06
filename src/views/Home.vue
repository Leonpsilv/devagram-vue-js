<script lang="ts">
import { defineComponent } from 'vue';
import { LoginServices } from '@/services/LoginServices';
import router from '../router';

const loginService = new LoginServices();

export default defineComponent({
    setup() {
        return {
            loginService,
        }
    },
    methods: {
        logout(v: any){
            loginService.logout()
            router.push({name : 'login'});
        }
    },
});
</script>


<template>
    <div>
        <button @click="logout">sair</button>
    </div>
</template>
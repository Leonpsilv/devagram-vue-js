<script lang="ts">
import { defineComponent } from 'vue';
import PublicInput from "../components/PublicInput.vue";
import loginIcon from '../assets/images/envelope.svg';
import passwordIcon from '../assets/images/key.svg';

export default defineComponent({
    components: {
        PublicInput
    },
    setup(){
        return{
            loginIcon,
            passwordIcon
        }
    },
    data() {
        return {
            login: '',
            password: '',
            loading: false,
            error: ''
        }
    },
    methods: {
        doLogin() {
            if (!this.login && !this.password) {
                this.error = 'Favor preencher o formulário';
                return;
            }
            alert('Login efetuado: ' + this.login + ", " + this.password);
        },
        setLogin(v: any){
            this.login = v
        },
        setPassword(v: any){
            this.password = v
        }
    }
});
</script>

<template>
    <div class="public-container">
        <img src="../assets/images/logo.svg" alt="Logo Devagram" class="logo" />
        <form>
            <p v-if="error" class="error">{{ error }}</p>
            <PublicInput :icon="loginIcon" alt="Insira o login" type="text" placeholder="Email"
                :modelValue="login" @setInput="setLogin"/>
            <PublicInput :icon="passwordIcon" alt="Insira a senha" type="password" placeholder="Senha"
                :modelValue="password" @setInput="setPassword"/>

            <button @click.enter.prevent="doLogin">Login</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!</a>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/publicPage.scss" />
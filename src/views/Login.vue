<script lang="ts">
import { defineComponent } from 'vue';
import type { AxiosError } from 'axios';
import { LoginServices } from '@/services/LoginServices';
import PublicInput from "../components/PublicInput.vue";
import loginIcon from '../assets/images/envelope.svg';
import passwordIcon from '../assets/images/key.svg';
import router from '../router';

const loginService = new LoginServices();

export default defineComponent({
    components: {
        PublicInput
    },
    setup(){
        return{
            loginIcon,
            passwordIcon,
            loginService
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
        async doLogin() {
            try {
                if (!this.login && !this.login.trim() 
                    && !this.password && !this.password.trim()) {
                    this.error = "Favor preencher o formulário";
                    return;
                }
                this.loading = true;
                await loginService.login({login: this.login, password: this.password});
                router.push({name : 'home'});
            } catch (e : AxiosError | any) {
                if(e?.response?.data?.error){
                    this.error = e?.response?.data?.error;
                }else{
                    this.error = 'Não foi possível efetuar o login, tente novamente!';
                }
            }
            this.loading = false;
        },
        setLogin(v: any){
            this.login = v
        },
        setPassword(v: any){
            this.password = v
        }
    },
    computed: {
        buttonText(){
            return this.loading ? '... Carregando' : 'Login';
        }
    }
});
</script>

<template>
    <div class="public-container">
        <img src="../assets/images/logo.svg" alt="Logo Devagram" class="logo" />
        <form>
            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="$route.query.registerSuccess" class="success">Cadastro realizado com sucesso!</p>

            <PublicInput :icon="loginIcon" alt="Insira o login" type="text" placeholder="Email"
                :modelValue="login" @setInput="setLogin"/>
            <PublicInput :icon="passwordIcon" alt="Insira a senha" type="password" placeholder="Senha"
                :modelValue="password" @setInput="setPassword"/>

            <button @click.enter.prevent="doLogin" :disabled="loading">{{buttonText}}</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <RouterLink to="/cadastro">Faça seu cadastro agora!</RouterLink>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/publicPage.scss" />
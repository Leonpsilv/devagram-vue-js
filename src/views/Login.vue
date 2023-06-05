<script lang="ts">
    import {defineComponent} from 'vue';
    export default defineComponent({
        data(){
            return {
                login: '',
                password: '',
                loading: false,
                error : ''
            }
        },
        methods: {
            doLogin(){
                if(!this.login && !this.password){
                    this.error = 'Favor preencher o formulário';
                    return;
                }
                alert('Login efetuado: ' + this.login + ", " + this.password);
            }
        }
    });
</script>

<template>
    <h1>Bem vindo ao Devagram!</h1>
    <div>
        <img src="../assets/images/logo.svg" alt="Logo Devagram"/>
        <form>
            <p v-if="error">{{error}}</p>
            <div>
                <img src="../assets/images/envelope.svg" alt="Insira o login"/>
                <input type="text" v-model="login" />
            </div>
            <div>
                <img src="../assets/images/key.svg" alt="Insira a senha"/>
                <input type="password" v-model="password" />
            </div>
            <button @click.enter.prevent="doLogin">Login</button>
            <div>
                <p>Não possui uma conta?</p>
                <a>Faça seu cadastro agora!</a>
            </div>
        </form>
    </div>
</template>
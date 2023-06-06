<script lang="ts">
import { defineComponent } from 'vue';
import PublicInput from '../components/PublicInput.vue';
import loginIcon from '../assets/images/envelope.svg';
import passwordIcon from '../assets/images/key.svg';
import userIcon from '../assets/images/activeUser.svg';
import avatarIcon from '../assets/images/avatar.svg';
import ImageInput from '../components/ImageInput.vue';
import { RegisterServices } from '../services/RegisterServices';
import router from '../router';

const registerServices = new RegisterServices();

export default defineComponent({
    setup() {
        return {
            loginIcon,
            passwordIcon,
            userIcon,
            avatarIcon,
            registerServices
        }
    },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirm: "",
            loading: false,
            error: "",
            image: {} as any
        };
    },
    methods: {
        async register() {
            try {
                this.error = "";
                if (!this.name || !this.name.trim() ||
                    !this.email || !this.email.trim() ||
                    !this.password || !this.password.trim() ||
                    !this.confirm || !this.confirm.trim()) {
                    return this.error = "Favor preencher todos o formulário";
                }

                if (this.password !== this.confirm) {
                    return this.error = "Senha e confirmação não são iguais";
                }

                this.loading = true;

                const reqFormData = new FormData();

                reqFormData.append('name', this.name);
                reqFormData.append('email', this.email);
                reqFormData.append('password', this.password);

                if (this.image.arquivo) {
                    reqFormData.append('file', this.image.file);
                }

                await registerServices.register(reqFormData);
                router.push({ name: 'login', query: { registerSuccess: 'true' } });
            } catch (e: any) {
                console.log(e);
                if (e?.response?.data?.error) {
                    this.error = e?.response?.data?.error;
                } else {
                    this.error = 'Não foi possível cadastrar o usuário, tente novamente!';
                }
            }
            this.loading = false;
        },
        setName(v: any) {
            this.name = v;
        },
        setEmail(v: any) {
            this.email = v;
        },
        setPassword(v: any) {
            this.password = v;
        },
        setConfirm(v: any) {
            this.confirm = v;
        },
        setImage(v: any) {
            this.image = v;
        }
    },
    computed: {
        buttonText() {
            return this.loading ? '... Carregando' : 'Cadastrar';
        }
    },
    components: { PublicInput, ImageInput }
});
</script>

<template>
    <div :class="['public-container', 'register']">
        <img src="../assets/images/logo.svg" alt="Logo Devagram" class="logo" />
        <form>
            <ImageInput :image="image" alt="Imagem do usuário" @setImage="setImage" />

            <p v-if="error" class="error">{{ error }}</p>

            <PublicInput :icon="userIcon" alt="Insira o nome do usuário" type="text" placeholder="Nome Completo"
                :modelValue="name" @setInput="setName" />

            <PublicInput :icon="loginIcon" alt="Insira o Email" type="text" placeholder="Email" :modelValue="email"
                @setInput="setEmail" />

            <PublicInput :icon="passwordIcon" alt="Insira a senha" type="password" placeholder="Senha"
                :modelValue="password" @setInput="setPassword" />

            <PublicInput :icon="passwordIcon" alt="Confirme a senha" type="password" placeholder="Confirmar Senha"
                :modelValue="confirm" @setInput="setConfirm" />

            <button @click.enter.prevent="register" :disabled="loading">{{ buttonText }}</button>
            <div class="link">
                <p>Já possui uma conta?</p>
                <RouterLink :to="{ name: 'login' }">Faça seu login agora!</RouterLink>
            </div>
        </form>
    </div>
</template>


<style lang="scss" src="@/assets/styles/publicPage.scss" />
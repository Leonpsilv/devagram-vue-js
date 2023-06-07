<script lang="ts">
import { defineComponent } from 'vue'
import Navigation from './Navigation.vue'
import { UserServices } from '../services/UserServices';
import SearchResult from './SearchResult.vue';

const userServices = new UserServices();

export default defineComponent({
    props: {
        hide: Boolean,
    },
    data() {
        return {
            result: [] as any,
            inputFocus: false,
            search: '',
        };
    },
    methods: {
        setFocus(v: boolean) {
            this.inputFocus = v;
        },
        async searchUsers(e: any) {
            try {
                if (!e?.target?.value) {
                    this.result = [];
                    this.search = '';
                    return;
                }

                this.search = e?.target?.value;
                if (!this.search || this.search.trim().length < 2) {
                    return;
                }

                const response = await userServices.search(this.search);
                if (response && response.data) {
                    this.result = response.data;
                }
            } catch (e) {
                console.log(e);
            }
        }
    },
    components: { Navigation, SearchResult }
});
</script>

<template>
    <header class="header-container" :class="{ hide: hide }">
        <div class="principal">
            <img src="../assets/images/horizontalLogo.svg" alt="logo devagram" />
            <div class="group">
                <div class="search" :class="{ focus: inputFocus }">
                    <img src="../assets/images/magnifier.svg" alt="pesquisa" layout="fill" class="icon" />
                    <input type="text" placeholder="Pesquisar" :value="search" @input="searchUsers" @focus="setFocus(true)"
                        @blur="setFocus(false)" />
                </div>

                <Navigation />
            </div>
        </div>
        <div class="result" v-if="result.length > 0">
            <SearchResult v-for="user in result" :key="user._id" :id="user._id" :name="user.name" :email="user.email"
                :avatar="user.avatar" />
        </div>
    </header>
</template>

<style lang="scss" src="@/assets/styles/header.scss" />
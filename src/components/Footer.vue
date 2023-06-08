<script lang="ts">
    import { defineComponent } from 'vue'
    import Navigation from './Navigation.vue'
    
    export default defineComponent({
        components: { Navigation }
    });
</script>
<template>
    <footer class="footer-container">
        <Navigation />
    </footer>
</template>

<style lang="scss" src="@/assets/styles/footer.scss" />
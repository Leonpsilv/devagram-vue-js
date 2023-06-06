<script lang="ts">
import { defineComponent } from 'vue';
import avatarIcon from '../assets/images/avatar.svg';

export default defineComponent({
    props: {
        image: null,
        alt: String
    },
    methods: {
        openSelector() {
            const input = this.$refs.inputReference as HTMLElement;
            input.click();
        },
        imageSelector(e: any) {
            if (e.target.files) {
                const file = e.target.files[0];
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file)
                fileReader.onloadend = () => {
                    const image = {
                        preview: fileReader.result,
                        file: file
                    }
                    this.$emit('setImage', image);
                }
            }
        }
    },
    computed: {
        imageAvatar() {
            return this.image?.preview ? this.image.preview : avatarIcon;
        }
    },

});
</script>

<template>
    <div class="upload-image-container" @click="openSelector">
        <div>
            <img :src="imageAvatar" :alt="alt" class="avatar" />
        </div>

        <input type="file" accept="image/*" class="hidden" ref="inputReference" @input="imageSelector" />
    </div>
</template>

<style lang="scss" src="@/assets/styles/inputImage.scss" />
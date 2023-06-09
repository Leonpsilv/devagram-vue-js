<script lang="ts">
    import { defineComponent } from 'vue'
    import Avatar from './Avatar.vue'

    import likeImg from '../assets/images/like.svg';
    import likedImg from '../assets/images/liked.svg';
    import commentImg from '../assets/images/grayComment.svg';
    import activeCommentImg from '../assets/images/activeComment.svg';
    import { FeedServices } from '@/services/FeedServices';
import router from '@/router';

    const feedServices = new FeedServices();
    const DESCRIPTION_MAX_LENGTH = 100;
    
    export default defineComponent({
    setup(){
        return {
            loggedUserId : localStorage.getItem(`_id`),
            loggedAvatar : localStorage.getItem(`avatar`) ?? '',
            loggedName : localStorage.getItem(`name`) ?? '',
            MAX_DESCRICAO: DESCRIPTION_MAX_LENGTH
        }
    },
    props: {
        post: null
    },
    data(){
        return {
            showComment : false,
            commentMsg : '',
            showFullDescription : false
        }
    },
    methods: {
        navigationToProfile() {
            router.push("/user/" + this.post?.userId);
        },
        async togglLike(){
            try{
                await feedServices.togglLike(this.post?._id);
                const index = this.post?.likes?.findIndex((e:String) => e === this.loggedUserId);
                if(index != -1){
                    this.post?.likes?.splice(index, 1);
                }else{
                    this.post?.likes?.push(this.loggedUserId);
                }
            }catch(e){
                console.log(e);
            }
        },
        togglComment(){
            this.showComment = !this.showComment;
        },
        async sendComment(){
            try{
                if(!this.commentMsg || !this.commentMsg.trim()){
                    return;
                }

                await feedServices.sendComment(this.post?._id, this.commentMsg);
                const commentDto = {
                    userId : this.loggedUserId,
                    avatar: this.loggedAvatar,
                    name: this.loggedName,
                    comment: this.commentMsg
                }

                this.post?.comments?.push(commentDto);

                this.commentMsg = '';
                this.showComment = false;
            }catch(e){
                console.log(e);
            }
        },
        togglFullDescription(){
            this.showFullDescription = !this.showFullDescription;
        }
    },
    components: { Avatar },
    computed: {
        getLikeIcon(){
            if(this.post?.likes && this.post?.likes.findIndex((e : String) => e === this.loggedUserId) != -1){
                return likedImg
            }
            return likeImg
        },
        getCommentIcon(){
            return this.showComment ? activeCommentImg : commentImg;
        },
        showDescription(){
            if(this.showFullDescription){
                return this.post?.description;
            }
            return this.post?.description?.length > DESCRIPTION_MAX_LENGTH ? this.post?.description?.substring(0, DESCRIPTION_MAX_LENGTH) + '...' : this.post?.description;
        }
    }
});
</script>
<template>
    <div class="post-container">
        <div @click="navigationToProfile">
            <section class="header">
                <Avatar :image="post?.user?.avatar"/>
                <strong>{{post?.user?.name}}</strong>
            </section>
        </div>

        <div class="photo">
            <img :src="post?.image" alt="Imagem da publicação"/>
        </div>

        <div class="footer">
            <div class="actions">
                <img :src="getLikeIcon" alt="Icone curtir" class="feedIcon" @click="togglLike"/>
                <img :src="getCommentIcon" alt="Icone comentar" class="feedIcon"
                    @click="togglComment"/>
                <span class="likes">
                    Curtido por <strong>{{post?.likes?.length}}</strong> pessoa{{post?.likes?.length !== 1 ? 's' : ''}}
                </span>
            </div>

            <div class="description">
                <strong>{{post?.user?.name}}</strong>
                <p>
                    {{showDescription}}
                    <span v-if="post?.description.length > MAX_DESCRICAO && !showFullDescription"
                        @click="togglFullDescription" class="more">
                        mais
                    </span>
                </p>
            </div>

            <div class="comments">
                <div v-for="(comment, index) in post?.comments" :key="index">
                    <strong>{{comment.name}}</strong>
                    <p>{{comment.comment}}</p>
                </div>
            </div>
        </div>

        <div class="comment-container" v-if="showComment">
            <Avatar alt="imagem do usuário logado" :image="loggedAvatar" />
            <input type="text" v-model="commentMsg" placeholder="Adicione um comentário..." @keyup.enter="sendComment"/>
            <button type="button" @click="sendComment">
                Publicar
            </button>
        </div>
    </div>
</template>

<style lang="scss" src="@/assets/styles/post.scss" />
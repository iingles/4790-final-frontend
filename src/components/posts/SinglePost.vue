<template>
    <b-card class="mb-1">
        <b-row>
            <b-col cols="2" class="pr-0 pl-1">
                <b-row class="d-flex pr-0 pl-0">
                    <b-col>
                        <b-avatar size="4rem" :to="`/profile/${post.creator._id}`" :src="post.creator.photoSm" :text="post.creator.firstName[0]" href="#"></b-avatar>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="10" class="pl-0">
                <b-row class="d-flex" no-gutters align-v="start">
                    <b-col cols="11">
                        <span class="user-name pb-0 mb-0">{{ `${post.creator.firstName} ${post.creator.lastName}` }}</span>
                        <span class="date-time pb-0 mb-0 ml-3">{{ post.createdAt }}</span>
                    </b-col>
                    <b-col cols="1">
                        <PostMenu
                        :userId="userId"
                        :token="token"
                        :creatorId="post.creator._id"
                        :postId="post._id"
                        :content="post.content"
                        />
                    </b-col>
                </b-row>
                <b-row align-v="start">
                    <b-col cols="10">
                        <b-card-body class="pl-0 pt-0">
                            {{post.content}}
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-card-footer class="d-flex pt-2 pb-1 justify-content-around">
            <Reply
            :post="post"
            :userId="userId"
            :token="token"
            />
            <Like
            :postId="post._id"
            :likes="post.likes"
            :userId="userId"
            :token="token"
            />
            <Repost
            :post="post"
            :userId="userId"
            :token="token"
            />
            <Share
            :post="post"
            :userId="userId"
            :token="token"
            />
        </b-card-footer>
    </b-card>
</template>

<script>

import PostMenu from './post-actions/PostMenu'
import Reply from './post-actions/Reply'
import Like from './post-actions/Like'
import Repost from './post-actions/Repost'
import Share from './post-actions/Share'

export default {
  components: {
    PostMenu,
    Reply,
    Like,
    Repost,
    Share
  },
  props: {
    post: Object,
    token: String,
    userId: String
  }
}
</script>

<style lang="less" scoped>
    .user-name {
        font-weight: bold;
    }

    .date-time {
        color: #707070;
        font-size: .9rem;
        font-style: italic;
        line-height: 1.9;
    }

    .card-body {
        font-size: 1.3rem;

        @media screen and (min-width: 992px) {
            font-size: 1rem;
        }
    }

    .dropdown .btn {
        color: #CCD6DD;
    }

     .card-footer {
        background-color: #fff;

        .btn {
            font-size: 2rem;
            color: #a1a1a1;

            .badge-light {
                color: #a1a1a1!important;
            }

            @media screen and (min-width: 992px) {
                font-size: 1.4rem;
            }
        }
    }
</style>

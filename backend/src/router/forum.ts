import express from 'express'

import { addForumPost, removePost, fetchposts, approvedPosts, fetchAllposts} from '../controllers/forum/post'
import { addForumComment, fetchCommentByPostID, removeComment } from '../controllers/forum/comment'
import { addCommentLikes, removeCommentLikes, removeLikes, updatePostLikes } from '../controllers/forum/likes'

export default (router: express.Router) => {

    router.post('/kalinga/addPost', addForumPost)
    router.post('/kalinga/addComment', addForumComment)

    router.delete('/kalinga/removePost/:post_ID', removePost)
    router.delete('/kalinga/removeComment/:comment_ID', removeComment)

    router.get('/kalinga/getPosts', fetchposts)
    router.get('/kalinga/getAllPosts', fetchAllposts)
    router.get('/kalinga/getComment/:post_ID', fetchCommentByPostID)

    router.patch('/kalinga/approvedPost/:id', approvedPosts)
    router.patch('/kalinga/updateLikes/:reactor_ID', updatePostLikes)
    router.patch('/kalinga/removeLikes/:reactor_ID', removeLikes)

    router.patch('/kalinga/addCommentLikes/:reactor_ID', addCommentLikes)
    router.patch('/kalinga/removeCommentLikes/:reactor_ID', removeCommentLikes)
}
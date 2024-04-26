import express from 'express'

import { addForumPost, removePost, fetchposts} from '../controllers/forum/post'
import { addForumComment, fetchCommentByPostID, removeComment } from '../controllers/forum/comment'

export default (router: express.Router) => {

    router.post('/kalinga/addPost', addForumPost)
    router.post('/kalinga/addComment', addForumComment)

    router.delete('/kalinga/removePost/:post_ID', removePost)
    router.delete('/kalinga/removeComment/:comment_ID', removeComment)

    router.get('/kalinga/getPosts', fetchposts)
    router.get('/kalinga/getComment/:post_ID', fetchCommentByPostID)
}
import express from 'express'
import { updateBlockStatus } from '../controllers/Admin/BlocklUser'


export default(router: express.Router) => {

    router.patch('/kalinga/updateBlockStatus/:id', updateBlockStatus)
    
}
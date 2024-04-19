import express from 'express'

import users  from './users';
import authentication from './authentication'
import upload from './upload';
import forms from './forms';

const router = express.Router();


export default(): express.Router => {

    authentication(router);
    upload(router);
    users(router);
    forms(router)
    return router;
}
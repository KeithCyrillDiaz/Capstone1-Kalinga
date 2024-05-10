import express from 'express'

import users  from './users';
import authentication from './authentication'
import upload from './upload';
import forms from './forms';
import forum from './forum'
import settings from './settings';
import notification from './notification';

const router = express.Router();


export default(): express.Router => {

    authentication(router);
    upload(router);
    users(router);
    forms(router);
    forum(router);
    settings(router)
    notification(router)
    return router;
}
import express from 'express'

import users  from './users';
import authentication from './authentication'
import upload from './upload';
import forms from './forms';
import forum from './forum'
import settings from './settings';
import notification from './notification';
import admin from './admin'
import report from './report'
import email from './email';

const router = express.Router();


export default(): express.Router => {

    authentication(router);
    upload(router);
    users(router);
    forms(router);
    forum(router);
    settings(router)
    notification(router)
    admin(router)
    report(router)
    email(router)
    return router;
}
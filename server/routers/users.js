import express from 'express';

import diary from '../controller/user-controller';
import signUpValidator from '../midleware/uservalidator';

const app = express.Router();

app.post('/auth/signup', signUpValidator, diary.UsersDiary.signupDiary);
app.post('/auth/signin', diary.UsersDiary.signinDiary);



export default app;


import express from 'express';

import diary from '../controller/user-controller';
import signUpValidator from '../midleware/uservalidator';
import signinValidator from '../midleware/sign-in-valid';

const app = express.Router();

app.post('/auth/signup', signUpValidator, diary.UsersDiary.signupDiary);
app.post('/auth/signin', signinValidator, diary.UsersDiary.signinDiary);



export default app;


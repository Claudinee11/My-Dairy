import bcrypt from 'bcrypt';

const hashPass=(password) => {
bcrypt.hashSync(password, number(process.env.passwordSort));

}

const decrptyPass =(password, passwordHash) => {
    bcrypt.compareSync(password, passwordHash);
}

export default {hashPass, decrptyPass};
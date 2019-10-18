
import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';
 
 import users from '../helpers/mockData/users';


import app from '../../index';

chai.use(chaiHTTP);

 

describe('POST sign up with first_name, api/v2/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal(`"firstname" with value "${users[0].firstname}" fails to match the required pattern: /^[a-zA-Z]+$/`);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});


describe('POST sign up with empty password, api/v2/auth/signup', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equals(400);
        done();
      });
  });
});
describe('POST sign up success, api/v2/auth/signup', () => {
  it('should return creating account successful', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[1])
      .end((err, res) => {
        console.log(err);
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        
        
        done();
      });
  });
});

describe('POST email already exist, api/v2/auth/signup', () => {
  it('should return the email was already exists', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[2])
      .end((err, res) => { 
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
         expect(res.body.status).to.equal(409);
         expect(res.body.message).to.equal('email exist');
        done();
      });
  });
});

describe('POST sign up with incorrect  data api/v2/auth/signup', () => {
  it('should return error when user signup details is incorrect', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.status).to.equal(409);
        
        done();
      });
  });
});

describe('POST sign up with invalid email api/v2/auth/signup', () => {
  it('should return error when the users email is invalid', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        
        done();
      });
  });
});
describe('POST signin successfully, api/v2/auth/signin', () => {
  it('should return signin successfully', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(users[4])
      .end((err, res) => {
        
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body.status).to.equal(201);
        done();
      });
  });
});

describe('POST signin with incorrect data, api/v2/auth/signin', () => {
  it('should return email is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" is required');
        done();
      });
  });
});

describe('POST signin with invalid email, api/v2/auth/signin', () => {
  it('should return email is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(users[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        expect(res.body.error).to.equal('"email" must be a valid email');
        done();
      });
  });
});

describe('POST signin with encorrect data, api/v2/auth/signin', () => {
  it('should return password is required', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(users[8])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});

describe('POST signin failed, api/v2/auth/signin', () => {
  it('should return signin was failed', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('encorrect password or email');
        done();
      });
  });
});
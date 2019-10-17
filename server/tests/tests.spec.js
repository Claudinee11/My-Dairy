
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
  it('should return signup successful', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(users[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        
        
        done();
      });
  });
});

// describe('POST email already exist, api/v2/auth/signup', () => {
//   it('should return {email} already exists', (done) => {
//     chai.request(app)
//       .post('/api/v2/auth/signup')
//       .send(users[1])
//       .end((err, res) => { 
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(409);
//         // expect(res.body.status).to.equal(409);
        
//       });
//   });
// });

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



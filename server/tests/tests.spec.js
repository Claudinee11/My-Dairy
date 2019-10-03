
import chai, {expect} from 'chai';
import chaiHTTP from 'chai-http';

import app from '../../index';

chai.use(chaiHTTP);


const newDairy = {
    
    title: 'Dear diary',
     date: 'on 22 09 2019',
    description: 'get diary',
  };
  
  describe('Users API testing', () => {
    it('GET /users should return all entries', done => {
      chai
        .request(app)
        .get('/api/v1/entries')
        .end((err, res) => {
          expect(res.status).to.equals(200);
          expect(res.body).to.be.an('object');
         
          done();
        });
    });
  });
  describe('users can specify  entry', () => {

 
    it('GET /users should get specific entry', done => {
        chai
          .request(app)
          .get('/api/v1/entries/2')
          .then((res) => {
            expect(res.status).to.equals(200);
            expect(res.body).to.be.an('object');
             expect(res.body.success).to.equals('true');
             expect(res.body.message).not.to.be.null;
            done();
          }).catch((err) => console.log(err));
      });

      it('user get entry not found', done => {
        chai
        .request(app)
        .get('/api/v1/entries/10')
        .then((res) => {
        expect(res.status).to.equals(404);
        expect(res.body.message).not.to.be.null;
        done();
      }).catch((err) => console.log(err));
      })
    });

    describe('users add entry', () => {

    it('POST /users should create their own entries', done => {
      chai
        .request(app)
        .post('/api/v1/entries')
        .send(newDairy)
        .end((err, res) => {
          expect(res.status).to.equals(201);
          expect(res.body).to.be.an('object');
         expect(res.body.message).not.to.be.null;
         expect(res.body.id).not.to.be.null;
         expect(res.body.title).not.to.be.null;
         expect(res.body.date).not.to.be.null;
         expect(res.body.description).not.to.be.null;
          done();
        });
    });
  });

  describe('Users Delete', () => {
    it('Delete /users should delete entries', done => {
      chai
        .request(app)
        .delete('/api/v1/entries/2')
        .end((err, res) => {
         expect(res.status).to.equals(200);
         expect(res.body.message).not.to.be.null;
         
          done();
        });
    });
    it('Delete user delete entry not found', done => {
      chai
      .request(app)
      .delete('/api/v1/entries/10')
      .then((res) => {
      expect(res.status).to.equals(404);
      expect(res.body.message).not.to.be.null;
      
      done();
    }).catch((err) => console.log(err));
    });
  });

  describe('users can Modify entries', () => {
    it('UPDATE /users should be able to update entries', done => {
      const dairies =
        {
        
        title: 'Dear diaries',
        date: 'on 26 09 2019',
        description: 'get diaries'
      }
      chai
        .request(app)
        .put('/api/v1/entries/1')
        .send(dairies)
        .end((err, res) => {
          expect(res.status).to.equals(200);
          expect(res.body).to.be.an('object');
          expect(res.body.title).not.to.be.null;
          expect(res.body.date).not.to.be.null;
          expect(res.body.description).not.to.be.null;
          
          done();
        });
    });
    it('UPDATE/user modify entry not found', done => {
      const diary =
      {
      
      title: 'Dear diary',
      date: 'on 02 10 2019',
      description: 'get diary'
    }
      chai
      .request(app)
      .put('/api/v1/entries/5')
      .send(diary)
      .then((res) => {
     expect(res.status).to.equals(404);
     expect(res.body.message).not.to.be.null;
     done();
      }).catch((err) => console.log(err));
    });
  
  });

  
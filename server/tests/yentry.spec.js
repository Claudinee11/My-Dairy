
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import chai, { expect } from 'chai';
import chaiHTTP from 'chai-http';

import newDairy from '../helpers/mockData/entry';

import app from '../../index';

dotenv.config();

chai.use(chaiHTTP);

const userToken = jwt.sign({ Id: 1 }, process.env.secretkey);


describe('GET entries, api/v2/entries', () => {
    it('should return all entry', (done) => {
        chai.request(app)
            .get('/api/v2/entries')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(404);
                done();
            });
    });
});

describe('GET entries, api/v2/entries', () => {
    it('should return specific entry', (done) => {
        chai.request(app)
            .get('/api/v2/entries/1')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(404);
                done();
            });
    });
});


describe('POST entries, api/v2/entries', () => {
    it('should return entry created successfully', (done) => {
        chai.request(app)
            .post('/api/v2/entries')
            .set('token', userToken)
            .send(newDairy[0])
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(201);
                done();
            });
    });
});

describe('PUT entries, api/v2/entries', () => {
    it('should return entry updated successfully', (done) => {
        chai.request(app)
            .put('/api/v2/entries/1')
            .set('token', userToken)
            .send(newDairy[1])
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(200);
                done();
            });
    });
});

describe('PUT entries, api/v2/entries', () => {
    it('should return entry updated not found', (done) => {
        chai.request(app)
            .put('/api/v2/entries/100')
            .set('token', userToken)
            .send(newDairy[1])
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(404);
                done();
            });
    });
});

describe('PUT entries, api/v2/entries', () => {
    it('12should return error status title required ', (done) => {
        chai.request(app)
            .put('/api/v2/entries/1')
            .set('token', userToken)
            .send(newDairy[2])
            .end((err, res) => {
                console.log(err);
                expect(res.body).to.be.an('object');
                expect(res.status).to.equal(400);
                expect(res.body.status).to.equal(400);
                 done();
            });
    });
});

describe('DELETE entries, api/v2/entries', () => {
    it('should return message entry deleted successfully', (done) => {
        chai.request(app)
            .delete('/api/v2/entries/1')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(200);
                done();
            });
    });
});

describe('DELETE entries, api/v2/entries', () => {
    it('should return message" entry not found"', (done) => {
        chai.request(app)
            .delete('/api/v2/entries/6')
            .set('token', userToken)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body).to.be.an('object');
                expect(res.body.status).to.equal(404);
                done();
            });
    });
});




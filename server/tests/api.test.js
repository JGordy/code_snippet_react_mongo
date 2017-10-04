const request = require('supertest');
const app = require('../index');

let userId;

describe('POST /api/auth/register', () => {
  test('Should receive object with token and user object', () => {
    return request(app)
      .post('/api/auth/register')
      .expect(201)
      .send({
        email: 'test@test.test',
        password: 'testytesttest',
        name: 'test'
      })
      .then(res => {
        console.log('test res.body.user._id: ', res.body.user._id);
        userId = res.body.user._id;
        expect(res.body).toHaveProperty('token')
        expect(res.body.token).toContain('JWT')
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('_id')
        expect(res.body.user).toHaveProperty('email')
        expect(res.body.user).toHaveProperty('name')
      });
  })
})


describe('POST /api/auth/login', () => {
  test('Should receive token and get status of 200', () => {
    return request(app)
      .post('/api/auth/login')
      .expect(200)
      .send({
        email: 'test@test.test',
        password: 'testytesttest'
      })
      .then(res => {
        expect(res.body).toHaveProperty('token')
        expect(res.body.token).toContain('JWT')
        expect(res.body).toHaveProperty('user')
        expect(res.body.user).toHaveProperty('_id')
        expect(res.body.user).toHaveProperty('email')
        expect(res.body.user).toHaveProperty('name')
      })
  })
})

describe('DELETE /api/auth/delete', () => {
  test('Should remove a user based on the id', () => {
    return request(app)
    .delete(`/api/auth/user/${userId}`)
    .expect(200)
    .then(res => {
      expect(res.body).toHaveProperty('message')
      expect(res.body.message).toContain("Successfully Removed")
    })
  })
})

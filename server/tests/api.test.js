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

describe('POST /api/auth/snippet', () => {
  test('Should create a snippet and return object with snippet details', () => {
    return request(app)
    .post('/api/auth/snippet')
    .expect(200)
    .send({
      username: 'jgordy24',
      title: 'title',
      code: 'code',
      notes: 'notes',
      language: 'language',
      tags: 'tag1, tag2, tag3'
    })
    .then(res => {
      expect(res.body.data).toHaveProperty('username')
      expect(res.body.data.username).toBe('jgordy24')
      expect(res.body.data).toHaveProperty('title')
      expect(res.body.data.title).toBe('title')
      expect(res.body.data).toHaveProperty('code')
      expect(res.body.data.code).toBe('code')
      expect(res.body.data).toHaveProperty('notes')
      expect(res.body.data.notes).toBe('notes')
      expect(res.body.data).toHaveProperty('language')
      expect(res.body.data.language).toBe('language')
      expect(res.body.data).toHaveProperty('tags')
      expect(res.body.data.tags).toEqual(['tag1', 'tag2', 'tag3'])
    });
  })
})

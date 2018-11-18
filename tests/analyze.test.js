const supertest = require('supertest')
const { app, server, createCharList } = require('../index')
const api = supertest(app)


describe('/POST/analyze', () => {

    test('response is in JSON', async () => {
        await api
            .post('/analyze/')
            .send({ "text": "moi miten menee" })
            .expect('Content-Type', /application\/json/)
    })
    
})

describe('CharacterList tests', () => {
  test('Only count english letters', () => {
      const text = 'this contains 28 english character äåö'
      const charList = createCharList(text)
      
      let amountOfchar = charList.reduce( (previous, char) => {
            return previous + parseInt(Object.values(char))
      }, 0)

      expect(amountOfchar).toBe(28)
  })  
})

afterAll(() => {
    server.close()
})
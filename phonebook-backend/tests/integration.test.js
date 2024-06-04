const { describe, it, after } = require('mocha')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const server = require('../index')
const app = require('../index')
const Person = require('../models/person')

describe('API Tests', () => {
  describe('GET /api/persons', () => {
    it('should return 200 and a list of persons', async () => {
      const response = await supertest(app).get('/api/persons')
      assert.strictEqual(response.status, 200)
      assert.ok(Array.isArray(response.body))
    })
  })

  describe('GET /api/persons/:id', () => {
    it('should return 200 and details of a specific person', async () => {
      // Assume there's at least one person in the database
      const existingPerson = await Person.findOne()
      const response = await supertest(app).get(`/api/persons/${existingPerson._id}`)
      assert.strictEqual(response.status, 200)
      assert.deepStrictEqual(response.body, existingPerson.toJSON())
    })
  })

  //   describe('POST /api/persons', () => {
  //     it('should return 201 and details of the newly created person', async () => {
  //       const newPerson = {
  //         name: 'John Doe',
  //         number: '1234567890'
  //       };
  //       const response = await supertest(app)
  //         .post('/api/persons')
  //         .send(newPerson);
  //       assert.strictEqual(response.status, 201);
  //       assert.deepStrictEqual(response.body.name, newPerson.name);
  //       assert.deepStrictEqual(response.body.number, newPerson.number);
  //     });
  //   });
})

after(async () => {
  // Cerrar la conexión a la base de datos después de las pruebas
  await mongoose.disconnect()
  // Cerrar el servidor después de las pruebas
  server.close()
})

const request = require("supertest");
const app = require("../app");
const {sequelize} = require("../models");
const {queryInterface} = sequelize;
const BASE_URL = "/api/todos";

beforeAll( async () => {
  try {
      await queryInterface.bulkInsert("Todos", [
        {
          id : 1001,
          name : "Todo Item 1",
          status : "Status 1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      
        {
          id : 1002,
          name : "Todo Item 2",
          status : "Status 2",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      
        {
          id : 1003,
          name : "Todo Item 3",
          status : "Status 3",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
  } catch (err) {
      console.log(err);
  }
})

afterAll( async () => {
  try {

    await queryInterface.bulkDelete("Todos", null)

  } catch (err) {
    console.log(err);
  }
});


//Test GET all to do
describe("GET list of todos /api/todos", () => {
  
  it("GET /api/todos", (done) => {
    request(app)
      .get(`${BASE_URL}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const {body} = response;
        const {data} = body;
        expect(data.length).toEqual(3)
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

// Test Get Todo By Id 
describe("GET Todo by Id /api/todos/:id", () => {
  it("GET /api/todos/:id", (done) => {
    request(app)
      .get(`${BASE_URL}/1001`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const {body} = response;
        const {data} = body;
        const {id, name, status} = data;
        expect(id).toEqual(1001);
        expect(name).toBe("Todo Item 1")
        expect(status).toBe("Status 1")
        done()
      })
      .catch(err => {
        done(err);
      })
  })

  it("Cannot Find To do /api/todos", (done) => {
    request(app)
      .get(`${BASE_URL}/9999`)
      .expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        const {body} = response;
        const {name, message} = body
        expect(name).toBe("Error Not Found!")
        expect(message).toBe("Can't find the to do with that ID!")
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

// Test creating a new to do
describe("Create a new todo /api/todos", () => {

  it("Creates new todo /api/todos", (done) => {
    const newTodo = {
      name: "New Todo",
      status: "New Status",
    }
    request(app)
      .post(`${BASE_URL}`)
      .send(newTodo)
      .expect('Content-Type', /json/)
      .expect(201)
      .then(response => {
        const {body} = response;
        const {data} = body;
        expect(data.name).toBe(newTodo.name)
        expect(data.status).toBe(newTodo.status);
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

// Test updating a to do
describe("Update a todo by its Id /api/todos/:id", () => {

  const updatedTodo = {
    name: "Update Todo",
    status: "Updated Status"
  }

  it("Updates a todo by Id /api/todos/:id", (done) => {
    request(app)
      .put(`${BASE_URL}/1001`)
      .send(updatedTodo)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const {body} = response;
        const {data} = body;
        expect(data.id).toEqual(1001);
        expect(data.name).toEqual(updatedTodo.name)
        expect(data.status).toEqual(updatedTodo.status)
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  it("Cannot Find todo to updaate by Id /api/todos/:id", (done) => {
    request(app)
      .get(`${BASE_URL}/9999`)
      .expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        const {body} = response;
        const {name, message} = body;
        expect(name).toBe("Error Not Found!");
        expect(message).toBe("Can't find the to do with that ID!")
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

// Test deleting a to do by its id
describe("Delete a todo by Id /api/todos/:id", () => {
  
  it("Deletes a todo by its Id /api/todos/:id", (done) => {
    request(app)
      .delete(`${BASE_URL}/1001`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const {body} = response;
        const {message} = body;
        expect(message).toBe("To do has been removed successfully!");
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  it("Cannot find a todo by its Id /api/todos/:id", (done) => {
    request(app)
      .get(`${BASE_URL}/9999`)
      .expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        const {body} = response;
        const {name, message} = body;
        expect(name).toBe("Error Not Found!")
        expect(message).toBe("Can't find the to do with that ID!")
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})



const request = require('supertest');
const app = require('../server');

describe('Todo API', () => {
  let createdTodoId;

  it('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('GET /api/todos should return an empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/todos should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: 'Learn Docker' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Learn Docker');
    expect(res.body).toHaveProperty('completed', false);
    
    createdTodoId = res.body.id;
  });

  it('POST /api/todos should return 400 for invalid title', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ title: '' });
    expect(res.statusCode).toEqual(400);
  });

  it('GET /api/todos/:id should return the created todo', async () => {
    const res = await request(app).get(`/api/todos/${createdTodoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdTodoId);
    expect(res.body).toHaveProperty('title', 'Learn Docker');
  });

  it('PUT /api/todos/:id should update the todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${createdTodoId}`)
      .send({ title: 'Learn Kubernetes', completed: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Learn Kubernetes');
    expect(res.body).toHaveProperty('completed', true);
  });

  it('DELETE /api/todos/:id should delete the todo', async () => {
    const res = await request(app).delete(`/api/todos/${createdTodoId}`);
    expect(res.statusCode).toEqual(204);
  });

  it('GET /api/todos/:id should return 404 for deleted todo', async () => {
    const res = await request(app).get(`/api/todos/${createdTodoId}`);
    expect(res.statusCode).toEqual(404);
  });
});

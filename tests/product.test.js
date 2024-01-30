const request = require('supertest');
const app = require('../app'); // Replace with the path to your main application file
const mongoose = require('mongoose');

beforeEach(async () => {
  // Clear the database before each test
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  // Close the database connection after all tests
  await mongoose.connection.close();
});

describe('Dashboard Routes', () => {
  it('should get dashboard data', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response data
  });

  // p
  it('should get product details by ID', async () => {
    // Create a test product first
    jest.setTimeout(10000);
    const product = await request(app)
      .post('/dashboard/add')
      .send({
        seller: 'Test Seller',
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      });

    const response = await request(app).get(`/dashboard/prod/${product.body._id}`);
    jest.setTimeout(10000); 
    expect(response.status).toBe(200);
   
    // Add more assertions based on your expected response data
  });

  //p
  it('should update product details by ID', async () => {
    // Create a test product first
    jest.setTimeout(10000);
    const product = await request(app)
      .post('/dashboard/add')
      .send({
        seller: 'Test Seller',
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      });

    const response = await request(app)
      .put(`/dashboard/prod/${product.body._id}`)
      .send({
        name: 'Updated Product Name',
      });

    expect(response.status).toBe(200);
   
    // Add more assertions based on your expected response data
  });


  
  it('should delete product by ID', async () => {
    // Create a test product first
    const product = await request(app)
      .post('/dashboard/add')
      .send({
        seller: 'Test Seller',
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      });

    const response = await request(app).delete(`/dashboard/prod-delete/${product.body._id}`);

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response data
  });

  // 
  it('should add a new product', async () => {
    const response = await request(app)
      .post('/dashboard/add')
      .send({
        seller: 'Test Seller',
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      });

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response data
  });

  it('should search for products', async () => {
    // Create a test product first
    await request(app)
      .post('/dashboard/add')
      .send({
        seller: 'Test Seller',
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
      });

    const response = await request(app)
      .post('/dashboard/search')
      .send({
        searchTerm: 'Test Product',
      });

    expect(response.status).toBe(200);
    // Add more assertions based on your expected response data
  });
});

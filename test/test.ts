import request from 'supertest';
import app from '../app';

describe('App', function() {
  it('has the default page', function() {
    request(app)
      .get('/')
      .expect("This is the home endpoint");
  });
}); 

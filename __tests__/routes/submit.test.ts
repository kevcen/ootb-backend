import request from 'supertest';
import app from '../../app';

describe('Submit', function() {
  it('has the default page', function(done) {
    request(app)
      .post('/submit')
      .expect("[[],[]]", done);
  });
}); 

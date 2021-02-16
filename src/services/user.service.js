// Service used by React to make api calls to the backend
import http from './http';
import axios from 'axios';

class UserService {
  getAll() {
    return http.get('/api/users');
  }

  getUser(id) {
    return http.get('/api/users/' + id)
      .catch(ex => {
        if(ex.response.status === 401)
        console.log('ERR: ' + ex)
      });
  }

  createUser(user) {
    return http.post('/api/users/add', user)
  }

  updateUser(id, user) {
    return http.post('/api/users/update/' + id, user);
  }

  deleteUser(id) {
    return http.delete('/api/users/delete/' + id);
  }
}

export default new UserService();
import http from './http';

class AuthService {
  login(creds) {
    return http.post('/api/login', creds)
      .catch(err => {return err});
  }
}

export default new AuthService();
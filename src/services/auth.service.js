import http from './http';

class AuthService {
  login(creds) {
    return http.post('/api/login', creds)
  }
}

export default new AuthService();
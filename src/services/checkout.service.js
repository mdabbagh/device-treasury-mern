// Service used by React to make api calls to the backend
import http from './http';

class CheckoutService {
  getCheckoutsHistoryAll() {
    return http.get('/api/checkouts/history');
  }

  // Get user checkout history
  get(id) {
    return http.get('/api/checkouts/history/user/' + id)
      .catch(ex => console.log('ERR: ' + ex));
  }

  // Get device checkout history
  get(id) {
    return http.get('/api/checkouts/history/device/' + id)
      .catch(ex => console.log('ERR: ' + ex));
  }
}

export default new CheckoutService();
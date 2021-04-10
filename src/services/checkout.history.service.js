// Service used by React to make api calls to the backend
import http from './http';

class CheckoutHistoryService {
  getAllHistory() {
    return http.get('/api/checkouts/history')
      .catch(ex => console.log(('ERR: ' + ex)));
  }

  // Get user checkout history
  getUserHistory(id) {
    return http.get('/api/checkouts/history/user/' + id)
      .catch(ex => console.log('ERR: ' + ex));
  }

  // Get device checkout history
  getDeviceHistory(id) {
    return http.get('/api/checkouts/history/device/' + id)
      .catch(ex => console.log('ERR: ' + ex));
  }
}

export default new CheckoutHistoryService();
// Service used by React to make api calls to the backend
import http from './http';

class DeviceService {
  getAll() {
    return http.get('/api/devices');
  }

  getDevice(id) {
    return http.get('/api/devices/' + id)
      .catch(ex => console.log('ERR: ' + ex));
  }

  createDevice(device) {
    return http.post('/api/devices/add', device)
  }

  updateDevice(id, device) {
    return http.post('/api/devices/update/' + id, device);
  }

  deleteDevice(id) {
    return http.delete('/api/devices/delete/' + id);
  }
}

export default new DeviceService();
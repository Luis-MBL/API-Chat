import { http } from './http';
import './websocket/client';
import './websocket/admin';

http.listen(5003, () => console.log('▶️ Server is running on port 5003'));

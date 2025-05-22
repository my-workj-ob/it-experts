import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
// https://tester-ajuz.onrender.com
// http://localhost:8888
if (typeof window !== 'undefined') {
	const token = localStorage.getItem('accessToken');
	socket = io('http://localhost:8888/notifications', {
		auth: {
			token,
		},
		transports: ['websocket', 'polling'],
		withCredentials: true,
		forceNew: true,
		autoConnect: true,
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		timeout: 10000,
	});

	socket.connect();
}

export { socket };

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

if (typeof window !== 'undefined') {
	const token = localStorage.getItem('accessToken');
	socket = io('http://localhost:3030/notifications', {
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

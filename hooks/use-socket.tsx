import { io } from 'socket.io-client';

export const useSocket = () => {

	const socket = io('http://localhost:3030', {
		transports: ['websocket', 'polling'],
		withCredentials: true,
		forceNew: true,
		autoConnect: false,
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		timeout: 10000,
	});

	socket.connect();

	return () => {
		socket.disconnect(); // Komponent o'chirilganda socketni uzing
	};
};

import { io } from 'socket.io-client';

export const useSocket = () => {

	const socket = io('https://tester-ajuz.onrender.com', {
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

// Format date for messages
export const formatMessageDate = (timestamp: string) => {
	const date = new Date(timestamp);
	const now = new Date();
	const isToday = date.toDateString() === now.toDateString();

	if (isToday) {
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	const yesterday = new Date(now);
	yesterday.setDate(yesterday.getDate() - 1);
	const isYesterday = date.toDateString() === yesterday.toDateString();

	if (isYesterday) {
		return 'Yesterday';
	}

	// If it's within the last week, show the day name
	const oneWeekAgo = new Date(now);
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
	if (date > oneWeekAgo) {
		return date.toLocaleDateString([], { weekday: 'long' });
	}

	// Otherwise show the date
	return date.toLocaleDateString([], {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};

// Group messages by date
export const groupMessagesByDate = (messages: any[]) => {
	const groups: { [key: string]: any[] } = {};

	messages.forEach(message => {
		const date = new Date(message.timestamp).toDateString();
		if (!groups[date]) {
			groups[date] = [];
		}
		groups[date].push(message);
	});

	return Object.entries(groups).map(([date, messages]) => ({
		date,
		messages,
	}));
};

// Debounce function
export const debounce = (func: Function, delay: number) => {
	let timeoutId: NodeJS.Timeout;
	return (...args: any[]) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

'use client';

import type React from 'react';

import type { Message } from '@/types/chat';
import { useCallback, useRef, useState } from 'react';

export function useChatUI() {
	// UI state
	const [message, setMessage] = useState('');
	const [isMobile, setIsMobile] = useState(false);
	const [showContacts, setShowContacts] = useState(true);
	const [showUserProfile, setShowUserProfile] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [isAttaching, setIsAttaching] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
	const [contextMenuPosition, setContextMenuPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [uploadProgress, setUploadProgress] = useState<{
		[key: string]: number;
	}>({});
	const [uploadErrors, setUploadErrors] = useState<{ [key: string]: boolean }>(
		{}
	);
	const [messageReactions, setMessageReactions] = useState<{
		[key: number]: { emoji: string; count: number; users: number[] }[];
	}>({});
	const [currentTheme, setCurrentTheme] = useState<string>('dark');
	const [typingUsers, setTypingUsers] = useState<{ [key: number]: boolean }>(
		{}
	);

	// Refs
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const chatAreaRef = useRef<HTMLDivElement>(null);
	const messagesStartRef = useRef<HTMLDivElement>(null);

	// Check for mobile screen size
	const checkMobile = useCallback(() => {
		const isMobileView = window.innerWidth < 768;
		setIsMobile(isMobileView);
		setShowContacts(!isMobileView);
	}, []);

	// Toggle contacts sidebar (for mobile)
	const toggleContacts = useCallback(() => {
		setShowContacts(prev => !prev);
	}, []);

	// Toggle user profile card
	const toggleUserProfile = useCallback(() => {
		setShowUserProfile(prev => !prev);
	}, []);

	// Toggle settings modal
	const toggleSettingsModal = useCallback(() => {
		setShowSettingsModal(prev => !prev);
	}, []);

	// Handle audio recording completion
	const handleRecordingComplete = useCallback((blob: Blob) => {
		setAudioBlob(blob);
		setIsRecording(false);
	}, []);

	// Handle message context menu
	const handleMessageContextMenu = useCallback(
		(e: React.MouseEvent, message: Message) => {
			e.preventDefault();
			setContextMenuPosition({ x: e.clientX, y: e.clientY });
			setSelectedMessage(message);
		},
		[]
	);

	// Close context menu
	const closeContextMenu = useCallback(() => {
		setContextMenuPosition(null);
		setSelectedMessage(null);
	}, []);

	// Handle message reply
	const handleReplyMessage = useCallback(
		(message: Message) => {
			setMessage(
				`Replying to: "${message.message.substring(0, 20)}${
					message.message.length > 20 ? '...' : ''
				}" \n`
			);
			closeContextMenu();
		},
		[closeContextMenu]
	);

	// Handle emoji selection
	const handleEmojiSelect = useCallback((emoji: string) => {
		setMessage(prev => prev + emoji);
	}, []);

	// Handle file selection
	const handleFileSelect = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files) {
				const newFiles = Array.from(e.target.files);
				setSelectedFiles(prev => [...prev, ...newFiles]);
			}
		},
		[]
	);

	// Handle file removal
	const handleRemoveFile = useCallback(
		(index: number) => {
			setSelectedFiles(prev => prev.filter((_, i) => i !== index));
			// Also remove any upload progress or errors
			const fileId = selectedFiles[index]?.name;
			if (fileId) {
				setUploadProgress(prev => {
					const newProgress = { ...prev };
					delete newProgress[fileId];
					return newProgress;
				});
				setUploadErrors(prev => {
					const newErrors = { ...prev };
					delete newErrors[fileId];
					return newErrors;
				});
			}
		},
		[selectedFiles]
	);

	// Handle file attachment
	const handleAttachment = useCallback(() => {
		// Create a file input element
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.multiple = true;
		fileInput.accept =
			'image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';

		// Add event listener for file selection
		fileInput.addEventListener('change', e => handleFileSelect(e as any));

		// Trigger file selection dialog
		fileInput.click();
	}, [handleFileSelect]);

	// Handle theme change
	const handleThemeChange = useCallback((theme: any) => {
		setCurrentTheme(theme.name);
		// You could also save this preference to localStorage or your backend
	}, []);

	return {
		// State
		message,
		isMobile,
		showContacts,
		showUserProfile,
		isRecording,
		isAttaching,
		showSettingsModal,
		audioBlob,
		contextMenuPosition,
		selectedMessage,
		selectedFiles,
		uploadProgress,
		uploadErrors,
		messageReactions,
		currentTheme,
		typingUsers,

		// Refs
		messagesEndRef,
		chatAreaRef,
		messagesStartRef,

		// Setters
		setMessage,
		setIsMobile,
		setShowContacts,
		setShowUserProfile,
		setIsRecording,
		setIsAttaching,
		setShowSettingsModal,
		setAudioBlob,
		setContextMenuPosition,
		setSelectedMessage,
		setSelectedFiles,
		setUploadProgress,
		setUploadErrors,
		setMessageReactions,
		setCurrentTheme,
		setTypingUsers,

		// Functions
		checkMobile,
		toggleContacts,
		toggleUserProfile,
		toggleSettingsModal,
		handleRecordingComplete,
		handleMessageContextMenu,
		closeContextMenu,
		handleReplyMessage,
		handleEmojiSelect,
		handleFileSelect,
		handleRemoveFile,
		handleAttachment,
		handleThemeChange,
	};
}

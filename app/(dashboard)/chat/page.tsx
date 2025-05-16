"use client";

import type React from "react";

import useProfile from "@/hooks/profile/use-profile";
import { cn } from "@/lib/utils";
import { get } from "lodash";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Import custom hooks
import { useChatData } from "@/hooks/chat/use-chat-data";
import { useChatSocket } from "@/hooks/chat/use-chat-sockets";
import { useChatUI } from "@/lib/use-chat-ui";

// Import components
import { WebPushSubscription } from "@/components/notifications/web-push-subscription";
import { ChatHeader } from "./components/chat-header";
import { ChatSettingsModal } from "./components/chat-settings";
import { ChatThemeSelector } from "./components/chat-theme-selector";
import { ContactsSidebar } from "./components/contact-sidebar";
import { FilePreview } from "./components/file-preview";
import { MessageContextMenu } from "./components/message-context-menu";
import { MessageInput } from "./components/message-input";
import { MessageList } from "./components/message-list";
import { MessageStatusBar } from "./components/message-status";
import { UserProfileCard } from "./components/user-profile-card";
import { VoiceRecorder } from "./components/voice-recorder";
import { WelcomeScreen } from "./components/welcome-screen";

const messageAnimations = `
  @keyframes message-send {
    0% { transform: translateX(10px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  @keyframes message-receive {
    0% { transform: translateX(-10px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  @keyframes read-receipt {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-3px); }
  }
  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

export default function ChatInterface() {
  // Hooks
  const { userProfileData } = useProfile();
  const currentUserId = get(userProfileData, "id");

  // URL parameters

  // UI state and handlers
  const {
    message,
    isMobile,
    showContacts,
    showUserProfile,
    isRecording,
    showSettingsModal,
    audioBlob,
    contextMenuPosition,
    selectedMessage,
    selectedFiles,
    uploadProgress,
    uploadErrors,
    currentTheme,
    typingUsers,
    messagesEndRef,
    chatAreaRef,
    messagesStartRef,
    setMessage,
    setIsRecording,
    setAudioBlob,
    setTypingUsers,
    setMessageReactions,
    checkMobile,
    toggleContacts,
    toggleUserProfile,
    toggleSettingsModal,
    handleRecordingComplete,
    handleMessageContextMenu,
    closeContextMenu,
    handleReplyMessage,
    handleEmojiSelect,
    handleRemoveFile,
    handleAttachment,
    handleThemeChange,
  } = useChatUI();

  // Chat data state and handlers
  const [onlineUsersList, setOnlineUsersList] = useState<number[]>([]);

  const {
    selectedContact,
    userDetails,
    messages,
    isLoading,
    isLoadingMore,
    lastActive,
    searchQuery,
    setMessages,
    setUsers,
    setLastActive,
    setSearchQuery,
    selectContact,
    getUnreadCounts,
    handleAccept,
    handleRequest,
    handleRemoveConnection,
    filteredUsers,
    groupedMessages,
  } = useChatData({
    currentUserId,
    onlineUsers: onlineUsersList,
  });

  // Socket connection and handlers
  const { emitTyping, sendMessage, editMessage, deleteMessage } = useChatSocket(
    {
      currentUserId: currentUserId || 0,
      selectedContact,
      setOnlineUsers: setOnlineUsersList,
      setTypingUsers,
      setLastActive,
      setMessages,
      setUsers,
      setMessageReactions,
      getUnreadCounts,
    }
  );

  // Check for mobile screen size on mount and resize
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [checkMobile]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Typing holatini qayta yuklashda tozalash
  useEffect(() => {
    setTypingUsers({}); // Sahifa yuklanganda typingUsersni tozalash
    if (currentUserId && selectedContact?.id) {
      emitTyping(selectedContact.id, false); // Oldingi typing hodisasini to'xtatish
    }
  }, [currentUserId, selectedContact?.id, emitTyping, setTypingUsers]);

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check if the message is empty or if no contact is selected

    if (
      (!message.trim() && !audioBlob && selectedFiles.length === 0) ||
      !selectedContact ||
      !currentUserId
    ) {
      return;
    }

    // Determine if this is a text, audio, or file message
    const isAudioMessage = !!audioBlob;
    const hasAttachments = selectedFiles.length > 0;
    let messageContent = message.trim();
    let audioUrl = "";
    let fileUrls: string[] = [];

    // If it's an audio message, upload the audio file
    if (isAudioMessage) {
      try {
        // Create a FormData object to send the audio file
        const formData = new FormData();
        formData.append("audio", audioBlob);

        // Upload the audio file to your server
        const response = await fetch("/api/upload-audio", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        audioUrl = data.url;
        messageContent = "🎤 Voice message"; // Placeholder text for voice messages
      } catch (error) {
        console.error("Error uploading audio:", error);
        alert("Failed to upload voice message. Please try again.");
        return;
      }
    }

    // If there are file attachments, upload them
    if (hasAttachments) {
      try {
        // Upload each file and track progress
        const uploadPromises = selectedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          // Create upload request
          const response = await fetch("/api/upload-file", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          return data.url;
        });

        // Wait for all uploads to complete
        fileUrls = await Promise.all(uploadPromises);

        // Add file info to message if it's the only content
        if (!messageContent) {
          messageContent = `📎 ${selectedFiles.length} file${
            selectedFiles.length > 1 ? "s" : ""
          } attached`;
        }
      } catch (error) {
        console.error("Error uploading files:", error);
        alert("Failed to upload one or more files. Please try again.");
        return;
      }
    }

    const messageData = {
      senderId: currentUserId,
      receiverId: selectedContact.id,
      message: messageContent,
      audioUrl: audioUrl,
      fileUrls: fileUrls,
    };

    // Create temporary message (for optimistic UI update)
    const tempId = Date.now(); // Timestamp ID - this will be a very large number

    const tempMessage = {
      id: tempId,
      sender: {
        id: currentUserId,
        email: userProfileData?.email || "current@user.com",
      },
      receiver: {
        id: selectedContact.id,
        email: selectedContact.email || "receiver@user.com",
      },
      message: messageContent,
      isRead: false,
      timestamp: new Date().toISOString(),
      isNew: true, // Mark as new for animation
      audioUrl: audioUrl, // Add audio URL if it's a voice message
      fileUrls: fileUrls, // Add file URLs if there are attachments
    };

    // Add temporary message to UI
    setMessages((prev) => [...prev, tempMessage]);

    // Update last message in contacts list
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedContact.id
          ? { ...user, lastMessage: messageContent }
          : user
      )
    );

    // Clear input field, audio blob, and selected files
    setMessage("");
    setAudioBlob(null);
    setIsRecording(false);

    // Send message via socket
    sendMessage(
      messageData,
      tempId,
      (response) => {
        // Success callback
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === tempId ? { ...response.message, isNew: true } : msg
          )
        );
      },
      () => {
        // Error callback
        setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      }
    );
  };

  // Handle message edit
  const handleEditMessage = (messageId: number, newContent: string) => {
    editMessage(messageId, newContent, () => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, message: newContent } : msg
        )
      );
    });
    closeContextMenu();
  };

  // Handle message delete
  const handleDeleteMessage = (messageId: number) => {
    deleteMessage(messageId, () => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    });
    closeContextMenu();
  };

  return (
    <>
      <WebPushSubscription />
      <style jsx global>
        {messageAnimations}
      </style>
      <div
        className={cn(
          "h-[calc(100vh-15rem)] flex bg-slate-900 text-white rounded-lg border border-slate-800 overflow-hidden",
          currentTheme === "green" && "border-green-500/20",
          currentTheme === "blue" && "border-blue-500/20",
          currentTheme === "purple" && "border-purple-500/20",
          currentTheme === "amber" && "border-amber-500/20",
          currentTheme === "rose" && "border-rose-500/20"
        )}
      >
        {(showContacts || !isMobile) && (
          <ContactsSidebar
            showContacts={showContacts}
            isMobile={isMobile}
            toggleContacts={toggleContacts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredUsers={filteredUsers}
            selectedContact={selectedContact}
            currentUserId={currentUserId || 0}
            selectContact={selectContact}
            userDetails={userDetails}
          />
        )}

        <div className="flex-1 flex flex-col bg-slate-900" ref={chatAreaRef}>
          {selectedContact ? (
            <>
              <ChatHeader
                selectedContact={selectedContact}
                isMobile={isMobile}
                toggleContacts={toggleContacts}
                toggleUserProfile={toggleUserProfile}
                toggleSettingsModal={toggleSettingsModal}
                typingUsers={typingUsers}
                handleRequest={handleRequest}
                handleAccept={handleAccept}
                handleRemoveConnection={handleRemoveConnection}
                userDetails={userDetails}
              />

              {showUserProfile && userDetails && (
                <UserProfileCard user={userDetails} />
              )}

              <div className="px-4 py-2">
                <MessageStatusBar
                  messageCount={messages.length}
                  unreadCount={selectedContact.unread || 0}
                  isOnline={selectedContact.online}
                  lastActive={lastActive[selectedContact.id]}
                  isTyping={typingUsers[selectedContact.id] || false}
                />
              </div>

              <div
                className="flex-1 overflow-auto p-4"
                onContextMenu={(e) => e.preventDefault()}
              >
                <MessageList
                  isLoading={isLoading}
                  isLoadingMore={isLoadingMore}
                  groupedMessages={groupedMessages}
                  currentUserId={currentUserId || 0}
                  handleMessageContextMenu={handleMessageContextMenu}
                  handleEditMessage={handleEditMessage}
                  handleDeleteMessage={handleDeleteMessage}
                  handleReplyMessage={handleReplyMessage}
                  messagesEndRef={messagesEndRef}
                  messagesStartRef={messagesStartRef}
                />
              </div>

              {selectedFiles.length > 0 && (
                <div className="px-3 pt-3 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <FilePreview
                      key={index}
                      file={file}
                      onRemove={() => handleRemoveFile(index)}
                      uploadProgress={uploadProgress[file.name]}
                      isUploading={
                        uploadProgress[file.name] > 0 &&
                        uploadProgress[file.name] < 100
                      }
                      isError={uploadErrors[file.name]}
                    />
                  ))}
                </div>
              )}

              <div className="p-3 border-t border-slate-800">
                {isRecording ? (
                  <VoiceRecorder
                    onComplete={handleRecordingComplete}
                    onCancel={() => setIsRecording(false)}
                  />
                ) : (
                  <MessageInput
                    message={message}
                    setMessage={setMessage}
                    handleSendMessage={handleSendMessage}
                    handleAttachment={handleAttachment}
                    startRecording={() => setIsRecording(true)}
                    debouncedEmitTyping={emitTyping}
                    selectedContactId={selectedContact.id}
                    audioBlob={audioBlob}
                    handleEmojiSelect={handleEmojiSelect}
                  />
                )}
              </div>
            </>
          ) : (
            <WelcomeScreen
              isMobile={isMobile}
              toggleContacts={toggleContacts}
            />
          )}
        </div>
      </div>

      {showSettingsModal && selectedContact && (
        <ChatSettingsModal user={selectedContact} isOpen={showSettingsModal} />
      )}

      {contextMenuPosition && selectedMessage && (
        <MessageContextMenu
          position={contextMenuPosition}
          message={selectedMessage}
          currentUserId={currentUserId || 0}
          onClose={closeContextMenu}
          onEdit={handleEditMessage}
          onDelete={handleDeleteMessage}
          onReply={handleReplyMessage}
        />
      )}

      <div className="absolute bottom-4 right-4">
        <ChatThemeSelector
          onSelectTheme={handleThemeChange}
          currentTheme={currentTheme}
        />
      </div>
    </>
  );
}

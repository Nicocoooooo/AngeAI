// src/contexts/ChatContext.tsx
import { createContext, useContext, useState } from 'react';
import { Conversation, Message } from '../types';

interface ChatContextType {
    currentConversation: Conversation | null;
    messages: Message[];
    setCurrentConversation: (conversation: Conversation | null) => void;
    addMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const value = {
        currentConversation,
        messages,
        setCurrentConversation,
        addMessage: (message: Message) => {
            setMessages(prev => [...prev, message]);
        },
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export const useChat = () => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
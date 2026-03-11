import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/AiAssistant.css';

const AiAssistant = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hello! I am your AI Legal Assistant. How can I help you today? \n\nYou can ask me about legal actions for issues like harassment, child abuse, domestic violence, or online stalking.",
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/api/v1/ai/chat', {
                prompt: userMessage.text,
            });

            const botMessage = {
                id: Date.now() + 1,
                sender: 'bot',
                text: response.data.answer || "I'm sorry, I couldn't process your request.",
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            const errorMessage = {
                id: Date.now() + 1,
                sender: 'bot',
                text: "Sorry, I am having trouble connecting to the server. Please check your network or try again later.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ai-chat-container">
            <Link to="/" className="back-btn">
                <i className="fa fa-arrow-left"></i> Back to Home
            </Link>

            <div className="chat-card">
                {/* Header */}
                <div className="chat-header">
                    <div className="header-icon">
                        <i className="fa fa-robot"></i>
                    </div>
                    <div className="header-text">
                        <h2>AI Legal Assistant</h2>
                        <p>Always active, always anonymous.</p>
                    </div>
                </div>

                {/* Message Area */}
                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sender}`}>
                            <div className="message-bubble">
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="message bot flex-start">
                            <div className="message-bubble typing-indicator">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="chat-input-area">
                    <div className="input-wrapper">
                        <textarea
                            className="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="E.g., A man is harassing me on a bus..."
                            rows="1"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
                                }
                            }}
                        />
                        <button
                            type="submit"
                            className="send-btn"
                            disabled={isLoading || !input.trim()}
                        >
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AiAssistant;

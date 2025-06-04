
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getMedicalResponse } from '@/utils/medicalKnowledgeBase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your medical assistant. I can help you understand common symptoms and provide general guidance for minor health issues like coughs, colds, headaches, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getMedicalResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-4 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">MediCare Assistant</h1>
            <p className="text-gray-600 dark:text-gray-300">Your AI health companion for common medical questions</p>
          </div>
          <ThemeToggle />
        </div>

        <Alert className="mb-6 border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>Medical Disclaimer:</strong> This chatbot provides general health information only. 
            Always consult with healthcare professionals for proper diagnosis and treatment. 
            In case of emergency, call your local emergency services immediately.
          </AlertDescription>
        </Alert>

        <Card className="h-[600px] flex flex-col shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              Medical Assistant
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-600 dark:text-blue-400' 
                        : 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-600 dark:text-green-400'
                    }`}>
                      {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-br-none shadow-lg'
                        : 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-md'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <span className={`text-xs mt-1 block ${
                        message.sender === 'user' ? 'text-blue-200 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 text-green-600 dark:text-green-400 flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg rounded-bl-none p-3 shadow-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-border p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your symptoms or ask a health question..."
                    className="flex-1 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 bg-background"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 shadow-lg"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Common topics: Cough, Cold, Fever, Headache, Sore Throat, Stomach Pain, Allergies</p>
        </div>
      </div>
    </div>
  );
};

export default Index;

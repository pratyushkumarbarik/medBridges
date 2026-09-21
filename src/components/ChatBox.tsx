import { useState } from 'react';
import { Send, Paperclip, Image as ImageIcon } from 'lucide-react';

interface Message {
  id: string;
  sender: 'patient' | 'hospital';
  senderName: string;
  text: string;
  date: string;
  read: boolean;
  attachments?: { name: string; url: string }[];
}

interface ChatBoxProps {
  messages: Message[];
  hospitalName: string;
}

export default function ChatBox({ messages, hospitalName }: ChatBoxProps) {
  const [input, setInput] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-xl flex flex-col h-[500px]">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{hospitalName}</h3>
          <p className="text-xs text-green-500">Online</p>
        </div>
        <div className="flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
          <ImageIcon className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-8">
            <p>No messages yet</p>
            <p className="mt-1">Start the conversation with {hospitalName}</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
              msg.sender === 'patient'
                ? 'bg-teal-600 text-white rounded-br-md'
                : 'bg-gray-100 text-gray-800 rounded-bl-md'
            }`}>
              {msg.sender !== 'patient' && (
                <p className="text-xs font-medium opacity-70 mb-1">{msg.senderName}</p>
              )}
              <p className="text-sm">{msg.text}</p>
              {msg.attachments && msg.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {msg.attachments.map((att, i) => (
                    <a key={i} href={att.url} className="text-xs underline opacity-80 hover:opacity-100 block">
                      {att.name}
                    </a>
                  ))}
                </div>
              )}
              <p className={`text-xs mt-1 ${msg.sender === 'patient' ? 'text-teal-200' : 'text-gray-400'}`}>
                {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                setInput('');
              }
            }}
          />
          <button
            onClick={() => setInput('')}
            disabled={!input.trim()}
            className="bg-teal-600 text-white p-2.5 rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

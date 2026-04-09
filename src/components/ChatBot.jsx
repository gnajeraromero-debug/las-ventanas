import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: '¡Bienvenido a la cima de Monterrey! Soy el Concierge Virtual de Las Ventanas. ¿Deseas información sobre bodas, eventos corporativos o agendar una visita?' 
    }
  ]);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add the user's message to the chat
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');

    // Simulate an AI typing delay, then respond
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Excelente. He notificado a uno de nuestros asesores premium. Para brindarte atención personalizada de inmediato, ¿podrías dejarme tu nombre y teléfono?' 
      }]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      
      {/* The Chat Window */}
      <div 
        className={`mb-4 w-80 sm:w-96 transition-all duration-500 origin-bottom-right overflow-hidden ${
          isOpen ? 'scale-100 opacity-100 max-h-[500px]' : 'scale-50 opacity-0 max-h-0 pointer-events-none'
        }`}
      >
        <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[450px]">
          
          {/* Chat Header */}
          <div className="bg-zinc-950 p-4 border-b border-white/5 flex justify-between items-center rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-logo-blue" />
              <span className="text-white font-serif tracking-widest uppercase text-sm">Concierge VIP</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 text-sm font-light leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-logo-blue-dark text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-zinc-900 border border-white/5 text-zinc-300 rounded-2xl rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-zinc-950/50 rounded-b-2xl">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..." 
                className="w-full bg-zinc-900 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-logo-blue transition-colors"
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="absolute right-2 p-2 bg-logo-blue-dark text-black rounded-full hover:bg-logo-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 ml-[2px]" />
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* The Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-logo-blue hover:bg-logo-blue-light text-black p-4 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
      </button>

    </div>
  );
}
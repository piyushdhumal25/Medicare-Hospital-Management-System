import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingText, setBotTypingText] = useState("");
  const [showWelcomeTyping, setShowWelcomeTyping] = useState(false);
  const [welcomeTypingText, setWelcomeTypingText] = useState("");
  const messagesEndRef = useRef(null);
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Show animated welcome message as a typewriter effect in the message box (no time period)
  useEffect(() => {
    if (open) {
      setShowWelcomeTyping(true);
      setWelcomeTypingText("");
      const welcomeMsg = "Welcome! How can I help you today?";
      let i = 0;
      function typeWelcome() {
        setWelcomeTypingText(welcomeMsg.slice(0, i + 1));
        if (i < welcomeMsg.length - 1) {
          i++;
          setTimeout(typeWelcome, 22);
        }
      }
      setTimeout(typeWelcome, 400);
    } else {
      setShowWelcomeTyping(false);
      setWelcomeTypingText("");
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsBotTyping(true);
    setBotTypingText("");

    try {
      const res = await axios.post('/api/chat', { message: input });
      const fullText = res.data.response;
      // Typewriter effect
      let i = 0;
      function typeWriter() {
        setBotTypingText(fullText.slice(0, i + 1));
        if (i < fullText.length - 1) {
          i++;
          setTimeout(typeWriter, 18); // speed of typing
        } else {
          setMessages(prev => [...prev, { sender: 'bot', text: fullText }]);
          setIsBotTyping(false);
          setBotTypingText("");
        }
      }
      setTimeout(typeWriter, 400); // initial delay
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, there was an error.' }]);
      setIsBotTyping(false);
      setBotTypingText("");
      console.error(err);
    }
  };

  return (
    <>
      {/* Animated floating message above the chatbot button */}

      {/* Animated floating message above the chatbot button */}
      {!open && (
        <div className="fixed bottom-24 right-6 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-5 py-2 rounded-full shadow-xl text-base font-semibold border-2 border-white flex items-center gap-2" style={{whiteSpace:'nowrap', filter:'drop-shadow(0 2px 8px rgba(0,0,0,0.10))'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-pulse">
              <circle cx="12" cy="12" r="10" fill="#fff" fillOpacity="0.15"/>
              <ellipse cx="12" cy="13.5" rx="6" ry="4.5" fill="#fff" fillOpacity="0.10"/>
              <path d="M8 10c0-2 8-2 8 0v2c0 2-8 2-8 0v-2z" fill="#fff" fillOpacity="0.20"/>
              <circle cx="9.5" cy="11.5" r="1.2" fill="#38bdf8"/>
              <circle cx="14.5" cy="11.5" r="1.2" fill="#38bdf8"/>
              <ellipse cx="12" cy="15.5" rx="2.5" ry="1" fill="#38bdf8" fillOpacity="0.7"/>
            </svg>
            <span>Hii ! I'm Your Health ChatBot</span>
          </div>
        </div>
      )}

      {/* Chatbot floating button */}

      <button
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl z-50 border-4 border-white transition-all duration-300 group overflow-hidden"
        style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.18)' }}
        onClick={() => setOpen(o => !o)}
        aria-label="Open chatbot"
      >
        {/* Robot face image as logo */}
        <img
          src="https://th.bing.com/th/id/OIP.BlCqgS5tOhUcb-86KC7MDgHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
          alt="Chatbot Logo"
          className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-md animate-pulse"
        />
      </button>

      {/* Chatbot window */}
      {open && (
        <div className="fixed bottom-28 right-8 w-[340px] bg-white shadow-2xl rounded-2xl p-4 z-50 animate-fade-in flex flex-col" style={{backdropFilter:'blur(6px)'}}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-blue-700 text-lg tracking-wide flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#38bdf8" fillOpacity="0.15"/>
                <ellipse cx="12" cy="13.5" rx="6" ry="4.5" fill="#38bdf8" fillOpacity="0.10"/>
                <path d="M8 10c0-2 8-2 8 0v2c0 2-8 2-8 0v-2z" fill="#38bdf8" fillOpacity="0.20"/>
                <circle cx="9.5" cy="11.5" r="1.2" fill="#38bdf8"/>
                <circle cx="14.5" cy="11.5" r="1.2" fill="#38bdf8"/>
                <ellipse cx="12" cy="15.5" rx="2.5" ry="1" fill="#38bdf8" fillOpacity="0.7"/>
              </svg>
              Health Chatbot
            </span>
            <button className="text-gray-400 hover:text-gray-700 text-xl transition-transform duration-200 hover:scale-125" onClick={() => setOpen(false)} aria-label="Close chatbot">✕</button>
          </div>
          <div className="h-72 overflow-y-scroll p-2 mb-2 bg-gradient-to-br from-blue-50/60 to-cyan-50/80 rounded-xl space-y-3 flex flex-col transition-all duration-300">
            {/* Animated welcome message as first message */}
            {showWelcomeTyping && (
              <div className="flex w-full items-end gap-2 justify-start animate-fade-in-up">
                <img
                  src="https://th.bing.com/th/id/OIP.BlCqgS5tOhUcb-86KC7MDgHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                  alt="Bot"
                  className="w-8 h-8 rounded-full border-2 border-blue-200 shadow-md animate-pulse"
                />
                <span
                  className="relative px-4 py-2 rounded-2xl shadow-lg max-w-[70%] text-base font-medium bg-white/90 text-gray-800 rounded-bl-2xl rounded-tl-2xl border-2 border-cyan-100 animate-bounce-in-left"
                  style={{fontFamily:'Cambria, Cochin, Georgia, Times, "Times New Roman", serif'}}
                >
                  {welcomeTypingText}
                  <span className="inline-block w-2 h-4 bg-cyan-400 align-middle animate-pulse ml-1" style={{verticalAlign:'middle'}}></span>
                </span>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex w-full items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                style={{animationDelay: `${idx * 60}ms`}}
              >
                {msg.sender === 'bot' && (
                  <img
                    src="https://th.bing.com/th/id/OIP.BlCqgS5tOhUcb-86KC7MDgHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                    alt="Bot"
                    className="w-8 h-8 rounded-full border-2 border-blue-200 shadow-md animate-pulse"
                  />
                )}
                <span
                  className={`relative px-4 py-2 rounded-2xl shadow-lg max-w-[70%] text-base font-medium transition-all duration-200
                    ${msg.sender === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white rounded-br-2xl rounded-tr-2xl border-2 border-blue-200 animate-bounce-in-right'
                      : 'bg-white/90 text-gray-800 rounded-bl-2xl rounded-tl-2xl border-2 border-cyan-100 animate-bounce-in-left'}
                  `}
                  style={{animationDelay: `${idx * 60}ms`, fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif'}}
                >
                  {msg.text}
                </span>
                {msg.sender === 'user' && (
                  <span className="w-8 h-8 ml-1"></span>
                )}
              </div>
            ))}
            {/* Typewriter effect for bot's current message */}
            {isBotTyping && botTypingText && (
              <div className="flex w-full items-end gap-2 justify-start animate-fade-in-up">
                <img
                  src="https://th.bing.com/th/id/OIP.BlCqgS5tOhUcb-86KC7MDgHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                  alt="Bot"
                  className="w-8 h-8 rounded-full border-2 border-blue-200 shadow-md animate-pulse"
                />
                <span
                  className="relative px-4 py-2 rounded-2xl shadow-lg max-w-[70%] text-base font-medium bg-white/90 text-gray-800 rounded-bl-2xl rounded-tl-2xl border-2 border-cyan-100 animate-bounce-in-left"
                  style={{fontFamily:'Cambria, Cochin, Georgia, Times, "Times New Roman", serif'}}
                >
                  {botTypingText}
                  <span className="inline-block w-2 h-4 bg-cyan-400 align-middle animate-pulse ml-1" style={{verticalAlign:'middle'}}></span>
                </span>
              </div>
            )}
            {isBotTyping && (
              <div className="flex items-center gap-2 animate-fade-in-up">
                <img
                  src="https://th.bing.com/th/id/OIP.BlCqgS5tOhUcb-86KC7MDgHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                  alt="Bot"
                  className="w-8 h-8 rounded-full border-2 border-blue-200 shadow-md animate-pulse"
                />
                <span className="bg-white/90 border-2 border-cyan-100 rounded-2xl px-4 py-2 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></span>
                  <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></span>
                  <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex mt-1 items-center gap-3">
            <input
              className="border-2 border-cyan-200 p-2 flex-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-300 bg-white/80 text-gray-800 placeholder:text-cyan-400 transition-all duration-200 shadow-sm"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your question..."
            />
            <button
              className="bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white rounded-xl flex items-center justify-center px-6 py-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 font-semibold text-base animate-fade-in-up"
              onClick={sendMessage}
              aria-label="Send message"
            >
              <span className="tracking-wider font-bold">Send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
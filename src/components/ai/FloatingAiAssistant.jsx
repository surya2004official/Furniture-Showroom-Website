import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { formatINR } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';

export const FloatingAiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { addToCart } = useCart();
  const [addedItemMap, setAddedItemMap] = useState({});

  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: "Greetings. I am Aura Concierge, your private architectural styling & furniture advisor. How may I assist in curating your sanctuary today?",
      suggestedQuestions: [
        "Suggest sofas under ₹1,50,000",
        "Which furniture fits small living rooms?",
        "Show luxury bedroom suites",
        "What wood is best for Indian climate?"
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with matching products and thoughtful interior design advice
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let aiResponseText = "";
      let matchedProducts = [];
      let newSuggestions = [];

      if (lowerQuery.includes('sofa') || lowerQuery.includes('seating') || lowerQuery.includes('couch')) {
        aiResponseText = "For seating, our artisanal curved bouclé and modular Italian featherdown sectionals deliver supreme comfort and architectural elegance:";
        matchedProducts = products.filter(p => p.category === 'living-room' && (p.name.includes('Sofa') || p.name.includes('Sectional'))).slice(0, 2);
        newSuggestions = ["Which coffee table pairs with these?", "Tell me about French bouclé care", "Show accent loungers"];
      } else if (lowerQuery.includes('small') || lowerQuery.includes('apartment') || lowerQuery.includes('compact')) {
        aiResponseText = "For compact floor plans, opt for floating low-profile silhouettes and multi-functional designs that maintain visual airiness:";
        matchedProducts = products.filter(p => p.id === 'prod-2' || p.id === 'prod-26' || p.id === 'prod-10');
        newSuggestions = ["Show room dividers", "Suggest dining tables for 4-6", "How does floating furniture help?"];
      } else if (lowerQuery.includes('bedroom') || lowerQuery.includes('bed') || lowerQuery.includes('sleep')) {
        aiResponseText = "Our bedroom collections emphasize restorative quietude with quarter-sawn white oak, cantilevered platform lighting, and cedar-lined credenzas:";
        matchedProducts = products.filter(p => p.category === 'bedroom').slice(0, 2);
        newSuggestions = ["Show matching nightstands", "What are the mattress dimensions?", "Explore the Kyoto Zen collection"];
      } else if (lowerQuery.includes('dining') || lowerQuery.includes('table') || lowerQuery.includes('dinner')) {
        aiResponseText = "For dining and entertaining, monumental Roman travertine and live-edge walnut slabs create unforgettable culinary centerpieces:";
        matchedProducts = products.filter(p => p.category === 'dining-room').slice(0, 2);
        newSuggestions = ["Do you provide custom table lengths?", "Tell me about sealing travertine", "Suggest dining chairs"];
      } else if (lowerQuery.includes('office') || lowerQuery.includes('desk') || lowerQuery.includes('work')) {
        aiResponseText = "Our executive office pieces blend ergonomic posture support with hand-patinated Italian aniline leather and concealed Qi fast wireless charging:";
        matchedProducts = products.filter(p => p.category === 'office').slice(0, 2);
        newSuggestions = ["What is the chair tilt mechanism?", "Show library shelving", "Book a private styling call"];
      } else if (lowerQuery.includes('wood') || lowerQuery.includes('climate') || lowerQuery.includes('weather') || lowerQuery.includes('teak')) {
        aiResponseText = "American Black Walnut and kiln-dried European Oak are seasoned to 8-10% moisture content, making them remarkably stable against coastal humidity and temperature swings. For outdoor terraces, our Grade-A Burmese plantation teak has natural silica oils impervious to rain and monsoons.";
        matchedProducts = products.filter(p => p.id === 'prod-19' || p.id === 'prod-27');
        newSuggestions = ["Show outdoor daybeds", "How often should I oil walnut?", "Explore custom woodwork"];
      } else if (lowerQuery.includes('budget') || lowerQuery.includes('under') || lowerQuery.includes('price')) {
        aiResponseText = "Here are exceptional handcrafted pieces offering unparalleled craftsmanship within your requested parameters:";
        matchedProducts = products.filter(p => p.price <= 90000).slice(0, 2);
        newSuggestions = ["Open Furniture Budget Planner", "Show 10% VIP coupon code", "Financing and EMI options"];
      } else {
        aiResponseText = "I understand your vision. Our master craftsmen curate pieces tailored to your exact aesthetic. Here are signature selections from our bestselling catalog:";
        matchedProducts = products.filter(p => p.featured).slice(0, 2);
        newSuggestions = ["Open AI Room Designer", "Virtual Showroom 360", "Book showroom visit"];
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        recommendedProducts: matchedProducts,
        suggestedQuestions: newSuggestions
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
    }, 900);
  };

  const handleAddProduct = (prod) => {
    addToCart(prod, 1);
    setAddedItemMap(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedItemMap(prev => ({ ...prev, [prod.id]: false }));
    }, 2500);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <div className="mb-2 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-900/90 text-ivory text-xs backdrop-blur-md border border-gold/40 shadow-xl animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>AI Furniture Advisor is Online</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="relative w-14 h-14 rounded-full walnut-gradient-bg text-ivory flex items-center justify-center shadow-luxury-hover border-2 border-gold/70 transition-transform duration-300 hover:scale-105 active:scale-95 group"
          aria-label="Toggle AI Furniture Shopping Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-ivory" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
            </>
          )}
        </button>
      </div>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-40 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-[#FAF8F5] border border-gold/40 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 py-4 bg-charcoal text-ivory flex items-center justify-between border-b border-gold/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-sm font-semibold tracking-wide text-ivory">AURA Concierge AI</h3>
                <p className="text-[11px] text-gold/80 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Architectural Style & Product Advisor
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ivory/70 hover:text-ivory p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-walnut text-ivory rounded-br-none shadow-sm'
                      : 'bg-white text-charcoal border border-beige-300 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                </div>

                {/* Recommended Product Cards inside AI Message */}
                {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                  <div className="w-full mt-3 space-y-2">
                    {m.recommendedProducts.map(prod => (
                      <div 
                        key={prod.id} 
                        className="bg-white rounded-xl p-2.5 border border-gold/30 shadow-sm flex items-center gap-3 hover:border-gold transition-colors"
                      >
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/product/${prod.id}`}
                            onClick={() => setIsOpen(false)}
                            className="font-serif-luxury text-xs font-semibold text-charcoal truncate block hover:text-gold"
                          >
                            {prod.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-walnut">{formatINR(prod.price)}</span>
                            {prod.originalPrice && (
                              <span className="text-[10px] text-charcoal/40 line-through">{formatINR(prod.originalPrice)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => handleAddProduct(prod)}
                            className="p-2 rounded-lg bg-beige-100 hover:bg-gold text-charcoal text-xs font-medium transition-colors"
                            title="Add to Cart"
                          >
                            {addedItemMap[prod.id] ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Follow-up Questions Chips */}
                {m.suggestedQuestions && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(q)}
                        className="text-[11px] bg-white hover:bg-beige-200 text-charcoal/80 border border-beige-300 px-2.5 py-1 rounded-full transition-all text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-charcoal/50 bg-white border border-beige-200 px-3 py-2 rounded-2xl w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                <span className="ml-1 text-[11px]">Curating bespoke recommendations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Shortcuts Bar */}
          <div className="px-4 py-2 bg-beige-50 border-t border-beige-200 flex items-center justify-between text-[11px] text-charcoal/70">
            <Link to="/ai-room-designer" onClick={() => setIsOpen(false)} className="hover:text-gold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" /> AI Room Designer
            </Link>
            <span className="text-beige-400">|</span>
            <Link to="/budget-planner" onClick={() => setIsOpen(false)} className="hover:text-gold">
              Budget Planner
            </Link>
            <span className="text-beige-400">|</span>
            <Link to="/book-showroom" onClick={() => setIsOpen(false)} className="hover:text-gold">
              Book Showroom
            </Link>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-beige-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about materials, budget, dimensions..."
                className="flex-1 bg-ivory text-xs px-3.5 py-2.5 rounded-xl border border-beige-300 focus:outline-none focus:border-gold transition-colors text-charcoal placeholder:text-charcoal/40"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-xl bg-walnut hover:bg-charcoal text-ivory disabled:opacity-40 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Send, Sparkles, ShoppingBag, ArrowRight, Check, 
  MessageCircle, RefreshCw, Compass, HelpCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const AIAssistantPage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Welcome to the AURA Atelier. I am your private AI styling advisor. Tell me about your space, architectural aspirations, or budget, and I will recommend curated pieces tailored to your residence.",
      suggestedQuestions: [
        "Suggest sofas under ₹1,50,000",
        "Which wood is best for Indian monsoons?",
        "Best furniture for small living rooms",
        "Show luxury bedroom suites"
      ]
    }
  ]);

  const { addToCart } = useCart();
  const [addedItemMap, setAddedItemMap] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text = null) => {
    const query = (text || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    if (!text) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const q = query.toLowerCase();
      let reply = "";
      let matched = [];
      let nextSuggestions = [];

      if (q.includes('sofa') || q.includes('living') || q.includes('couch')) {
        reply = "For living room seating, our Aura Milano Curved Bouclé Sofa and Palermo Modular Sectional offer unmatched sculptural elegance and cloud-like comfort:";
        matched = products.filter(p => p.category === 'living-room' && (p.name.includes('Sofa') || p.name.includes('Sectional'))).slice(0, 2);
        nextSuggestions = ["What coffee tables pair with this?", "Is French bouclé stain resistant?", "Show accent loungers"];
      } else if (q.includes('bedroom') || q.includes('bed')) {
        reply = "Our bedroom collection emphasizes tranquility and restorative ergonomics with solid American oak, floating perimeter lighting, and aromatic cedarwood storage:";
        matched = products.filter(p => p.category === 'bedroom').slice(0, 2);
        nextSuggestions = ["Show matching nightstands", "What are the mattress dimensions?", "Explore Kyoto Zen collection"];
      } else if (q.includes('wood') || q.includes('monsoon') || q.includes('teak') || q.includes('climate')) {
        reply = "Solid American Walnut and European White Oak are kiln-seasoned to an 8% moisture tolerance, preventing seasonal warping during monsoons. For terraces and gardens, our Grade-A Burmese plantation teak naturally weathers rain and sea spray with timeless grace:";
        matched = products.filter(p => p.id === 'prod-19' || p.id === 'prod-27');
        nextSuggestions = ["Show teak daybeds", "How often should I condition walnut?", "Explore bespoke woodwork"];
      } else if (q.includes('small') || q.includes('apartment') || q.includes('compact')) {
        reply = "For compact residences, we recommend low-profile silhouettes and multi-functional storage benches that maintain open spatial sightlines:";
        matched = products.filter(p => p.id === 'prod-2' || p.id === 'prod-26' || p.id === 'prod-10');
        nextSuggestions = ["Show folding room dividers", "Suggest dining tables for 4", "Explore floating beds"];
      } else {
        reply = "Understood. Our master craftsmen create tailored suites tailored to your parameters. Here are iconic signature pieces from our bestselling catalog:";
        matched = products.filter(p => p.featured).slice(0, 2);
        nextSuggestions = ["Launch AI Room Designer", "Enter Virtual 360 Showroom", "Book Showroom Consultation"];
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          recommendedProducts: matched,
          suggestedQuestions: nextSuggestions
        }
      ]);
      setIsTyping(false);
    }, 850);
  };

  const handleAddToCart = (p) => {
    addToCart(p, 1);
    setAddedItemMap(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => setAddedItemMap(prev => ({ ...prev, [p.id]: false })), 2000);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-12 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold border border-gold/30">
            <Bot className="w-3.5 h-3.5" />
            <span>Intelligent Styling Concierge</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-ivory">
            AI Furniture Shopping Assistant
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 max-w-lg mx-auto">
            Conversational advice on timber seasoning, upholstery textures, ergonomic dimensions, and customized styling palettes.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl border border-gold/30 shadow-luxury flex flex-col h-[700px] overflow-hidden">
          {/* Subheader */}
          <div className="p-4 bg-beige-100 border-b border-beige-300 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-walnut text-gold flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-sm font-semibold text-charcoal">AURA Master Concierge</h3>
                <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online & Ready to Advise
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/919820045890?text=Hello%20AURA%20Living%20Concierge%2C%20I%20would%20like%20to%20speak%20with%20a%20human%20architectural%20stylist."
              target="_blank"
              rel="noreferrer"
              className="text-xs text-walnut hover:text-gold flex items-center gap-1.5 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Talk to Human Stylist</span>
            </a>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-walnut text-ivory rounded-br-none shadow-sm'
                      : 'bg-ivory text-charcoal border border-beige-300 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                </div>

                {/* Products Grid */}
                {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                  <div className="w-full max-w-lg mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {m.recommendedProducts.map(p => (
                      <div key={p.id} className="p-3 bg-white rounded-2xl border border-gold/30 shadow-sm flex flex-col justify-between space-y-2">
                        <img src={p.images[0]} alt={p.name} className="w-full h-32 object-cover rounded-xl" />
                        <div>
                          <Link to={`/product/${p.id}`} className="font-serif-luxury text-xs font-semibold text-charcoal hover:text-gold line-clamp-1">
                            {p.name}
                          </Link>
                          <p className="text-xs font-bold text-walnut mt-0.5">{formatINR(p.price)}</p>
                        </div>
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="w-full py-2 rounded-xl bg-beige-100 hover:bg-gold text-charcoal text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          {addedItemMap[p.id] ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                          <span>{addedItemMap[p.id] ? "Added" : "Add to Bag"}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {m.suggestedQuestions && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.suggestedQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="text-xs bg-beige-100 hover:bg-beige-200 text-charcoal/80 border border-beige-300 px-3 py-1.5 rounded-full transition-all text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-charcoal/50 bg-ivory border border-beige-300 px-4 py-2.5 rounded-2xl w-fit">
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                <span className="ml-1">Curating recommendations...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-beige-300">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about dimensions, materials, styling pairings, or pricing..."
                className="flex-1 bg-ivory border border-beige-300 rounded-2xl px-4 py-3 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-3.5 rounded-2xl walnut-gradient-bg text-ivory disabled:opacity-40 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

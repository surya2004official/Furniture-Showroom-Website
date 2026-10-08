import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, 
  ShoppingBag, Check, Award, Layers 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';

export const StyleFinderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { addToCart } = useCart();
  const [bundleAdded, setBundleAdded] = useState(false);

  const questions = [
    {
      id: 'room',
      title: 'What sanctuary are you currently creating?',
      options: [
        { label: 'Living Room', value: 'living-room', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80' },
        { label: 'Master Bedroom Retreat', value: 'bedroom', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80' },
        { label: 'Formal Dining Chamber', value: 'dining-room', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80' },
        { label: 'Executive Home Study', value: 'office', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80' }
      ]
    },
    {
      id: 'style',
      title: 'Which architectural aesthetic resonates most?',
      options: [
        { label: 'Warm Organic Modern', desc: 'Curved silhouettes, French bouclé, fluted woods', value: 'modern' },
        { label: 'Scandinavian Japandi', desc: 'Pale white oak, acoustic slats, peaceful restraint', value: 'japandi' },
        { label: 'Mediterranean Villa', desc: 'Saddle leather, live-edge walnut, Roman travertine', value: 'tuscan' },
        { label: 'Royal French Opulence', desc: 'Tufted velvet, 24k gold leaf, fluted crystal', value: 'classic' }
      ]
    },
    {
      id: 'color',
      title: 'What tone harmony anchors your residence?',
      options: [
        { label: 'Ivory Cream & Warm Walnut', hex: '#FAF8F5', value: 'ivory-walnut' },
        { label: 'Cognac Saddle & Smoked Oak', hex: '#96552B', value: 'cognac-oak' },
        { label: 'Champagne Gold & Natural Sand', hex: '#C6A77B', value: 'gold-sand' },
        { label: 'Midnight Charcoal & Deep Slate', hex: '#242424', value: 'charcoal' }
      ]
    },
    {
      id: 'budget',
      title: 'What is your target furniture investment?',
      options: [
        { label: 'Curated Essentials', desc: '₹80,000 – ₹1,50,000', value: 'low' },
        { label: 'Signature Sanctuary Suite', desc: '₹1,50,000 – ₹3,00,000', value: 'mid' },
        { label: 'Grand Architectural Collection', desc: '₹3,00,000 – ₹5,50,000+', value: 'high' }
      ]
    },
    {
      id: 'materials',
      title: 'Which tactile material is paramount to you?',
      options: [
        { label: 'Solid Kiln-Dried Hardwoods (Walnut/Oak)', value: 'wood' },
        { label: 'Sensory French Bouclé & Heavy Linen', value: 'boucle' },
        { label: 'Full-Grain Tuscan Aniline Leather', value: 'leather' },
        { label: 'Roman Travertine & Natural Marble', value: 'stone' }
      ]
    },
    {
      id: 'scale',
      title: 'What is the spatial scale of your residence?',
      options: [
        { label: 'Intimate Urban Apartment (Under 1,200 sq.ft)', value: 'small' },
        { label: 'Standard Suburban Residence (1,200 – 2,500 sq.ft)', value: 'medium' },
        { label: 'Expansive Penthouse / Estate Villa (2,500+ sq.ft)', value: 'large' }
      ]
    }
  ];

  const currentQ = questions[currentStep];

  const handleSelectOption = (val) => {
    const updated = { ...answers, [currentQ.id]: val };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setQuizCompleted(false);
  };

  // Determine result profile and products
  const selectedRoomCategory = answers.room || 'living-room';
  const recommendedItems = products
    .filter(p => p.category === selectedRoomCategory)
    .slice(0, 3);

  const suiteTotalCost = recommendedItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddSuiteToCart = () => {
    recommendedItems.forEach(item => addToCart(item, 1));
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2200);
  };

  const progressPercent = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-14 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Style Finder Diagnostic</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-ivory">
            Discover Your Furniture Identity
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 max-w-lg mx-auto">
            A guided visual consultation to uncover your architectural temperament and match the ideal capsule collection.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!quizCompleted ? (
          <div className="bg-white p-6 sm:p-12 rounded-3xl border border-gold/30 shadow-luxury space-y-8 animate-in fade-in">
            {/* Progress bar */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-charcoal/60 mb-2">
                <span>Step {currentStep + 1} of {questions.length}</span>
                <span className="text-gold font-bold">{progressPercent}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-beige-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-charcoal">
                {currentQ.title}
              </h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.id] === opt.value;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`p-5 rounded-2xl text-left border-2 transition-all flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'border-gold bg-gold/10 shadow-md ring-1 ring-gold'
                        : 'border-beige-300 bg-ivory hover:border-gold hover:bg-beige-50'
                    }`}
                  >
                    {opt.img && (
                      <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-2">
                        <img src={opt.img} alt={opt.label} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {opt.hex && (
                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm mb-1" style={{ backgroundColor: opt.hex }} />
                    )}

                    <div>
                      <h4 className="font-serif-luxury text-base font-semibold text-charcoal">{opt.label}</h4>
                      {opt.desc && <p className="text-xs text-charcoal/60 mt-0.5">{opt.desc}</p>}
                    </div>

                    <div className="flex justify-end pt-1">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${isSelected ? 'bg-gold text-charcoal-900 font-bold' : 'border border-beige-300'}`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-beige-200">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-charcoal/60 hover:text-charcoal disabled:opacity-30 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleRestart}
                className="text-xs text-charcoal/50 hover:text-walnut flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Quiz</span>
              </button>
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gold/40 shadow-luxury space-y-8 animate-in zoom-in-95">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-xs text-gold uppercase font-bold tracking-widest block">
                Personalized Architectural Diagnostic
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-charcoal">
                You Are: <span className="text-walnut italic">"Warm Minimalist Connoisseur"</span>
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/70 max-w-xl mx-auto leading-relaxed">
                Your choices prioritize organic tranquility, sensory French bouclé textures, and the enduring architectural presence of solid American walnut with honest joinery.
              </p>
            </div>

            {/* Recommended Suite */}
            <div className="p-6 rounded-2xl bg-beige-50 border border-gold/30 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-beige-200 gap-2">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-charcoal">
                    Recommended Capsule Suite
                  </h3>
                  <p className="text-xs text-charcoal/60">3 Coordinated pieces matched to your answers</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-charcoal/50">Total Suite Value:</span>
                  <p className="font-serif-luxury text-2xl font-bold text-walnut">{formatINR(suiteTotalCost)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedItems.map(item => (
                  <div key={item.id} className="p-3 bg-white rounded-xl border border-beige-300 flex flex-col justify-between space-y-2">
                    <img src={item.images[0]} alt={item.name} className="w-full h-36 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-serif-luxury text-xs font-semibold text-charcoal line-clamp-1">{item.name}</h4>
                      <p className="text-xs font-bold text-walnut mt-0.5">{formatINR(item.price)}</p>
                    </div>
                    <Link
                      to={`/product/${item.id}`}
                      className="text-[11px] text-center py-1.5 rounded-lg border border-beige-300 text-charcoal hover:bg-beige-100 font-medium"
                    >
                      Inspect Piece
                    </Link>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleRestart}
                  className="text-xs text-charcoal/60 hover:text-charcoal underline"
                >
                  Retake Diagnostic Quiz
                </button>

                <button
                  onClick={handleAddSuiteToCart}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:opacity-95"
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Suite Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-gold" />
                      <span>Add Entire Recommended Suite to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

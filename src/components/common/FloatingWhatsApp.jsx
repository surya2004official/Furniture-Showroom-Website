import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = ({ 
  message = "Hello AURA Living Concierge, I would like to enquire about bespoke luxury furniture." 
}) => {
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/919820045890?text=${encodedMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-luxury-hover hover:bg-[#20ba5a] transition-all duration-300 hover:scale-105 active:scale-95 group border border-white/30"
      aria-label="Direct WhatsApp Concierge"
    >
      <MessageCircle className="w-5 h-5 fill-white text-white group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline text-xs font-semibold tracking-wide">
        WhatsApp Concierge
      </span>
    </a>
  );
};

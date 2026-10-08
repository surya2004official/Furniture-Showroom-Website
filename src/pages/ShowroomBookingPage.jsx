import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Sparkles, MessageCircle, 
  CheckCircle2, Users, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { showrooms } from '../data/products';
import { getEstimatedDeliveryDate } from '../utils/formatters';

export const ShowroomBookingPage = () => {
  const [selectedShowroom, setSelectedShowroom] = useState(showrooms[0].id);
  const [selectedService, setSelectedService] = useState('Private Showroom Tour');
  const [guestCount, setGuestCount] = useState('2 Patrons');
  const [appointmentDate, setAppointmentDate] = useState(getEstimatedDeliveryDate(3));
  const [timeSlot, setTimeSlot] = useState('Evening Visit (5:00 PM – 6:30 PM)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const activeShowroomObj = showrooms.find(s => s.id === selectedShowroom) || showrooms[0];

  const services = [
    { title: 'Private Showroom Tour', desc: 'Curated tour of 32+ architectural furniture pieces with material guidance' },
    { title: '3D Spatial Room Elevation Consultation', desc: '1-on-1 session with an architect reviewing floor plans and 3D renderings' },
    { title: 'Bespoke Timber & Material Library', desc: 'Touch and compare seasoned walnuts, honed Roman travertines, and Italian bouclés' },
    { title: 'Full Turnkey Villa Commission Spec', desc: 'Comprehensive multi-room styling consultation with VIP hospitality' }
  ];

  const timeSlots = [
    'Morning Session (11:00 AM – 12:30 PM)',
    'Afternoon Session (2:30 PM – 4:00 PM)',
    'Evening Visit (5:00 PM – 6:30 PM)',
    'Private VIP Champagne Evening (7:00 PM – 8:30 PM)'
  ];

  const whatsappConfirmationText = encodeURIComponent(
    `Hello AURA Atelier Concierge. I have booked a private showroom viewing:\n` +
    `• Patron: ${name}\n` +
    `• Mobile: ${phone}\n` +
    `• Gallery: ${activeShowroomObj.title} (${activeShowroomObj.city})\n` +
    `• Consultation: ${selectedService}\n` +
    `• Date & Time: ${appointmentDate} at ${timeSlot}\n` +
    `• Party Size: ${guestCount}\n` +
    `Please confirm showroom reservation.`
  );

  const handleBooking = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      {/* Header */}
      <div className="bg-charcoal text-ivory py-16 px-4 sm:px-6 lg:px-8 border-b border-gold/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest border border-gold/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>Private Stylist Appointment</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-normal text-ivory">
            Book a Showroom Viewing
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 max-w-xl mx-auto leading-relaxed">
            Reserve a private styling consultation with our architectural directors in Mumbai, New Delhi, Bengaluru, or Dubai. Complimentary valet and hospitality included.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {confirmed ? (
          <div className="max-w-xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border-2 border-gold/50 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] text-gold uppercase font-bold tracking-widest block mb-1">
                Reservation Registered
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-charcoal">
                We Await Your Visit, {name}
              </h2>
            </div>

            <div className="p-5 bg-beige-50 rounded-2xl border border-beige-300 text-xs text-charcoal/80 text-left space-y-2">
              <p><strong className="text-charcoal">Showroom:</strong> {activeShowroomObj.title} ({activeShowroomObj.city})</p>
              <p><strong className="text-charcoal">Address:</strong> {activeShowroomObj.address}</p>
              <p><strong className="text-charcoal">Service:</strong> {selectedService}</p>
              <p><strong className="text-charcoal">Schedule:</strong> {appointmentDate} • {timeSlot}</p>
              <p><strong className="text-charcoal">Patrons:</strong> {guestCount}</p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/919820045890?text=${whatsappConfirmationText}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Reservation via WhatsApp Concierge</span>
              </a>

              <button
                onClick={() => setConfirmed(false)}
                className="text-xs text-charcoal/60 hover:text-charcoal underline"
              >
                Book for another city or date
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Steps (7 cols) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-gold/30 shadow-luxury space-y-8">
              {/* 1. Showroom Gallery Selection */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                    Select Metropolitan Atelier
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {showrooms.map((s) => (
                    <button
                      type="button"
                      key={s.id}
                      onClick={() => setSelectedShowroom(s.id)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        selectedShowroom === s.id
                          ? 'bg-charcoal text-ivory border-gold shadow-md ring-1 ring-gold'
                          : 'bg-ivory text-charcoal border-beige-300 hover:border-gold'
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-bold tracking-wider block ${selectedShowroom === s.id ? 'text-gold' : 'text-charcoal/50'}`}>
                        {s.city}
                      </span>
                      <h4 className="font-serif-luxury text-xs font-semibold mt-0.5">{s.title}</h4>
                      <p className={`text-[11px] mt-1 line-clamp-1 ${selectedShowroom === s.id ? 'text-ivory/70' : 'text-charcoal/60'}`}>
                        {s.address}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Service Type */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                    Type of Consultation
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {services.map((srv) => (
                    <label
                      key={srv.title}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedService === srv.title
                          ? 'bg-gold/15 border-gold shadow-sm'
                          : 'bg-ivory border-beige-300 hover:border-gold'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        checked={selectedService === srv.title}
                        onChange={() => setSelectedService(srv.title)}
                        className="accent-gold mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-charcoal">{srv.title}</p>
                        <p className="text-[11px] text-charcoal/60 mt-0.5">{srv.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. Schedule & Guests */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                    Schedule & Party Size
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Date</label>
                    <input
                      type="text"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      placeholder="e.g. Next Saturday"
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Time Window</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    >
                      {timeSlots.map(ts => <option key={ts} value={ts}>{ts}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Patron Count</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    >
                      <option value="1 Patron">1 Patron</option>
                      <option value="2 Patrons">2 Patrons</option>
                      <option value="3 Patrons">3 Patrons</option>
                      <option value="4+ Patrons (Private Suite)">4+ Patrons (Private Suite)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4. Client Details */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center">4</span>
                  <h3 className="font-serif-luxury text-base font-semibold text-charcoal">
                    Patron Coordinates
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. A. Singhania"
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 00000"
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="patron@residence.in"
                      className="w-full bg-ivory border border-beige-300 rounded-xl px-3.5 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl walnut-gradient-bg text-ivory text-xs font-bold uppercase tracking-widest hover:opacity-95 shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Confirm VIP Showroom Reservation</span>
              </button>
            </div>

            {/* Right: Showroom Detail Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-luxury space-y-5 sticky top-28">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                  <img src={activeShowroomObj.image} alt={activeShowroomObj.title} className="w-full h-full object-cover" />
                </div>

                <div>
                  <span className="text-[10px] text-gold uppercase font-bold tracking-widest">
                    Selected Atelier
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-charcoal mt-0.5">
                    {activeShowroomObj.title}
                  </h3>
                  <p className="text-xs text-charcoal/70 mt-1">{activeShowroomObj.address}</p>
                </div>

                <div className="space-y-2 text-xs text-charcoal/80 pt-2 border-t border-beige-200">
                  <p><strong className="text-charcoal">Gallery Hours:</strong> {activeShowroomObj.hours}</p>
                  <p><strong className="text-charcoal">VIP Direct Phone:</strong> <span className="text-gold font-bold">{activeShowroomObj.phone}</span></p>
                </div>

                {/* Features */}
                <div className="space-y-1.5 pt-2">
                  <p className="text-[11px] font-bold text-charcoal uppercase tracking-wider">Atelier Amenities:</p>
                  {activeShowroomObj.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-charcoal/70">
                      <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

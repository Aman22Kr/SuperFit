import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { BRANCHES, SERVICES } from '../data/gymData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/layout/AdSection';

export const ContactPage: React.FC = () => {
  const { submitInquiry, inquiries, selectedBranch } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState<'Thane' | 'Dombivli'>(selectedBranch);
  const [serviceInterest, setServiceInterest] = useState('General Membership & Tour');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and contact number.');
      return;
    }
    setErrorMsg('');
    submitInquiry({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      branch,
      serviceInterest,
      message: message.trim(),
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            CONTACT & VISIT SUPERFIT
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Drop by our Thane West or Dombivli East clubs for a walk-through tour, or message us to speak directly with our fitness team.
          </p>
        </div>
      </section>

      {/* Main Form and Locations Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-black italic uppercase text-white">Send An Inquiry</h3>
            <p className="text-xs text-neutral-400">
              Leave your details to schedule a free fitness trial and body composition assessment.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-xl text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Inquiry Received!</h4>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Thank you for reaching out. Our front desk coordinator for the {branch} club will call you to confirm your visit time.
              </p>
              <div className="text-[11px] font-mono text-neutral-500">
                (Saved in browser localStorage for reference)
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">Target Club Location</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBranch('Thane')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
                        branch === 'Thane'
                          ? 'bg-rose-950/60 border-rose-500 text-rose-400 font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Thane (W)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBranch('Dombivli')}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-colors ${
                        branch === 'Dombivli'
                          ? 'bg-rose-950/60 border-rose-500 text-rose-400 font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Dombivli (E)
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Program of Interest</label>
                <select
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="General Membership & Tour">General Membership & Facility Tour</option>
                  <option value="Strength & Heavy Iron Arena">Strength & Heavy Iron Arena</option>
                  <option value="Power Yoga & Mobility">Power Yoga & Mindful Mobility</option>
                  <option value="Aerobics & Zumba Classes">Aerobics & Zumba Classes</option>
                  <option value="1-on-1 Personal Coaching">1-on-1 Personal Coaching</option>
                  <option value="Weight Loss & Nutrition">Weight Loss & Nutrition Consultation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">Your Message or Goal</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your fitness targets or any questions about membership..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-950"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}

          {/* Past Inquiries log */}
          {inquiries.length > 0 && (
            <div className="pt-4 border-t border-neutral-800">
              <h4 className="text-xs font-mono uppercase text-neutral-500 mb-2">
                Recent Submissions (LocalStorage):
              </h4>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-2 bg-neutral-950 rounded border border-neutral-800 text-[11px] flex justify-between items-center"
                  >
                    <span className="text-neutral-300 font-medium">
                      {inq.name} ({inq.branch}) · {inq.serviceInterest}
                    </span>
                    <span className="font-mono text-neutral-500">{inq.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Branch Cards */}
        <div className="lg:col-span-5 space-y-6">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className="p-6 bg-neutral-900/60 rounded-2xl border border-neutral-800 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xl font-black italic uppercase text-white">{b.name}</h4>
                  <div className="text-xs text-rose-500 font-medium">{b.city} Branch</div>
                </div>
                <span className="text-[11px] font-mono bg-neutral-950 border border-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>

              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{b.address}, {b.landmark}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-neutral-500 shrink-0" />
                  <a href={`tel:${b.phone}`} className="hover:text-rose-400 font-mono">{b.phone}</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span>{b.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span>Mon–Sat: {b.hoursWeekday} | Sun: {b.hoursWeekend}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(b.address + ' ' + b.landmark)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg block text-center transition-colors"
                >
                  Open in Maps / Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Section at bottom */}
      <AdSection />
    </div>
  );
};

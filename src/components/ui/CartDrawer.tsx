import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ShoppingBag, ShieldAlert, ArrowRight, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, confirmCheckout, bookings, selectedBranch } = useApp();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState<'Thane' | 'Dombivli'>(selectedBranch);
  const [lastConfirmed, setLastConfirmed] = useState<any[] | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name and contact phone number.');
      return;
    }
    setErrorMsg('');
    const confirmed = confirmCheckout({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'guest@superfit.in',
      branch,
    });
    setLastConfirmed(confirmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-neutral-900 border-l border-neutral-800 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <h3 className="font-bold text-white text-base">
              {showHistory ? 'Your Booking Passes' : 'Passes & Membership Cart'}
            </h3>
            <span className="text-xs font-mono bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
              {cart.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {bookings.length > 0 && !lastConfirmed && (
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="text-xs text-rose-400 hover:text-rose-300 underline underline-offset-2"
              >
                {showHistory ? 'View Cart' : `History (${bookings.length})`}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(false);
                setLastConfirmed(null);
                setShowHistory(false);
              }}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {lastConfirmed ? (
            /* Booking Confirmation View */
            <div className="space-y-4 text-center py-6">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Booking Confirmed!</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Your pass has been generated and saved locally in your browser.
                </p>
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-left space-y-3 font-mono text-xs">
                {lastConfirmed.map((b) => (
                  <div key={b.bookingId} className="border-b border-neutral-800/80 pb-2 last:border-none last:pb-0">
                    <div className="flex justify-between text-neutral-300">
                      <span className="text-rose-400 font-bold">{b.bookingId}</span>
                      <span>₹{b.price}</span>
                    </div>
                    <div className="text-white font-sans font-medium mt-0.5">{b.itemTitle}</div>
                    <div className="text-neutral-500 text-[11px] mt-0.5">
                      Club: {b.branch} · {b.bookingDate}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-neutral-950/60 rounded-lg border border-neutral-800 text-xs text-neutral-400 text-left flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <p>
                  Present this booking reference at the SuperFit {branch} front desk upon arrival. No pre-payment required online.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setLastConfirmed(null);
                  setIsCartOpen(false);
                }}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : showHistory ? (
            /* Booking History View */
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                Saved Passes in LocalStorage ({bookings.length})
              </h4>
              {bookings.length === 0 ? (
                <p className="text-xs text-neutral-500 py-6 text-center">No past bookings found.</p>
              ) : (
                bookings.map((b) => (
                  <div key={b.bookingId} className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-rose-400">{b.bookingId}</span>
                      <span className="text-emerald-400 font-medium">{b.status}</span>
                    </div>
                    <div className="text-white font-medium">{b.itemTitle}</div>
                    <div className="text-neutral-400 flex justify-between">
                      <span>{b.branch} Club</span>
                      <span className="font-mono">₹{b.price}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500">{b.bookingDate}</div>
                  </div>
                ))
              )}
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-12 text-neutral-500 space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto text-neutral-700" />
              <p className="text-sm">Your booking cart is empty.</p>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                Select a Day Pass, Free Assessment session, or Membership package to get started.
              </p>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-4">
              <div className="space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                        <span className="font-mono font-bold text-rose-400">
                          {item.price === 0 ? 'FREE' : `₹${item.price.toLocaleString('en-IN')}`}
                        </span>
                        <span>·</span>
                        <span>{item.branch || selectedBranch} Club</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total & Checkout Form */}
              <div className="pt-2 border-t border-neutral-800 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400">Total payable at gym:</span>
                  <span className="text-lg font-mono font-bold text-white">
                    {totalAmount === 0 ? '₹0 (Free Trial)' : `₹${totalAmount.toLocaleString('en-IN')}`}
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                  <div className="text-xs font-semibold text-neutral-300">Visitor Details for Pass</div>
                  {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}
                  
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Phone Number *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address (optional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Select Club Location:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setBranch('Thane')}
                        className={`py-1.5 px-3 rounded text-xs font-medium border text-center transition-colors ${
                          branch === 'Thane'
                            ? 'bg-rose-950/40 border-rose-600 text-rose-400 font-bold'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                        }`}
                      >
                        Thane (W)
                      </button>
                      <button
                        type="button"
                        onClick={() => setBranch('Dombivli')}
                        className={`py-1.5 px-3 rounded text-xs font-medium border text-center transition-colors ${
                          branch === 'Dombivli'
                            ? 'bg-rose-950/40 border-rose-600 text-rose-400 font-bold'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                        }`}
                      >
                        Dombivli (E)
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500 leading-tight">
                    * Browser simulation: Data is preserved in your device&apos;s localStorage. No online payment transaction is processed.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-950"
                  >
                    <span>Generate Instant Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

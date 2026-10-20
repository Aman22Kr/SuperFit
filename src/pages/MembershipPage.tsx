import React, { useState } from 'react';
import { Check, X, Shield, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { MEMBERSHIP_PLANS, FAQS } from '../data/gymData';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/layout/AdSection';

export const MembershipPage: React.FC = () => {
  const { addToCart, selectedBranch } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            Investment In Yourself
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            MEMBERSHIP PLANS & RATES
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Clear, honest pricing with zero hidden maintenance charges. Every package gives you access to state-of-the-art gym facilities, certified coaching, and clean amenities.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'bg-neutral-900 border-2 border-rose-500 shadow-2xl shadow-rose-950/40 relative'
                  : 'bg-neutral-900/60 border border-neutral-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular Value</span>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-black italic uppercase text-white">{plan.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1">{plan.tagline}</p>
                </div>

                <div className="py-3 border-y border-neutral-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black font-athletic text-white">
                      ₹{plan.totalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">/ {plan.period}</span>
                  </div>
                  {plan.period !== 'Single Day' && (
                    <div className="text-xs font-mono text-rose-400 mt-1">
                      Equivalent to ₹{plan.monthlyEquivalent.toLocaleString('en-IN')}/month
                    </div>
                  )}
                </div>

                {/* Features included */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase text-neutral-500">Included Amenities:</div>
                  <ul className="space-y-2 text-xs text-neutral-300">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.notIncluded &&
                      plan.notIncluded.map((nfeat, i) => (
                        <li key={i} className="flex items-start gap-2 text-neutral-500 line-through">
                          <X className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                          <span>{nfeat}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      title: plan.title,
                      type: 'membership',
                      price: plan.totalPrice,
                      branch: selectedBranch,
                      details: `${plan.period} Membership Package`,
                    })
                  }
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    plan.popular
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  Book {plan.title.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Student & Corporate Discount Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-neutral-900 to-neutral-900 border border-rose-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Shield className="w-4 h-4 text-rose-500" />
              <span>Special 15% Student & Senior Citizen Discount</span>
            </h4>
            <p className="text-xs text-neutral-400">
              Valid college ID or age verification eligible for 15% off any Quarterly, Half-Yearly, or Annual package.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              addToCart({
                title: 'Student/Senior Discount Consultation Pass',
                type: 'assessment',
                price: 0,
                branch: selectedBranch,
                details: '15% ID Discount Verification & Tour',
              })
            }
            className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase rounded-lg border border-neutral-700 whitespace-nowrap cursor-pointer"
          >
            Apply With ID
          </button>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="py-16 px-4 sm:px-6 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black italic uppercase text-white">
              DETAILED PLAN COMPARISON
            </h2>
            <p className="text-xs text-neutral-400">Everything you need to decide the right fit</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 font-mono uppercase">
                  <th className="py-3 px-4">Feature / Benefit</th>
                  <th className="py-3 px-4 text-center">Day Pass</th>
                  <th className="py-3 px-4 text-center">Monthly</th>
                  <th className="py-3 px-4 text-center text-rose-400">Quarterly (Pro)</th>
                  <th className="py-3 px-4 text-center">Half-Yearly</th>
                  <th className="py-3 px-4 text-center text-amber-400">Annual VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Gym Floor & Cardio Access</td>
                  <td className="py-3 px-4 text-center">✓ 1 Day</td>
                  <td className="py-3 px-4 text-center">✓ Unlimited</td>
                  <td className="py-3 px-4 text-center">✓ Unlimited</td>
                  <td className="py-3 px-4 text-center">✓ Unlimited</td>
                  <td className="py-3 px-4 text-center">✓ Multi-Club</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Group Classes (Yoga, Aerobics, Zumba)</td>
                  <td className="py-3 px-4 text-center">1 Class</td>
                  <td className="py-3 px-4 text-center">2 / week</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Steam & Sauna Recovery</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center">Weekly</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">InBody Composition Scans</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center">1 Scan</td>
                  <td className="py-3 px-4 text-center">Monthly</td>
                  <td className="py-3 px-4 text-center">Bi-Monthly</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Membership Freeze Allowance</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center">10 Days</td>
                  <td className="py-3 px-4 text-center">20 Days</td>
                  <td className="py-3 px-4 text-center">45 Days</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Dual Branch (Thane & Dombivli)</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center text-neutral-600">—</td>
                  <td className="py-3 px-4 text-center text-emerald-400 font-bold">✓ Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2 text-rose-500">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-mono uppercase tracking-widest">Common Questions</span>
          </div>
          <h2 className="text-3xl font-black italic uppercase text-white tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-neutral-900 transition-colors"
              >
                <span className="text-sm font-semibold text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-rose-500' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60 bg-neutral-950/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ad Section at bottom */}
      <AdSection />
    </div>
  );
};

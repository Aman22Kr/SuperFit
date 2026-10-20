import React, { useState } from 'react';
import { Activity, Flame, Droplets, RotateCcw, Save, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdSection } from '../components/layout/AdSection';

export const CalculatorPage: React.FC = () => {
  const { bmiHistory, saveBmiRecord, addToCart, selectedBranch } = useApp();

  const [heightCm, setHeightCm] = useState(172);
  const [weightKg, setWeightKg] = useState(70);
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.375); // Light exercise
  const [goal, setGoal] = useState<'fatloss' | 'maintenance' | 'muscle'>('fatloss');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Calculations
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let bmiCategory = 'Normal Weight';
  let bmiColor = 'text-emerald-400';
  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
    bmiColor = 'text-sky-400';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
    bmiColor = 'text-amber-400';
  } else if (bmi >= 30) {
    bmiCategory = 'Obese Range';
    bmiColor = 'text-rose-500';
  }

  // Mifflin - St Jeor formula for BMR
  const bmr =
    gender === 'male'
      ? Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5)
      : Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);

  const tdee = Math.round(bmr * activity);

  let targetCalories = tdee;
  if (goal === 'fatloss') targetCalories = Math.max(1200, tdee - 500);
  if (goal === 'muscle') targetCalories = tdee + 350;

  // Macros based on target calories
  const proteinGrams = Math.round(weightKg * (goal === 'muscle' ? 2.0 : 1.8));
  const fatGrams = Math.round((targetCalories * 0.25) / 9);
  const carbGrams = Math.max(50, Math.round((targetCalories - (proteinGrams * 4 + fatGrams * 9)) / 4));

  // Daily water intake estimation (35ml per kg + exercise factor)
  const dailyWaterLiters = parseFloat(((weightKg * 35 + 500) / 1000).toFixed(1));

  const handleSaveResult = () => {
    saveBmiRecord({
      heightCm,
      weightKg,
      bmi,
      category: bmiCategory,
      dailyCalories: targetCalories,
      goal: goal === 'fatloss' ? 'Fat Loss' : goal === 'muscle' ? 'Muscle Gain' : 'Maintenance',
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-neutral-950 border-b border-neutral-900 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-rose-500 bg-rose-950/40 px-3 py-1 rounded border border-rose-900/40">
            Biometric Health Tool
          </div>
          <h1 className="text-4xl sm:text-6xl font-black italic uppercase text-white tracking-tight">
            BMI & CALORIE CALCULATOR
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto">
            Calculate your Body Mass Index, Basal Metabolic Rate, daily calorie target, and optimal macro distribution. Results can be saved to your local browser history.
          </p>
        </div>
      </section>

      {/* Main Calculator Grid */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Input Parameters Column */}
        <div className="lg:col-span-6 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-500" />
              <span>Input Parameters</span>
            </h3>
            <span className="text-[11px] font-mono text-neutral-500">Live Recalculation</span>
          </div>

          {/* Gender */}
          <div>
            <label className="text-xs font-semibold text-neutral-300 block mb-2">Biological Sex</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 px-4 rounded-xl text-xs font-bold uppercase transition-colors ${
                  gender === 'male'
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 px-4 rounded-xl text-xs font-bold uppercase transition-colors ${
                  gender === 'female'
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Height Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-neutral-300">Height:</span>
              <span className="font-mono font-bold text-white text-sm">
                {heightCm} cm ({Math.floor(heightCm / 30.48)}&apos;{Math.round((heightCm % 30.48) / 2.54)}&quot;)
              </span>
            </div>
            <input
              type="range"
              min={130}
              max={220}
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          {/* Weight Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-neutral-300">Body Weight:</span>
              <span className="font-mono font-bold text-white text-sm">{weightKg} kg</span>
            </div>
            <input
              type="range"
              min={35}
              max={150}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          {/* Age Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-neutral-300">Age:</span>
              <span className="font-mono font-bold text-white text-sm">{age} Years</span>
            </div>
            <input
              type="range"
              min={14}
              max={80}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          {/* Activity Level */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 block">Weekly Exercise Activity</label>
            <select
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value={1.2}>Sedentary (Little or no workout)</option>
              <option value={1.375}>Light Active (1–3 gym sessions / week)</option>
              <option value={1.55}>Moderately Active (3–5 intense sessions / week)</option>
              <option value={1.725}>Very Active (6–7 days heavy training / athletics)</option>
            </select>
          </div>

          {/* Primary Goal */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 block">Primary Fitness Goal</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setGoal('fatloss')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
                  goal === 'fatloss'
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Fat Loss
              </button>
              <button
                type="button"
                onClick={() => setGoal('maintenance')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
                  goal === 'maintenance'
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Maintain
              </button>
              <button
                type="button"
                onClick={() => setGoal('muscle')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold transition-colors ${
                  goal === 'muscle'
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Muscle Gain
              </button>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main output card */}
          <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold text-white">Your Custom Breakdown</h3>
              <button
                type="button"
                onClick={handleSaveResult}
                className="text-xs font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savedSuccess ? 'Saved to Browser!' : 'Save Result'}</span>
              </button>
            </div>

            {/* BMI Display */}
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-neutral-400">Body Mass Index (BMI)</div>
                <div className="text-3xl font-black font-athletic text-white mt-0.5">{bmi}</div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-bold uppercase font-mono px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 ${bmiColor}`}>
                  {bmiCategory}
                </span>
                <div className="text-[11px] text-neutral-500 mt-1">Normal: 18.5 – 24.9</div>
              </div>
            </div>

            {/* Caloric Intake recommendation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Basal BMR</span>
                </div>
                <div className="text-2xl font-black font-athletic text-white mt-1">
                  {bmr.toLocaleString('en-IN')} <span className="text-xs text-neutral-500 font-normal">kcal</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">At complete rest</div>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold">
                  <Flame className="w-4 h-4 text-rose-500" />
                  <span>Daily Calorie Goal</span>
                </div>
                <div className="text-2xl font-black font-athletic text-rose-400 mt-1">
                  {targetCalories.toLocaleString('en-IN')} <span className="text-xs text-neutral-400 font-normal">kcal</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  {goal === 'fatloss' ? '-500 kcal deficit' : goal === 'muscle' ? '+350 kcal surplus' : 'Maintenance'}
                </div>
              </div>
            </div>

            {/* Target Macro Split */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-neutral-300">Target Daily Macronutrients</div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
                  <div className="text-[11px] text-neutral-400 uppercase">Protein</div>
                  <div className="text-lg font-black font-athletic text-rose-400">{proteinGrams}g</div>
                  <div className="text-[10px] text-neutral-500">{proteinGrams * 4} kcal</div>
                </div>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
                  <div className="text-[11px] text-neutral-400 uppercase">Carbs</div>
                  <div className="text-lg font-black font-athletic text-amber-400">{carbGrams}g</div>
                  <div className="text-[10px] text-neutral-500">{carbGrams * 4} kcal</div>
                </div>
                <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80">
                  <div className="text-[11px] text-neutral-400 uppercase">Fats</div>
                  <div className="text-lg font-black font-athletic text-sky-400">{fatGrams}g</div>
                  <div className="text-[10px] text-neutral-500">{fatGrams * 9} kcal</div>
                </div>
              </div>
            </div>

            {/* Daily Water */}
            <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-400" />
                <span className="text-neutral-300">Recommended Hydration</span>
              </div>
              <span className="font-mono font-bold text-sky-400 text-sm">{dailyWaterLiters} Liters / Day</span>
            </div>

            {/* Next step CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  addToCart({
                    title: 'Diet & InBody Consultation',
                    type: 'assessment',
                    price: 0,
                    branch: selectedBranch,
                    details: `Personalized macro review based on BMI: ${bmi}`,
                  })
                }
                className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-950"
              >
                <span>Book InBody Body Composition Scan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Past History saved in LocalStorage */}
          {bmiHistory.length > 0 && (
            <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Saved Local History ({bmiHistory.length})
                </h4>
                <span className="text-[10px] text-neutral-500">Stored in browser localStorage</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {bmiHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800 text-xs flex items-center justify-between"
                  >
                    <div>
                      <div className="text-white font-medium">
                        BMI: <strong className="text-rose-400 font-mono">{item.bmi}</strong> ({item.category})
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {item.weightKg}kg · {item.heightCm}cm · Goal: {item.goal}
                      </div>
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Ad Section at bottom */}
      <AdSection />
    </div>
  );
};

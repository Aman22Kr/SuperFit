# SuperFit — High-Performance Fitness & Wellness Club

> Recreated from [Fun & Fit Gym](https://funandfit.in/index.html) as **SuperFit** for GitHub user **Aman22kr**.

SuperFit is a modern, responsive multi-page static web application for a premier fitness chain with clubs in **Thane (West)** and **Dombivli (East)**. It delivers a comprehensive experience covering strength training arenas, cardio suites, group aerobics & Zumba studios, power yoga lofts, certified coaching faculties, transparent membership packages, and an interactive biometric health calculator.

---

## 🌟 Key Features & Website Scope

- **Multi-Page Static Architecture**:
  - **Home (`/`)**: Hero cinematic showcase, real-time schedule preview, world-class bento facilities, dedicated blank video presentation area, featured disciplines, transparent membership teaser, verified member reviews.
  - **About Us (`/about`)**: Brand heritage, evolution from Fun & Fit, 4 core pillars, dual-club specifications.
  - **Programs & Classes (`/services`)**: Filterable catalog of 8 disciplines with intensity and burn rate tags.
  - **Program Deep-Dive (`/services/:slug`)**: Dynamic detail page with complete physiological benefits, apparatus lists, target audiences, and direct trial booking.
  - **Membership & Pricing (`/membership`)**: 5 transparent packages (Day Pass, Monthly Starter, Quarterly Pro, Half-Yearly Elite, Annual VIP), feature comparison matrix, student discounts, and FAQs.
  - **Weekly Timetable (`/schedule`)**: Day-by-day batch timetable across weekdays and weekends, filtered by discipline (Yoga, Aerobics, Zumba, HIIT, Strength) and branch.
  - **Certified Coaches (`/trainers`)**: Accredited instructor credentials (CSCS, K11, ACE, RYT-500, ISSA), specialties, and 1-on-1 assessment bookings.
  - **Biometric Health Calculator (`/calculator`)**: Interactive BMI, BMR, TDEE, goal-based daily calorie targets, macronutrient split (Protein, Carbs, Fats), and hydration targets with persistent calculation history.
  - **Photo Gallery (`/gallery`)**: Filterable visual gallery with high-resolution facility spaces and lightbox inspection.
  - **Contact & Branch Locator (`/contact`)**: Interactive inquiry form, branch addresses, hotline phone numbers, and location links.
  - **404 Not Found (`*`)**: Custom athletic error page with navigation paths.
  - **Bottom Partner Ad Section**: Compact, responsive sponsor spotlight placed on every page.
  - **Designated Blank Video Space**: Styled presentation area in place of external YouTube embeds.

---

## 💾 Client-Side Persistence (LocalStorage)

The application operates without an external database, utilizing browser `localStorage` with safe namespacing:
- `superfit_cart_v1`: Cart passes (day passes, memberships, assessments).
- `superfit_bookings_v1`: Confirmed reservation passes with unique booking identifiers (`SF-XXXXXX`).
- `superfit_favorites_v1`: Saved workouts and disciplines.
- `superfit_inquiries_v1`: Submitted contact requests.
- `superfit_bmi_history_v1`: Biometric measurement history.
- `superfit_branch_pref_v1`: Preferred club location (Thane vs Dombivli).
- `superfit_anim_pref_v1`: User animation speed preferences (NORMAL, SLOW, FAST, OFF).

*Note: All data persists locally in the user's browser. No real financial charges or server authentications occur.*

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7 (`HashRouter` for 100% reliable GitHub Pages static hosting with zero 404 rewrite issues)
- **Icons**: Lucide React
- **Animations**: Framer Motion / Motion + CSS transitions

---

## 🚀 Local Development

To run SuperFit locally:

```bash
# 1. Clone repository
git clone https://github.com/Aman22kr/superfit.git
cd superfit

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` to explore the application.

---

## 📦 Static Deployment via GitHub Actions (GitHub Pages)

The repository includes a ready-to-use GitHub Actions workflow in `.github/workflows/deploy.yml`.

### Deployment Steps:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial SuperFit deployment"
   git push origin main
   ```

2. **Configure GitHub Pages Settings**:
   - Go to your repository on GitHub: `https://github.com/Aman22kr/superfit`
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.

3. **Automatic Deployment**:
   - The `.github/workflows/deploy.yml` workflow will automatically trigger on push to `main`.
   - Your static website will be live at:
     ```
     https://aman22kr.github.io/superfit/
     ```

4. **Vite Base Path**:
   - `vite.config.ts` uses `base: './'`, allowing assets and scripts to resolve correctly regardless of subpath or custom domain.

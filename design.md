# PolyLaunch Design Spec

## Product
PolyLaunch is an AI-powered global launch kit generator that creates structured marketing content and localizes it across multiple languages using Lingo.dev.

## Visual Direction
- Premium SaaS UI
- Minimal but high-signal
- Developer-grade and professional
- Dark mode default with light mode toggle
- Neutral charcoal + gray foundation
- Subtle purple accents with supporting emerald/amber/rose highlights
- No heavy blue branding

## Layout Architecture
- Landing page:
  - Sticky navbar
  - Hero
  - Feature bento grid
  - Interactive language preview
  - Global impact section
  - Technology section
  - Final CTA
- App dashboard:
  - Collapsible left sidebar
  - Sticky top navbar
  - Main content grid
  - Optional right preview panel on large screens

## Motion and Interaction
- Subtle background particles with low-opacity movement
- Scroll reveal and fade/slide transitions
- Card hover elevation and slight scale
- Button micro-scale on hover
- Active tab/link indicators
- Toast slide-in notifications
- Respect `prefers-reduced-motion`

## Dashboard Requirements
### Sidebar
- Items:
  - Dashboard
  - New Launch Kit
  - My Launches
  - Localization Pipeline
  - Settings
- Collapsible with smooth width transition
- Active item glow
- Tooltip behavior when collapsed

### Top Navbar
- Logo (PolyLaunch)
- Search bar
- Language switcher
- Theme toggle
- User identity and sign out
- Sticky with backdrop blur

### Main Dashboard Sections
- Header:
  - Title: `PolyLaunch Dashboard`
  - Subtitle: `Generate and manage your multilingual launch kits.`
- Bento cards:
  - Create New Launch Kit
  - Active Launch Kits count
  - Supported language badges
  - Localization progress
  - CI/CD sync status
  - Lingo integration status

### New Launch Kit Form
- Responsive 2-column layout
- Fields:
  - Product Name
  - Product Description
  - Target Audience
  - Tone selector
  - Target Markets selector/search
- Primary CTA:
  - `Generate`

### Launch Kit Preview
- Structured sections:
  - Landing
  - Email
  - Social
  - Press
- Language tabs:
  - EN, HI, JP, DE, AR
- Smooth content switch
- RTL alignment support for Arabic
- Actions:
  - Copy
  - Download JSON
  - Regenerate

### Localization Pipeline
- Grid cards with:
  - Base language
  - Target locale
  - Sync status
  - Last updated time
- Animated sync indicator for active/pending states

## Responsiveness
- Sidebar collapses on smaller screens
- Bento and form grids stack progressively
- Touch-friendly controls and spacing

## Quality Bar
- Production-like polish
- Consistent spacing and typography hierarchy
- No gimmicks, no visual clutter
- Suitable for startup demo and investor/judge presentation

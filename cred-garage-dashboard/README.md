# CRED Garage Inspired Dashboard

A modern, responsive web dashboard inspired by CRED Garage, built with React and featuring excellent UI/UX practices, smooth animations, and attention to detail.

![Dashboard Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=CRED+Garage+Dashboard)

## 🚀 Features

### Core Features
- **User Profile Summary** - Avatar, name, level, and gamification progress bar (XP system)
- **Benefits Section** - Interactive card tiles for benefits (discounts, offers, vouchers)
- **Reward Points Progress** - Circular progress indicator with animated counters
- **Dark/Light Mode Toggle** - Persistent theme switching with localStorage
- **Loading States** - Skeleton components and smooth transitions
- **Responsive Design** - Mobile-first approach with tablet and desktop layouts

### Technical Features
- **Mock API Layer** - Simulated backend with realistic delays and error handling
- **State Management** - React Context with useReducer for complex state
- **Smooth Animations** - Framer Motion for layout transitions and micro-interactions
- **Modern UI Components** - Glassmorphism effects and gradient designs
- **Performance Optimized** - Efficient rendering and animation patterns

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: React Circular Progressbar, Recharts
- **State Management**: React Context + useReducer
- **Development**: ESLint, PostCSS, Autoprefixer

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cred-garage-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

## 🏗 Project Structure

```
cred-garage-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Reusable UI components (future)
│   ├── context/
│   │   └── AppContext.jsx   # Global state management
│   ├── services/
│   │   └── api.js          # Mock API service layer
│   ├── assets/             # Static assets
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
├── package.json
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradients (`from-purple-500 to-blue-600`)
- **Secondary**: Emerald, Teal, Yellow, Red, Indigo
- **Dark Mode**: Gray-900 to Gray-800 backgrounds
- **Light Mode**: Gray-50 to Gray-100 backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: Mobile-first scaling

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Progress Bars**: Animated with smooth transitions
- **Icons**: Lucide React with consistent sizing

## 🔧 Configuration

### Tailwind CSS
Custom configuration includes:
- Extended color palette
- Custom animations (shimmer, float, glow)
- Responsive breakpoints
- Dark mode support

### Vite
Optimized for:
- Fast HMR (Hot Module Replacement)
- Efficient bundling
- PostCSS processing
- ESLint integration

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px - 1024px (2 column layout)
- **Desktop**: > 1024px (3 column layout)

### Features by Device
- **Mobile**: Stacked layout, touch-optimized interactions
- **Tablet**: 2-column grid, optimized spacing
- **Desktop**: Full 3-column layout, hover effects

## 🎭 Animations & Interactions

### Framer Motion Features
- **Page Transitions**: Smooth enter/exit animations
- **Stagger Effects**: Sequential card animations
- **Hover States**: Scale and glow effects
- **Loading States**: Skeleton shimmer animations

### Performance
- **GPU Acceleration**: Transform-based animations
- **Optimized Renders**: Efficient re-rendering patterns
- **Smooth 60fps**: Consistent animation performance

## 🔄 State Management

### Context Architecture
```javascript
AppContext
├── UI State (theme, loading)
├── Data State (user, benefits, analytics)
├── Animation State (counters)
└── Error State (error handling)
```

### Actions Available
- Theme management (toggle, persist)
- Data loading (user, benefits, analytics)
- Animation controls (XP, points counters)
- Error handling (set, clear)
- Benefit claiming (with optimistic updates)

## 🧪 Mock API

### Endpoints Simulated
- `getUserProfile()` - User data with XP and points
- `getBenefits()` - Available benefits and offers
- `getAnalytics()` - Points and savings history
- `claimBenefit(id)` - Claim benefit action
- `updateProfile(data)` - Profile updates

### Features
- **Realistic Delays**: 1-2 second response times
- **Error Simulation**: Network error scenarios
- **Data Persistence**: LocalStorage for theme
- **Optimistic Updates**: Immediate UI feedback

## 🚀 Deployment

### Deploy to Netlify 

https://glittering-lebkuchen-0b4a03.netlify.app/

## 🧪 Testing (Future Enhancement)

### Recommended Testing Stack
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom

# Component tests
npm run test

# Coverage report
npm run test:coverage
```

### Test Structure
```
src/
├── __tests__/
│   ├── App.test.jsx
│   ├── components/
│   └── services/
└── setupTests.js
```

## 🔮 Future Enhancements

### Planned Features
- [ ] **Unit Tests** - Jest + React Testing Library
- [ ] **E2E Tests** - Playwright or Cypress
- [ ] **TypeScript** - Full type safety
- [ ] **PWA Support** - Service workers, offline mode
- [ ] **Real Backend** - API integration
- [ ] **Advanced Charts** - Recharts integration
- [ ] **Micro-interactions** - Enhanced animations
- [ ] **Accessibility** - WCAG 2.1 compliance

### Performance Optimizations
- [ ] **Code Splitting** - Route-based chunks
- [ ] **Image Optimization** - WebP, lazy loading
- [ ] **Bundle Analysis** - Webpack bundle analyzer
- [ ] **Caching Strategy** - Service worker caching

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- **ESLint**: Follow configured rules
- **Prettier**: Auto-formatting enabled
- **Commits**: Conventional commit messages
- **Components**: Functional components with hooks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CRED** - Design inspiration
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon set
- **React Team** - Amazing framework

## 📞 Support

For support, email [your-email@example.com] or create an issue in the repository.

---

**Built with ❤️ using React + Vite**

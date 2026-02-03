# <h1 style="display:flex; align-items:center; gap:8px;" > Price Sevak (Price सेवक) <img src="price-sevak-logo.png" width="60" style="vertical-align: middle; margin-left: 8px;" /></h1>

> **Smarter prices, better Bachat.**

A modern, full-stack e-commerce price tracking application built with React 19 and TypeScript. Track product prices across multiple online stores, get instant alerts when prices drop, and save money with smart price monitoring.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg)](https://vitejs.dev/)

---

## 🎯 Features

### ✨ **Core Functionality**

- 🔍 **Smart Price Tracking** - Add any product URL and track prices automatically
- 📊 **Visual Price Charts** - Interactive charts showing price trends over time
- 🔔 **Real-time Alerts** - Toggle alerts on/off for instant price drop notifications
- 📧 **Email Notifications** - Get notified via email when prices hit your target
- 📈 **Activity Feed** - Complete timeline of all price changes and alerts
- 🎨 **Beautiful Dashboard** - Overview with stats, savings, and recent activities

### 🎨 **User Experience**

- ⚡ **Lightning Fast** - Built with Vite and optimized for performance
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🌙 **Dark Theme** - Beautiful dark interface with pink accent colors
- ✨ **Smooth Animations** - Powered by Motion for buttery transitions
- 🎯 **Intuitive UI** - Clean, modern interface with reusable components

### 🔒 **Security & Performance**

- 🔐 **Google OAuth** - Secure authentication via Supabase
- 🚀 **Optimistic Updates** - Instant UI feedback with automatic rollback
- 💾 **Smart Caching** - React Query with stale time
- 🎭 **Error Boundaries** - Graceful error handling and recovery
- ⏱️ **Rate Limiting** - 5-second cooldown on product additions
- 🔄 **Auto-retry** - Failed operations can be retried with one click

---

## 🛠️ Tech Stack

### **Frontend** (Main Focus)

#### **Core Technologies**

- **React 19** - Latest React with concurrent features
- **TypeScript 5.9** - Full type safety and IntelliSense
- **Vite 7** - Next-gen build tool for blazing fast development
- **Tailwind CSS v4** - Utility-first CSS with custom design system

#### **State Management**

- **TanStack Query** (React Query) - Server state management with caching
- **Zustand** - Lightweight global state (Auth, Toasts, Modals)

#### **UI & Animations**

- **Motion** - Production-ready animations
- **Recharts** - Beautiful, responsive charts
- **Custom Component Library** - Reusable UI components

#### **Routing & Data Fetching**

- **React Router v7** - Client-side routing with lazy loading
- **Axios** - HTTP client with interceptors
- **Route Preloading** - Instant navigation with hover preloading

### **Backend** (Basic Implementation)

- **Node.js + Express** - REST API server
- **Supabase** - PostgreSQL database + authentication
- **Firecrawl** - Web scraping for product data
- **Resend** - Email service for price alerts

---

## 🎨 Design System

### **Color Palette**

```css
Primary:     #D477A5  /* Pink - Main brand color */
Secondary:   #A764B4  /* Purple - Accent color */
Success:     #06BB96  /* Teal - Price drops */
Destructive: #c70000  /* Red - Price rises */
Gold:        #FECF42  /* Alerts & highlights */
Background:  #060606  /* Dark background */
Foreground:  #f5f5f5  /* Light text */
```

### **Typography**

- **Headings:** Oswald (sans-serif)
- **Body:** Inter (sans-serif)
- **Code/Tags:** Space Mono (monospace)

---

## 📁 Project Structure

```
price-sevak/
└──
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── .env.sample
    ├── api/
    │   ├── package.json
    │   ├── server.ts
    │   ├── tsconfig.json
    │   ├── .env.sample
    │   ├── config/
    │   │   └── env.ts
    │   ├── routes/
    │   │   ├── activities.ts
    │   │   ├── alerts.ts
    │   │   ├── cron.ts
    │   │   ├── price-history.ts
    │   │   └── products.ts
    │   └── utils/
    │       ├── auth.ts
    │       ├── email.ts
    │       ├── firecrawl.ts
    │       └── supabase.ts
    ├── public/
    │   └── favicon/
    │       └── site.webmanifest
    └── src/
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── components/
        │   ├── animations/
        │   │   ├── fadeUp.ts
        │   │   └── hover.ts
        │   ├── footer/
        │   │   └── Footer.tsx
        │   ├── header/
        │   │   ├── Header.tsx
        │   │   ├── MobileMenu.tsx
        │   │   ├── MobileMenuButton.tsx
        │   │   └── NavItems.tsx
        │   ├── icons/
        │   │   ├── Bell.tsx
        │   │   ├── Chart.tsx
        │   │   ├── Check.tsx
        │   │   ├── ChevronDown.tsx
        │   │   ├── ChevronRight.tsx
        │   │   ├── ChevronUp.tsx
        │   │   ├── Circle.tsx
        │   │   ├── Dashboard.tsx
        │   │   ├── Delete.tsx
        │   │   ├── Email.tsx
        │   │   ├── Error.tsx
        │   │   ├── ExternalLink.tsx
        │   │   ├── FilterIcon.tsx
        │   │   ├── Github.tsx
        │   │   ├── Google.tsx
        │   │   ├── Home.tsx
        │   │   ├── Lightning.tsx
        │   │   ├── Linkedin.tsx
        │   │   ├── Monitar.tsx
        │   │   ├── Package.tsx
        │   │   ├── Plus.tsx
        │   │   ├── Refresh.tsx
        │   │   ├── Return.tsx
        │   │   ├── RightArrow.tsx
        │   │   ├── Search.tsx
        │   │   ├── Signin.tsx
        │   │   ├── Signout.tsx
        │   │   ├── Toggle.tsx
        │   │   ├── TrendDown.tsx
        │   │   ├── TrendUp.tsx
        │   │   └── X.tsx
        │   └── ui/
        │       ├── AnimatedItem.tsx
        │       ├── Authmodal.tsx
        │       ├── Badge.tsx
        │       ├── Button.tsx
        │       ├── CloseButton.tsx
        │       ├── EmptyState.tsx
        │       ├── Filter.tsx
        │       ├── HoverSlideButton.tsx
        │       ├── Input.tsx
        │       ├── Loader.tsx
        │       ├── PageHeader.tsx
        │       ├── ProductImage.tsx
        │       ├── Select.tsx
        │       ├── SocialLinks.tsx
        │       ├── StatsBlock.tsx
        │       ├── Text.tsx
        │       ├── Toggle.tsx
        │       ├── activity/
        │       │   └── ActivityItem.tsx
        │       ├── priceChart/
        │       │   ├── PriceChart.tsx
        │       │   ├── PriceChartGraph.tsx
        │       │   ├── PriceChartTooltip.tsx
        │       │   └── types.ts
        │       ├── productCard/
        │       │   ├── ActionButton.tsx
        │       │   ├── ProductCard.tsx
        │       │   ├── ProductDeleteButton.tsx
        │       │   └── ProductInfo.tsx
        │       └── toast/
        │           ├── ToastContainer.tsx
        │           └── ToastItems.tsx
        ├── config/
        │   └── activity.config.ts
        ├── constant/
        │   ├── features.ts
        │   └── navItems.tsx
        ├── hooks/
        │   ├── useActivity.ts
        │   ├── useAlert.ts
        │   ├── useApiHealth.ts
        │   ├── useDebounce.ts.ts
        │   ├── useDeleteProduct.ts
        │   ├── usePriceHistory.ts
        │   └── useProducts.ts
        ├── layout/
        │   └── MainLayout.tsx
        ├── lib/
        │   └── axios.ts
        ├── page/
        │   ├── activity/
        │   │   └── Activity.tsx
        │   ├── alert/
        │   │   ├── Alert.tsx
        │   │   ├── AlertCard.tsx
        │   │   └── AlertHeader.tsx
        │   ├── error/
        │   │   ├── ErrorBoundary.tsx
        │   │   ├── ErrorPage.tsx
        │   │   └── PageNotFound.tsx
        │   ├── home/
        │   │   ├── Features.tsx
        │   │   ├── Home.tsx
        │   │   └── ProductTracker.tsx
        │   ├── overview/
        │   │   ├── ActivitySection.tsx
        │   │   ├── ActivityTimeline.tsx
        │   │   ├── Overview.tsx
        │   │   ├── OverviewHeader.tsx
        │   │   └── OverviewStats.tsx
        │   └── product/
        │       ├── ProductHeader.tsx
        │       ├── Products.tsx
        │       └── product-details/
        │           ├── BackButton.tsx
        │           ├── PriceHistoryLog.tsx
        │           ├── ProductActions.tsx
        │           ├── ProductDetail.tsx
        │           ├── ProductInfo.tsx
        │           └── ProductStats.tsx
        ├── services/
        │   ├── activities.ts
        │   ├── alerts.ts
        │   ├── auth.ts
        │   ├── authHeader.ts
        │   └── products.ts
        ├── store/
        │   ├── useAuthModal.ts
        │   ├── useAuthStore.ts
        │   ├── useMobileMenu.ts
        │   └── useToast.ts
        ├── types/
        │   └── productTypes.ts
        └── utils/
            ├── cn.ts
            ├── getStoreName.ts
            ├── priceCalculation.ts
            ├── queryClient.ts
            ├── firecrawl/
            │   └── scrapeProduct.ts
            └── supabase/
                └── supabase.ts

```

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ installed
- npm or pnpm package manager
- Supabase account (free tier)

### **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/price-sevak.git
cd price-sevak
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Backend API
VITE_API_URL=http://localhost:5000

# Optional: Social Links
VITE_LINKEDIN=https://linkedin.com/in/yourprofile
VITE_GITHUB=https://github.com/yourusername
VITE_EMAIL=your@email.com
```

4. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Building
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
```

---

## 🌟 Supported Stores (50+)

**E-commerce:** Amazon, Flipkart, Myntra, Ajio, Meesho, Snapdeal

**Fashion:** Zara, H&M, Uniqlo, Max Fashion, Pantaloons, Bewakoof

**Electronics:** Reliance Digital, Croma, Vijay Sales

**Tech Brands:** Samsung, Apple, OnePlus, Mi, boAt, Noise

**Grocery:** BigBasket, Blinkit, JioMart

**Others:** Lenskart, PharmEasy, FirstCry, IKEA, Decathlon

...and 30+ more!

---

## 📊 Performance Metrics

- **Bundle Size:** Optimized with code splitting
- **First Contentful Paint:** <1.5s (target)
- **Time to Interactive:** <3s (target)
- **Lighthouse Score:** 90+ (target)

### **Optimizations Applied:**

- ✅ Lazy loading routes
- ✅ Component memoization
- ✅ Image lazy loading
- ✅ Debounced inputs
- ✅ Smart caching
- ✅ Code splitting

---

## 🔧 Configuration

### **Tailwind CSS Custom Config**

```javascript
// Custom colors
colors: {
  primary: '#D477A5',
  secondary: '#A764B4',
  success: '#06BB96',
  destructive: '#c70000',
  gold: '#FECF42',
}

// Custom fonts
fontFamily: {
  oswald: ['Oswald', 'sans-serif'],
  inter: ['Inter', 'sans-serif'],
  mono: ['Space Mono', 'monospace'],
}
```

### **Vite Config**

```typescript
// Optimized build
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'query-vendor': ['@tanstack/react-query'],
        'charts': ['recharts'],
      }
    }
  }
}
```

---

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

### **Code Style**

- Use TypeScript for all files
- Follow existing component patterns
- Use `cn()` for className composition
- Add proper TypeScript types
- Use React Query for data fetching
- Use Zustand for global state

---

---

## 🙏 Acknowledgments

- **React Team** - React 19
- **Tailwind Labs** - Tailwind CSS v4
- **Supabase** - Auth and database
- **TanStack** - React Query
- **Zustand** - State management
- **Framer** - Motion library
- **Recharts** - Chart library

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐️!

---

**Made with ❤️ and lots of ☕ by Rahul Mehta**

_Frontend-focused project showcasing modern React patterns and best practices._

---

## 🎯 Project Highlights

### **What Makes This Special:**

1. **Modern React Patterns** - Using latest React 19 features
2. **TypeScript Throughout** - 100% type-safe codebase
3. **Custom Component Library** - 17 reusable, well-documented components
4. **Smart Animations** - Motion for smooth UX
5. **Optimistic Updates** - Instant feedback with rollback
6. **Route Preloading** - Blazing fast navigation
7. **Responsive Design** - Mobile-first approach
8. **Beautiful UI** - Custom Tailwind design system
9. **Error Recovery** - Graceful error handling everywhere
10. **Performance Optimized** - Lazy loading, memoization, caching

### **Tech Skills Demonstrated:**

✅ React 19 with concurrent features
✅ TypeScript 5.9 with strict mode
✅ TanStack Query for server state
✅ Zustand for client state
✅ Motion animations
✅ Custom hooks development
✅ Component composition
✅ Responsive design
✅ Error boundaries
✅ Performance optimization
✅ Tailwind CSS v4
✅ Vite build tool
✅ Git workflow

---

_This README focuses on the frontend implementation, which is the main focus of this project. Backend is kept simple and functional._

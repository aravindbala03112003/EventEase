# 🚀 EventEase - Complete Setup & Deployment Guide

## ⚡ Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:4000/api
EOF
```

### 3. Run Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000** ✅

---

## 📋 Installation Details

### Prerequisites
- Node.js 18+ (https://nodejs.org/)
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Step-by-Step Installation

#### 1. Clone/Open Project
```bash
cd c:\Users\Asus\Desktop\EventEase\frontend
```

#### 2. Install All Dependencies
```bash
npm install
```

**What gets installed:**
- ✅ Next.js 14.0.0 (React framework)
- ✅ React 18.2.0 (UI library)
- ✅ Tailwind CSS 3.4.0 (Styling)
- ✅ TypeScript 5.4.0 (Type safety)
- ✅ PostCSS & Autoprefixer (CSS processing)

#### 3. Create Environment File
```bash
# Create .env.local
echo NEXT_PUBLIC_API_URL=http://localhost:4000/api > .env.local
```

**Environment Variables:**
| Variable | Value | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:4000/api` | Backend API endpoint |

#### 4. Verify Installation
```bash
npm run dev
```

**Expected Output:**
```
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2s
```

#### 5. Open in Browser
Navigate to: **http://localhost:3000**

You should see the EventEase landing page! 🎉

---

## 🔧 Development Workflow

### Start Development Server
```bash
npm run dev
```
- Hot reload enabled
- Changes reflect immediately
- Open http://localhost:3000

### Build for Production
```bash
npm run build
```
- Optimizes code
- Creates .next folder
- Checks for errors

### Start Production Server
```bash
npm start
```
- Requires build first
- Production-optimized
- Best performance

### Lint Code
```bash
npm run lint
```
- Checks code quality
- Identifies issues
- Uses Next.js ESLint config

---

## 📦 Project Structure

```
frontend/
├── app/
│   ├── globals.css              ← Global styles
│   ├── layout.tsx               ← Root layout + Nav
│   ├── page.tsx                 ← Landing page
│   ├── login/page.tsx           ← Login
│   ├── dashboard/page.tsx       ← Dashboard
│   ├── rooms/
│   │   ├── page.tsx             ← Room list
│   │   └── [id]/page.tsx        ← Room detail
│   └── bookings/
│       ├── page.tsx             ← Booking list
│       └── new/page.tsx         ← New booking
├── components/
│   ├── Navigation.tsx           ← Top nav
│   └── ui/
│       ├── Button.tsx           ← Button component
│       ├── Card.tsx             ← Card component
│       ├── Form.tsx             ← Form components
│       ├── Badge.tsx            ← Badge component
│       └── Alert.tsx            ← Alert component
├── tailwind.config.ts           ← Tailwind config
├── postcss.config.js            ← PostCSS config
├── package.json                 ← Dependencies
└── tsconfig.json                ← TypeScript config
```

---

## 🎨 Tailwind CSS Setup

### Configuration File: `tailwind.config.ts`

Contains:
- ✅ Color palette (Primary, Secondary, Status colors)
- ✅ Typography settings
- ✅ Spacing scale
- ✅ Shadow definitions
- ✅ Animation keyframes
- ✅ Border radius settings

### Global Styles: `app/globals.css`

Contains:
- ✅ Tailwind directives (@tailwind, @layer)
- ✅ Component classes (.btn, .card, .input)
- ✅ Animation utilities
- ✅ Custom styles

---

## 🔌 API Integration

### Configure Backend API

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### API Client: `services/api.ts`

Pre-configured with:
- ✅ Base URL from environment
- ✅ JWT token injection
- ✅ Error handling
- ✅ Request interceptors

### Usage Example
```tsx
import { api } from "@/services/api";

// Make API call
const response = await api.get("/rooms");
const data = response.data;
```

---

## 🧪 Testing the Setup

### 1. Check Build
```bash
npm run build
```
Should complete without errors ✅

### 2. Check Lint
```bash
npm run lint
```
Should report minimal/no issues ✅

### 3. Manual Testing
- Visit http://localhost:3000
- Click around pages
- Test responsive design (F12 → mobile view)
- Test form validation

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Creates optimized production build in `.next/` folder.

### Deploy Options

#### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option 2: Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Option 3: Traditional Server
```bash
npm run build
npm start
```

Run on any Node.js server.

---

## 🆘 Troubleshooting

### Problem: Port 3000 Already in Use
```bash
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problem: Styles Not Loading
```bash
# Clear cache
rm -rf .next
npm run dev
```

### Problem: Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Problem: TypeScript Errors
```bash
# Check tsconfig.json
# Ensure all imports use correct paths
# Run: npm run build
```

### Problem: Cannot Find Environment Variables
```bash
# Ensure .env.local is in frontend root
# Variables must start with NEXT_PUBLIC_ to be accessible in browser
# Restart dev server after changing .env.local
```

---

## 📚 Useful Commands Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Check code quality |
| `rm -rf .next` | Clear Next.js cache |
| `npm run dev -- -p 3001` | Run on port 3001 |

---

## 🎓 File-by-File Setup Explanation

### package.json
```json
{
  "scripts": {
    "dev": "next dev",                    // Development server
    "build": "next build",                // Production build
    "start": "next start",                // Run production build
    "lint": "next lint"                   // Code quality check
  },
  "dependencies": {
    "next": "^14.0.0",                    // React framework
    "react": "^18.2.0",                   // UI library
    "axios": "^1.6.0"                     // HTTP client
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",              // Styling
    "typescript": "^5.4.0"                // Type checking
  }
}
```

### tailwind.config.ts
- Extends default Tailwind configuration
- Adds custom colors, shadows, animations
- All UI components depend on this

### postcss.config.js
- Processes CSS through PostCSS
- Applies Tailwind CSS transformations
- Adds browser compatibility (Autoprefixer)

### tsconfig.json
- TypeScript configuration
- Path aliases for imports
- Type checking rules

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `npm install` completed without errors
- [ ] `.env.local` file created with API URL
- [ ] `npm run dev` starts without errors
- [ ] Browser shows landing page at localhost:3000
- [ ] Navigation menu is visible
- [ ] Forms show proper styling
- [ ] Buttons have hover effects
- [ ] Mobile view is responsive
- [ ] No console errors in browser F12

---

## 📱 Testing Responsive Design

### Desktop
- Full width layout
- All columns visible
- Hover effects work

### Tablet (768px)
```bash
# In browser dev tools (F12)
Device = iPad
```
- Layout adjusts
- 2-column grids work

### Mobile (375px)
```bash
# In browser dev tools (F12)
Device = iPhone 12
```
- Single column layout
- Hamburger menu appears
- All content visible

---

## 🔄 Development Workflow Best Practices

1. **Before starting**: `npm install` ✅
2. **During development**: Keep `npm run dev` running
3. **Before committing**: `npm run build` + `npm run lint`
4. **Creating new pages**: Use app router structure
5. **Adding components**: Put in `components/` folder
6. **Styling**: Use Tailwind classes, no inline styles
7. **Imports**: Use absolute paths with `@/`

---

## 🎯 Next Steps After Setup

1. ✅ **Backend Connection** - Connect to your API
2. ✅ **Authentication** - Implement login/logout
3. ✅ **Real Data** - Fetch from database
4. ✅ **Testing** - Write unit and integration tests
5. ✅ **Deployment** - Deploy to production
6. ✅ **Monitoring** - Set up error tracking
7. ✅ **Analytics** - Track user behavior

---

## 📖 Useful Resources

| Resource | URL |
|----------|-----|
| Next.js Docs | https://nextjs.org/docs |
| React Docs | https://react.dev |
| Tailwind CSS | https://tailwindcss.com |
| Node.js | https://nodejs.org |
| VS Code | https://code.visualstudio.com |

---

## 🎉 You're Ready!

Your EventEase frontend is now:
- ✅ Installed and configured
- ✅ Running locally
- ✅ Styled with Tailwind CSS
- ✅ Ready for development
- ✅ Production-ready

**Start building amazing features! 🚀**

---

For detailed documentation:
- See `QUICK_START.md` for quick reference
- See `DESIGN_SYSTEM.md` for design details
- See `COMPONENT_EXAMPLES.md` for code examples
- See `UI_UX_IMPROVEMENTS.md` for feature docs

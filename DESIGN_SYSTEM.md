# EventEase - Design System & Theme Reference

## 🎨 Color Palette

### Primary Colors (Sky Blue)
Used for main actions, links, and primary UI elements.

```
50:  #f0f9ff  (Very Light)
100: #e0f2fe  (Light)
200: #bae6fd  (Light-Medium)
300: #7dd3fc  (Medium)
400: #38bdf8  (Medium)
500: #0ea5e9  (Primary)
600: #0284c7  (Primary Dark)
700: #0369a1  (Dark)
800: #075985  (Very Dark)
900: #0c3d66  (Darkest)
```

**Usage:**
- `primary-600`: Buttons, links, active states
- `primary-500`: Hover states
- `primary-100`: Light backgrounds, badges
- `primary-50`: Very light backgrounds

### Secondary Colors (Purple)
Used for accents, hover effects, and alternative actions.

```
50:  #f5f3ff  (Very Light)
100: #ede9fe  (Light)
200: #ddd6fe  (Light-Medium)
300: #c4b5fd  (Medium)
400: #a78bfa  (Medium)
500: #8b5cf6  (Secondary)
600: #7c3aed  (Secondary Dark)
700: #6d28d9  (Dark)
800: #5b21b6  (Very Dark)
900: #4c1d95  (Darkest)
```

**Usage:**
- `secondary-600`: Secondary buttons
- `secondary-500`: Accents
- `secondary-100`: Secondary badges
- `secondary-50`: Alternative backgrounds

### Status Colors

#### Success (Green)
```
bg-green-50    border-green-200    text-green-800
```
**Usage:** Confirmations, successful states, positive feedback

#### Error (Red)
```
bg-red-50      border-red-200      text-red-800
```
**Usage:** Errors, deletions, negative feedback

#### Warning (Amber)
```
bg-amber-50    border-amber-200    text-amber-800
```
**Usage:** Warnings, pending states, caution messages

#### Info (Blue)
```
bg-blue-50     border-blue-200     text-blue-800
```
**Usage:** Information, tips, helpful hints

### Neutral Colors (Slate)
Text, borders, backgrounds

```
50:  #f8fafc  (Very Light Background)
100: #f1f5f9  (Light Background)
200: #e2e8f0  (Light Border)
300: #cbd5e1  (Border)
400: #94a3b8  (Secondary Text)
500: #64748b  (Tertiary Text)
600: #475569  (Secondary Text)
700: #334155  (Primary Text)
800: #1e293b  (Darker Text)
900: #0f172a  (Darkest Text)
```

**Usage:**
- `slate-900`: Primary text
- `slate-700`: Secondary text
- `slate-600`: Tertiary text / labels
- `slate-300`: Borders
- `slate-100`: Light backgrounds
- `slate-50`: Very light backgrounds

## 📐 Spacing Scale

Following Tailwind's 4px base unit:

```
0:    0px
1:    4px
2:    8px
3:    12px
4:    16px
6:    24px
8:    32px
12:   48px
16:   64px
20:   80px
24:   96px
```

**Usage:**
- Cards: `p-6` (24px padding)
- Buttons: `px-4 py-2.5` (16px horizontal, 10px vertical)
- Spacing between elements: `gap-4` (16px)

## 🔤 Typography

### Font Families
- **Headings**: `Plus Jakarta Sans` (700-800 weight)
- **Body**: `Inter` (400-500 weight)
- **Emphasis**: `Inter` (600-700 weight)

### Font Sizes
```
text-xs:   12px  (0.75rem)
text-sm:   14px  (0.875rem)
text-base: 16px  (1rem)
text-lg:   18px  (1.125rem)
text-xl:   20px  (1.25rem)
text-2xl:  24px  (1.5rem)
text-3xl:  30px  (1.875rem)
text-4xl:  36px  (2.25rem)
```

### Line Heights
```
leading-tight:   1.25
leading-normal:  1.5
leading-relaxed: 1.625
```

## 🎭 Component Styles

### Buttons

#### Primary Button
```
bg-primary-600 text-white
hover:bg-primary-700
shadow-md hover:shadow-lg
focus:ring-2 focus:ring-primary-500
```

#### Secondary Button
```
bg-secondary-100 text-secondary-700
hover:bg-secondary-200
```

#### Outline Button
```
border-2 border-slate-200 text-slate-700
hover:bg-slate-50
```

#### Ghost Button
```
text-slate-700
hover:bg-slate-100
```

### Cards

#### Base Card
```
bg-white
rounded-xl
shadow-soft (0 1px 3px rgba(0,0,0,0.06))
border border-slate-100
overflow-hidden
transition-all duration-300
```

#### Card Hover
```
hover:shadow-lg (larger shadow)
hover:-translate-y-1 (lift effect)
cursor-pointer
```

### Form Inputs

#### Input Field
```
w-full px-4 py-2.5
rounded-lg
border border-slate-200 bg-white
font-medium text-slate-900
placeholder:text-slate-500
focus:ring-2 focus:ring-primary-500
focus:border-transparent
```

#### Error State
```
border-red-500 ring-red-500
```

### Badges

#### Primary Badge
```
px-2.5 py-0.5 rounded-full
text-xs font-medium
bg-primary-100 text-primary-800
```

## 🎬 Animations

### Transitions
```
duration-200  (Default for interactions)
duration-300  (Smoother transitions)
ease-in-out   (Standard easing)
```

### Keyframe Animations

#### Fade In
```
0%:   opacity: 0
100%: opacity: 1
```

#### Slide In
```
0%:   transform: translateY(-10px); opacity: 0
100%: transform: translateY(0); opacity: 1
```

#### Pulse Soft
```
0%, 100%: opacity: 1
50%:      opacity: 0.5
```

### Usage Classes
```
animate-fade-in    (500ms fade in)
animate-slide-in   (300ms slide from top)
animate-pulse-soft (2s gentle pulse)
```

## 📱 Responsive Breakpoints

```
sm: 640px   (Mobile)
md: 768px   (Tablet)
lg: 1024px  (Desktop)
xl: 1280px  (Large Desktop)
```

**Example Usage:**
```tsx
// Hidden on mobile, visible on tablet and up
<div className="hidden md:block">Desktop content</div>

// Different padding on mobile vs desktop
<div className="px-4 md:px-6 lg:px-8">Content</div>

// Grid that stacks on mobile
<div className="grid md:grid-cols-2 lg:grid-cols-3">
```

## 🎨 CSS Utility Classes

### Component Classes

#### Button
```
.btn                 (Base styles)
.btn-primary         (Primary variant)
.btn-secondary       (Secondary variant)
.btn-outline         (Outline variant)
.btn-ghost           (Ghost variant)
.btn-sm              (Small size)
.btn-lg              (Large size)
```

#### Card
```
.card                (Base card)
.card-hover          (With hover effects)
```

#### Form
```
.input               (Text input)
.select              (Select dropdown)
.label               (Form label)
```

#### Text
```
.text-gradient       (Gradient text effect)
.section-title       (Large section heading)
.section-subtitle    (Subtitle text)
```

#### Other
```
.badge               (Base badge)
.badge-primary       (Primary badge)
.spinner             (Loading spinner)
.divider             (Horizontal divider)
.container           (Centered container)
```

## 🎯 Common Component Combinations

### Card with Header and Body
```tsx
<Card>
  <CardHeader title="Title" description="Description" />
  <CardBody>Content</CardBody>
</Card>
```

### Button Group
```tsx
<div className="flex gap-3">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
</div>
```

### Form Group
```tsx
<div className="space-y-4">
  <Input label="Email" type="email" />
  <Input label="Password" type="password" />
  <Button fullWidth>Submit</Button>
</div>
```

### Alert with Close
```tsx
<Alert
  type="success"
  title="Success!"
  message="Operation completed"
  onClose={() => setShowAlert(false)}
/>
```

## 🌙 Dark Mode Ready

All colors use CSS variables and can be easily switched for dark mode:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}
```

## ✨ Shadows

```
shadow-soft:   0 1px 3px 0 rgba(0, 0, 0, 0.06)
shadow-medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
shadow-lg:     0 10px 15px -3px rgba(0, 0, 0, 0.1)
shadow-xl:     0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

## 🎯 Tips for Consistent Design

1. **Always use the spacing scale** - Never use arbitrary spacing values
2. **Leverage color scale** - Use 50-900 shades consistently
3. **Group related components** - Use card for visual grouping
4. **Maintain hierarchy** - Use size and weight for emphasis
5. **Consistent spacing** - Use same gap between all similar elements
6. **Accessible colors** - Sufficient contrast for text
7. **Animation restraint** - Use animations purposefully
8. **Mobile first** - Start with mobile, enhance for larger screens

---

**This design system ensures consistency and professional appearance across the entire application.**

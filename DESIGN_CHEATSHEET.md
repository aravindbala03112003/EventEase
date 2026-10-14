# EventEase - Visual Design Cheatsheet

## 🎨 Color Quick Reference

### Primary Actions (Use for main CTAs)
```
Primary: #0ea5e9 (Sky Blue)
Hover: #0284c7 (Darker Blue)
Light: #e0f2fe (Light Blue)
```

### Secondary Actions
```
Secondary: #8b5cf6 (Purple)
Hover: #7c3aed (Darker Purple)
Light: #ede9fe (Light Purple)
```

### Status Indicators
```
✓ Success: #10b981 (Green)
✕ Error: #ef4444 (Red)
⚠ Warning: #f59e0b (Amber)
ⓘ Info: #3b82f6 (Blue)
```

### Text Colors
```
Primary Text: #0f172a (Slate 900)
Secondary Text: #475569 (Slate 600)
Tertiary Text: #94a3b8 (Slate 400)
```

## 📐 Spacing Cheatsheet

| Usage | Class | Size |
|-------|-------|------|
| Extra Small | `gap-1` | 4px |
| Small | `gap-2` | 8px |
| Medium | `gap-3` | 12px |
| **Standard** | `gap-4` | **16px** |
| Large | `gap-6` | 24px |
| XL | `gap-8` | 32px |
| 2XL | `gap-12` | 48px |

## 🔤 Typography Cheatsheet

### Headings
```
<h1>text-4xl font-bold           (36px, Bold)</h1>
<h2>text-3xl font-bold           (30px, Bold)</h2>
<h3>text-2xl font-semibold       (24px, Semi-Bold)</h3>
<h4>text-lg font-semibold        (18px, Semi-Bold)</h4>
<p>text-base font-medium          (16px, Medium)</p>
```

### Body Text
```
text-sm text-slate-600  (14px, Secondary)
text-xs text-slate-500  (12px, Tertiary)
```

## 🎯 Component Sizes

### Buttons
```
Small:  px-3 py-1.5 text-sm      (Quick actions)
Medium: px-4 py-2.5 text-base    (Default)
Large:  px-6 py-3 text-base      (Primary actions)
XL:     px-8 py-4 text-lg        (Hero CTAs)
```

### Cards
```
Padding:      p-6              (24px)
Gap inside:   gap-4            (16px)
Border:       rounded-xl        (0.75rem)
```

### Inputs
```
Padding:      px-4 py-2.5
Radius:       rounded-lg
Border:       border border-slate-200
Focus Ring:   ring-2 ring-primary-500
```

## 🎬 Animation Quick Reference

### When to Use Which Animation

| Animation | Use Case | Duration |
|-----------|----------|----------|
| `animate-fade-in` | Page loads, modals appear | 500ms |
| `animate-slide-in` | Notifications, sidebars | 300ms |
| `animate-pulse-soft` | Loading indicators | 2s loop |
| `hover:-translate-y-1` | Card hover, buttons | 200ms |
| `transition-all` | Everything else | 300ms |

## 🚨 Alert Types

### Success (Green)
```tsx
<Alert type="success" message="Booking confirmed!" />
```
🎨 `bg-green-50 border-green-200 text-green-800`

### Error (Red)
```tsx
<Alert type="error" message="Something went wrong" />
```
🎨 `bg-red-50 border-red-200 text-red-800`

### Warning (Amber)
```tsx
<Alert type="warning" message="Pending approval" />
```
🎨 `bg-amber-50 border-amber-200 text-amber-800`

### Info (Blue)
```tsx
<Alert type="info" message="Helpful information" />
```
🎨 `bg-blue-50 border-blue-200 text-blue-800`

## 🎛️ Common Layout Patterns

### Two Column Layout
```tsx
<div className="grid md:grid-cols-2 gap-6">
  <LeftColumn />
  <RightColumn />
</div>
```

### Three Column Layout
```tsx
<div className="grid md:grid-cols-3 gap-6">
  <Column1 />
  <Column2 />
  <Column3 />
</div>
```

### Responsive Grid
```tsx
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map(item => <Card key={item.id} />)}
</div>
```

### Sidebar Layout
```tsx
<div className="grid lg:grid-cols-3 gap-8">
  <MainContent className="lg:col-span-2" />
  <Sidebar />
</div>
```

## 📱 Responsive Breakpoints

| Size | Breakpoint | Usage |
|------|-----------|-------|
| **Mobile** | < 640px | `sm:` |
| **Tablet** | ≥ 768px | `md:` |
| **Desktop** | ≥ 1024px | `lg:` |
| **Large** | ≥ 1280px | `xl:` |

### Responsive Pattern
```tsx
{/* Mobile (default), md: Tablet, lg: Desktop */}
<div className="p-4 md:p-6 lg:p-8">
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## 🏷️ Badge Types

### Success Badge
```tsx
<Badge variant="success">✓ Available</Badge>
```
🎨 Green background

### Warning Badge
```tsx
<Badge variant="warning">⏳ Pending</Badge>
```
🎨 Amber background

### Danger Badge
```tsx
<Badge variant="danger">✕ Cancelled</Badge>
```
🎨 Red background

### Primary Badge
```tsx
<Badge variant="primary">✓ Active</Badge>
```
🎨 Blue background

## ✅ Common Component Combinations

### Card with Action
```tsx
<Card>
  <CardBody className="flex items-center justify-between">
    <h3>Title</h3>
    <Button size="sm">Action</Button>
  </CardBody>
</Card>
```

### Status Row
```tsx
<div className="flex items-center justify-between">
  <div>
    <h4 className="font-bold">Item</h4>
    <p className="text-sm text-slate-600">Subtitle</p>
  </div>
  <Badge variant="success">Status</Badge>
</div>
```

### Form Group
```tsx
<div className="space-y-4">
  <Input label="Field 1" required />
  <Input label="Field 2" required />
  <Button fullWidth>Submit</Button>
</div>
```

### Empty State
```tsx
<div className="text-center py-12 space-y-4">
  <div className="text-5xl">📭</div>
  <h3 className="text-xl font-bold">No items</h3>
  <p className="text-slate-600">Description</p>
  <Button>Action</Button>
</div>
```

## 🌟 Pro Tips

1. **Always use spacing scale** - Never use arbitrary values
2. **Two-tone designs** - Combine primary + secondary for visual interest
3. **Icons + Text** - Pair emojis with text for clarity
4. **Whitespace matters** - Don't crowd elements
5. **Consistent borders** - Use `border border-slate-200`
6. **Shadows for depth** - `shadow-soft` for subtle elevation
7. **Focus states** - Always show focus ring for accessibility
8. **Hover feedback** - Every interactive element should respond

## 🎭 Visual Hierarchy

### Most Important
```
text-4xl font-bold text-slate-900
+ Primary button color
+ Large shadow/elevation
```

### Important
```
text-2xl font-semibold text-slate-900
+ Secondary button color
+ Medium shadow
```

### Supporting
```
text-base font-medium text-slate-700
+ Ghost button
+ Soft shadow
```

### Tertiary
```
text-sm text-slate-600
+ Links
+ No shadow
```

## 🔄 State Examples

### Enabled Button
```
bg-primary-600 text-white cursor-pointer
```

### Hover Button
```
bg-primary-700 shadow-lg
```

### Disabled Button
```
opacity-50 cursor-not-allowed
```

### Loading Button
```
opacity-75 + spinner animation
```

## 📋 Quick Copy-Paste Classes

### Card Container
```
rounded-xl shadow-soft border border-slate-100 bg-white
```

### Button Style
```
px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all
```

### Input Style
```
w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500
```

### Badge Style
```
px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800
```

### Grid 3-Column
```
grid md:grid-cols-3 gap-6
```

### Flex Center
```
flex items-center justify-center
```

### Text Center (Responsive)
```
text-center space-y-4
```

---

**Keep this handy while building! 🎨**

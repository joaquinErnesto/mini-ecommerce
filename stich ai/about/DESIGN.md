# Design System Strategy: The Electric Noir

## 1. Overview & Creative North Star

**Creative North Star: "The Digital Curator"**

This design system is engineered to move e-commerce away from the "grocery store" aesthetic and into the realm of a high-end digital gallery. We reject the standard, bright-white utilitarian grid in favor of a moody, intentional experience that utilizes high-contrast accents to guide the user's eye. 

The strategy relies on **Electric Noir**: a deep, charcoal-driven palette that provides a silent stage for vibrant blue typography and golden-yellow price points. By breaking the "template" look with intentional depth layering and Plus Jakarta Sans’s modern geometry, we create a space that feels curated rather than just "listed."

---

## 2. Colors

The color palette is designed for maximum tonal depth, prioritizing "luminescence" over "flatness."

### Palette Definition
- **Background (`#0e0e0e`)**: The canvas. A deep charcoal that avoids "true black" to prevent OLED smearing and allow for subtler layering.
- **Primary Accent (`#89acff`)**: Used exclusively for titles, links, and high-importance interactions. It should feel like neon light against a dark street.
- **Secondary Accent (`#fdd400`)**: Reserved for prices and brand marks. This gold-yellow provides a "prestige" anchor to the shopping experience.

### The "No-Line" Rule
Standard UI relies on lines to separate content; this design system prohibits 1px solid borders for sectioning. Boundaries are created through background shifts. A `surface-container-low` section sitting on a `surface` background is the only permissible way to define major layout divisions. 

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of glass. 
- Use `surface-container-lowest` (`#000000`) for the base.
- Use `surface-container` (`#1a1a1a`) for card backgrounds.
- Use `surface-bright` (`#2c2c2c`) for hover states or active layers.
This nesting creates a "sink-in" effect that draws the user into the product.

### The Glass & Gradient Rule
For floating elements (like persistent navigation or tooltips), use **Glassmorphism**. Apply `surface` colors at 70% opacity with a `20px` backdrop-blur. Main CTAs should utilize a subtle linear gradient from `primary` (`#89acff`) to `primary-dim` (`#0f6df3`) to provide a tactile, rounded volume.

---

## 3. Typography

**Font Family:** Plus Jakarta Sans (Modern, geometric, and high-readability).

- **Display Scales (Lg/Md/Sm):** Used for hero sections and major category headers. These should be set with tight letter-spacing (-0.02em) to feel authoritative.
- **Headline & Title Scales:** Use `primary` (`#89acff`) for these levels. This blue-tinted hierarchy ensures the user immediately identifies the "subject" of any page.
- **Body Scales:** Set in `on-surface` (`#ffffff`) or `on-surface-variant` (`#adaaaa`). Use the "variant" token for descriptions to reduce visual noise.
- **Label Scales:** Used for micro-copy and metadata. Always uppercase with increased letter-spacing (+0.05em) for a technical, precise feel.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering**. Instead of a flat grid, place a `surface-container-lowest` product card on a `surface-container-low` section. This creates a soft, natural "lift."

### Ambient Shadows
Shadows are only used for "floating" components (modals, dropdowns). Shadows must be:
- **Extra-diffused:** Blur values between `30px` and `60px`.
- **Low-opacity:** `4%` to `8%`.
- **Tinted:** Instead of black, use a shadow color derived from `surface-tint` (`#89acff`) to simulate ambient blue light reflecting off the surface.

### The "Ghost Border" Fallback
Where containment is required (e.g., product images), use a **Ghost Border**. This is the `outline-variant` token at **20% opacity**. It should be barely felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary-container`), `on-primary` text. `0.375rem` (md) corner radius.
- **Secondary:** Surface-bright background with `primary` text.
- **Tertiary:** No fill. `primary` text with a subtle underline on hover.

### Product Cards
Forbid divider lines. Use vertical white space (from the Spacing Scale) to separate the product image, title, and price. The image should sit on a `surface-variant` background to give it a "studio" feel.

### Input Fields
Dark-themed inputs using `surface-container-highest` backgrounds. The active state is signaled by a `primary` ghost border (20% opacity) and a glowing cursor.

### Navigation Bar
A simple, high-clarity top bar. Use `surface-container-low` with a 10% opacity `outline-variant` bottom border to separate it from the content without a harsh line.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use `secondary` (`#fdd400`) for all pricing. It must be the most "luminous" element in the card.
- **Do** allow for generous negative space. High-end design breathes.
- **Do** use `plusJakartaSans` for all weights. Its consistency is what makes the system feel bespoke.

### Don't:
- **Don't** use 100% opaque, high-contrast borders. It breaks the "Electric Noir" immersion.
- **Don't** use generic grey shadows. Always tint your shadows with the primary blue.
- **Don't** mix multiple font families. The system relies on the sophisticated weights of a single typeface to convey hierarchy.
- **Don't** use bright backgrounds for images; use `surface-variant` to keep the dark-mode integrity.
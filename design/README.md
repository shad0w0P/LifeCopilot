# Styling and Brand Design System

This folder holds brand files, assets, and layouts for the LifeCopilot client application.

---

## 1. Visual Hierarchy & Theme

* **Primary Color**: Deep Indigo / Purple (Material `#3f51b5`)
* **Accent Color**: Pink / Rose (Material `#ff4081`)
* **Dark Mode**: High contrast dark slate (`#1e293b`) with light grey text overlays (`#f8fafc`).
* **Typography**: Outfit or Inter Google fonts are used, ensuring modern UI readability.

---

## 2. Component Design Philosophy

* **Consistency**: Components must combine Material standard design logic with Tailwind layouts.
* **Signals Responsive Layout**: Use Angular signals (`AuthService.currentUser()`) to render login cards or member menus dynamically.
* **Component Encapsulation**: Utilize default Angular component styling scoping (`ViewEncapsulation.Emulated`) for custom styling adjustments. Avoid leaking styles to outer scopes.

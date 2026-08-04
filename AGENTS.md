# AGENTS.md — Galaxy Decor Project Context & AI Agent Guardrails

## 1. Project Overview & Business Context

**Galaxy Decor** is a full-stack e-commerce and luxury interior design solutions platform for a physical showroom based in Perundurai/Vijayamangalam, Erode, Tamil Nadu, India.

- **Business Domain:** E-commerce furniture sales & turnkey residential/commercial interior solutions.
- **Product Offerings:** High-end imported furniture (China, Indonesia, Asian region), living room collections, bedroom sets, office furniture, center tables, tea poys, showpieces, flower vases, gift items, and LED decorative water fountains.
- **Service Offerings:** Customized interior design packages for home, office, restaurant, hotel, café, and showroom setups.

---

## 2. Technical Stack & System Architecture

```
                     +---------------------------------------+
                     |         Browser / Client SPA          |
                     |  (HTML5, Vanilla JS, CSS3, Router)    |
                     +-------------------+-------------------+
                                         |
                                         | REST API (JSON)
                                         v
                     +-------------------+-------------------+
                     |          Express.js Backend           |
                     | (Node.js API / Vercel Serverless)     |
                     +---------+-------------------+---------+
                               |                   |
         Database Requests     |                   | Payment Verification
          (Supabase Client)    v                   v
                     +---------+---------+   +-----+-----+
                     | Supabase Cloud    |   | Razorpay  |
                     | PostgreSQL DB     |   | Gateway   |
                     +-------------------+   +-----------+
```

### Architecture Highlights:
* **Frontend SPA:** Single Page Application built with Vanilla JavaScript (ES6+ Class-based), HTML5, and Vanilla CSS3. Uses Lucide Icons for UI elements.
* **Client Router:** Custom HTML5 History API router ([`js/router.js`](file:///c:/Users/Devaraj/Desktop/galaxy-decor/js/router.js)).
* **Backend API:** Node.js + Express.js REST API ([`backend/server.js`](file:///c:/Users/Devaraj/Desktop/galaxy-decor/backend/server.js)). Supports serverless deployment via Vercel ([`api/index.js`](file:///c:/Users/Devaraj/Desktop/galaxy-decor/api/index.js)) as well as local Express serving.
* **Database & Persistence:** Supabase PostgreSQL cloud database using `@supabase/supabase-js` ([`backend/database.js`](file:///c:/Users/Devaraj/Desktop/galaxy-decor/backend/database.js), [`backend/schema.sql`](file:///c:/Users/Devaraj/Desktop/galaxy-decor/backend/schema.sql)).
* **Offline Resilience:** API layer ([`js/api.js`](file:///c:/Users/Devaraj/Desktop/galaxy-decor/js/api.js)) gracefully falls back to `LocalStorage` and fallback data ([`js/data.js`](file:///c:/Users/Devaraj/Desktop/galaxy-decor/js/data.js)) if the backend or Supabase is unreachable.
* **Payment Security:** Razorpay SDK with backend price re-verification and HMAC-SHA256 signature verification to prevent client-side cart tampering.
* **Admin Dashboard:** Management portal ([`admin.html`](file:///c:/Users/Devaraj/Desktop/galaxy-decor/admin.html)) protected by environment-configured tokens (`X-Admin-Auth`).

---

## 3. Database Schema (Supabase PostgreSQL)

The database consists of **8 core tables**:

1. `store_config`: Store settings and contact info (Key-Value store).
2. `categories`: Furniture and decor product categories.
3. `products`: E-commerce catalog items with JSONB fields for gallery and specs.
4. `interior_solutions`: Turnkey design packages and feature lists.
5. `reviews`: Customer testimonials and rating scores.
6. `orders`: Customer purchase records, line items, and payment status.
7. `enquiries`: Consultation and contact form submissions.
8. `coupons`: Discount codes with percentage or fixed discount rules.

---

## 4. Key Directory Structure

```
galaxy-decor/
├── api/
│   └── index.js             # Vercel Serverless Function entry point
├── backend/
│   ├── .env                 # API Keys, DB Credentials & Admin Tokens
│   ├── database.js          # Supabase Client Initialization & Config Check
│   ├── schema.sql           # Complete Supabase PostgreSQL Schema & RLS Policies
│   ├── seed.js              # Local database seeder
│   ├── seed_supabase.js     # Supabase Cloud Database seeder script
│   └── server.js            # Node/Express REST API & Razorpay integration
├── css/
│   ├── animations.css       # Keyframes & visual state animations
│   └── styles.css           # Custom CSS design system & styling
├── js/
│   ├── api.js               # Frontend API layer with LocalStorage fallback
│   ├── app.js               # Main Client App Logic & UI interactions
│   ├── data.js              # Fallback static database & store defaults
│   ├── products_catalog.js  # Compiled catalog dataset
│   ├── router.js            # HTML5 History API Client-Side Router
│   └── utils.js             # Utility functions
├── admin.html               # Admin Dashboard & Management UI
├── index.html               # Main Customer SPA UI
├── package.json             # Dependencies & start scripts
└── vercel.json              # Vercel URL rewrite rules
``` 

---

## 5. Strict Guardrails & Guidelines for Future AI Agents

All AI agents and developers modifying this codebase **MUST STRICTLY ADHERE** to the following guardrails:

### 1. Code Simplicity & Clarity
* **Use Simple Code:** Write straightforward, intuitive code instead of complex, obscure, or clever tricks.
* **Developer Readability:** Code must be clean, well-commented where necessary, self-explanatory, and easily readable by human developers.

### 2. Industry Standards & Quality
* **Follow Industry Standards:** Adhere to modern web development best practices (Semantic HTML5, modular JavaScript ES6+, RESTful API conventions, secure headers, sanitized inputs).

### 3. User Permission & Intent
* **Don't Change Anything Uninstructed:** Do not modify, refactor, or delete any code, file, logic, or feature unless explicitly instructed by the user.
* **Don't Assume Anything:** If there is any ambiguity, doubt, or missing requirement, **STOP AND ASK THE USER FOR CLARIFICATION**.

### 4. Integrity of Existing Functionality & UI
* **Preserve Existing Functionality:** Do not break or alter any working feature, backend endpoint, route, database call, or state management.
* **Preserve UI & Design Language:** Follow the existing project theme strictly. Maintain current UI elements, color palettes, typography, spacing, glassmorphism cards, micro-animations, and responsive design patterns.

### 5. Zero-Tolerance Rule Enforcement & Exception Protocol
* **Strict Adherence:** All rules listed in this document must be followed strictly without exception.
* **Mandatory Exception Request:** If an absolute technical necessity requires breaking any rule (e.g. fixing a critical security flaw or database syntax change), **YOU MUST GET EXPLICIT PERMISSION FROM THE USER FIRST** by thoroughly explaining the situation, risks, and proposed solution before taking any action.

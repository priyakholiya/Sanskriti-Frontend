# Sanskriti - Elegant Ethnic Wear Storefront

Sanskriti is a premium, modern, and responsive e-commerce web application dedicated to Indian ethnic wear, focusing on fine Sarees and Suits. Designed with a luxury aesthetic (featuring Sindoor Red and Gold accents), it offers a seamless customer shopping experience alongside a comprehensive Admin Dashboard.

---

## 🎨 Key Features

### Storefront (Customer Experience)
*   **Luxury Home Page**: Immersive landing page featuring interactive hero banners, curated editorial grids, and collection highlights.
*   **Sarees & Suits Catalogs**: Beautifully structured catalogs displaying ethnic wear collections with interactive filters.
*   **Detailed Product Pages**: Multiple images, detailed specifications, variants (sizes, colors), and stock indicators.
*   **Persistent Shopping Cart**: Sliding cart panel using React Context for real-time calculations.
*   **Smooth Checkout**: A structured shipping and billing checkout flow.
*   **Brand Story**: A custom "About Us" page detailing the heritage, craftsmanship, and lineage of the fabrics.

### Admin Dashboard (Operations)
*   **Performance Metrics**: Analytics dashboard showcasing sales trends, metrics, and stock value trackers.
*   **Catalog Management**: Full CRUD interface to add/modify products, configure specific sizing/color variations, and manage tags.
*   **Cloud Image Uploading**: Seamless image uploading directly integrated with Cloudinary.
*   **Inventory Operations**: Tools to process stock-in and stock-out movements, complete with historical logs.
*   **Order Management**: Track orders, inspect details, and update shipping/delivery stages.
*   **Contact Messages**: Access and reply to customer inquiries directly.

---

## 🛠️ Tech Stack

*   **Frontend Core**: React 19, Vite (Fast HMR)
*   **Routing**: React Router v7 (configured for SPA)
*   **State Management**: React Context (`CartContext`, `AuthContext`)
*   **Styling**: Vanilla CSS (Custom CSS Variables, fluid layouts, glassmorphism, and micro-animations)
*   **Integrations**: Lucide React (Icons), Cloudinary API (Media storage)
*   **Backend Integration**: Spring Boot REST API (deployed on Render)

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18 or higher)
*   npm (Node Package Manager)

### Installation & Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DevanshBamrara/Sanskriti-Frontend.git
    cd Sanskriti-Frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 📂 Project Structure

```text
Sanskriti-Frontend/
├── public/                 # Static files and assets
├── src/
│   ├── assets/             # Branding graphics & design elements
│   ├── components/
│   │   ├── admin/          # Admin layout, Sidebar, and specialized widgets
│   │   └── layout/         # Public layouts, Header, Footer, and SilkHero banner
│   ├── context/            # Auth and Cart React contexts
│   ├── pages/
│   │   ├── admin/          # Dashboard, Catalog, Inventory, and Order views
│   │   ├── About.jsx       # Brand history page
│   │   ├── Checkout.jsx    # Checkout and payment gateway mockup
│   │   ├── Home.jsx        # Landing page
│   │   ├── ProductDetail.jsx# Multi-view product page
│   │   ├── Sarees.jsx      # Sarees listing
│   │   └── Suits.jsx       # Suits listing
│   ├── services/
│   │   ├── api.js          # REST integration with Spring Boot backend
│   │   └── cloudinary.js   # Client-side image upload handler
│   ├── App.css             # Main stylesheet & custom typography
│   ├── App.jsx             # Main Router configuration
│   ├── index.css           # Global design tokens (Sindoor red, gold accents)
│   └── main.jsx            # Entry point
├── vercel.json             # SPA redirection rules for production deployment
├── vite.config.js          # Vite config
└── package.json            # Scripts & project manifest
```

---

## 🌍 Vercel Deployment

This project uses client-side routing via React Router. When deployed on Vercel, requests to direct paths (like `/admin` or `/checkout`) require fallback rewriting to `index.html` to avoid `404: NOT_FOUND` errors. 

This is configured in `vercel.json` at the root of the project:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

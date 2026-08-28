/**
 * GALAXY DECOR - Backend API Integration Layer
 * Safely fetches data from the backend and falls back to LocalStorage if offline.
 */

const API_BASE = (window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')) ? 'http://localhost:5000/api' : 'https://galaxydecor.vercel.app/api';

// ----------------------------------------------------
// Cache Version Guard
// Bump DATA_VERSION whenever products/categories change
// to force-clear old localStorage cache on all devices.
// ----------------------------------------------------
const DATA_VERSION = "v20260828_v400"; // <-- bump this when data changes
const storedVersion = localStorage.getItem("gd_data_version");
if (storedVersion !== DATA_VERSION) {
  // Clear all old product/category/review cache
  ["gd_products","gd_categories","gd_reviews","gd_store","gd_solutions","gd_orders","gd_enquiries","gd_coupons"].forEach(k => localStorage.removeItem(k));
  localStorage.setItem("gd_data_version", DATA_VERSION);
  console.log("[Cache] Old data cleared. Fresh data will be loaded from backend.");
}

window.GalaxyAPI = {
  
  // ----------------------------------------------------
  // GET Data (Fetch from backend, fallback to local)
  // ----------------------------------------------------
  
  async fetchAllData() {
    try {
      const [productsRes, categoriesRes, reviewsRes, storeRes, solutionsRes] = await Promise.all([
        fetch(`${API_BASE}/products`),
        fetch(`${API_BASE}/categories`),
        fetch(`${API_BASE}/reviews`),
        fetch(`${API_BASE}/store`),
        fetch(`${API_BASE}/solutions`)
      ]);

      if (!productsRes.ok) throw new Error("Backend not responding properly");

      const products = await productsRes.json();
      const categories = await categoriesRes.json();
      const reviews = await reviewsRes.json();
      const store = await storeRes.json();
      const solutions = await solutionsRes.json();

      // NOTE: Products, categories & reviews are intentionally NOT cached in localStorage.
      // This ensures that when the client adds or deletes products via the admin panel,
      // all users immediately see the updated data on their next page load — no manual
      // cache busting or version bumps needed.

      // Synchronize in-memory app state and re-render current view with live DB data
      if (window.GalaxyAppInstance) {
        if (Array.isArray(products)) {
          window.GalaxyAppInstance.products = products;
          if (typeof window.GalaxyAppInstance.syncCartWithProducts === 'function') {
            window.GalaxyAppInstance.syncCartWithProducts();
          }
        }
        if (Array.isArray(categories)) window.GalaxyAppInstance.categories = categories;
        if (Array.isArray(reviews)) window.GalaxyAppInstance.reviews = reviews;
        if (Array.isArray(solutions)) window.GalaxyAppInstance.solutions = solutions;
        if (store && typeof store === 'object' && !store.error) window.GalaxyAppInstance.updateStoreConfig();

        if (window.GalaxyRouter) {
          if (typeof window.GalaxyRouter.handleRouting === 'function') {
            window.GalaxyRouter.handleRouting();
          } else if (typeof window.GalaxyRouter.handleRoute === 'function') {
            window.GalaxyRouter.handleRoute();
          }
        }
      }

      return true;
    } catch (error) {
      console.warn("Backend API is offline. Falling back to LocalStorage data.", error);
      return false; // Fallback to local storage
    }
  },

  async loginAdmin(username, password) {
    try {
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }
      const data = await response.json();
      if (data.token) {
        sessionStorage.setItem('gd_admin_token', data.token);
        sessionStorage.setItem('gd_admin_logged_in', 'true');
        return { success: true };
      }
      return { success: false, error: 'No token returned' };
    } catch (err) {
      console.warn("Admin login error:", err.message);
      return { success: false, error: err.message };
    }
  },

  async fetchAdminData() {
    try {
      const token = sessionStorage.getItem('gd_admin_token') || '';
      const authHeaders = { 'X-Admin-Auth': token };
      const [ordersRes, enquiriesRes, couponsRes] = await Promise.all([
        fetch(`${API_BASE}/orders`, { headers: authHeaders }),
        fetch(`${API_BASE}/enquiries`, { headers: authHeaders }),
        fetch(`${API_BASE}/coupons`, { headers: authHeaders })
      ]);

      const orders = await ordersRes.json();
      const enquiries = await enquiriesRes.json();
      const coupons = await couponsRes.json();

      if (Array.isArray(orders)) localStorage.setItem("gd_orders", JSON.stringify(orders));
      if (Array.isArray(enquiries)) localStorage.setItem("gd_enquiries", JSON.stringify(enquiries));
      if (Array.isArray(coupons)) localStorage.setItem("gd_coupons", JSON.stringify(coupons));
      
      return true;
    } catch (error) {
      console.warn("Backend API offline for admin data.", error);
      return false;
    }
  },

  async validateCoupon(code, amount = 0) {
    if (!code) return { valid: false, error: "Please enter a coupon code." };
    const cleanCode = String(code).trim().toUpperCase();

    // 1. Try Backend Live Validation API
    try {
      const res = await fetch(`${API_BASE}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode, amount })
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      const errData = await res.json();
      if (errData && errData.error) {
        return { valid: false, error: errData.error };
      }
    } catch (e) {
      console.warn("Backend coupon validation failed, falling back to local storage.", e);
    }

    // 2. Offline / Local Storage Fallback
    const localCoupons = JSON.parse(localStorage.getItem("gd_coupons") || "null") || 
                         (window.GALAXY_DECOR_DB ? window.GALAXY_DECOR_DB.coupons : []);
    const matched = (localCoupons || []).find(c => c.code === cleanCode && (c.isActive === undefined || c.isActive === true));
    
    if (!matched) {
      return { valid: false, error: "Invalid or inactive promo coupon code." };
    }

    const minVal = Number(matched.minOrderValue) || 0;
    if (amount > 0 && amount < minVal) {
      return { 
        valid: false, 
        error: `Coupon ${cleanCode} requires a minimum order amount of ₹${minVal.toLocaleString('en-IN')}.` 
      };
    }

    return {
      valid: true,
      coupon: {
        id: matched.id,
        code: matched.code,
        discountType: matched.discountType || (matched.discount ? 'percentage' : 'fixed'),
        discountValue: Number(matched.discountValue !== undefined ? matched.discountValue : matched.discount) || 0,
        minOrderValue: minVal
      }
    };
  },


  // ----------------------------------------------------
  // POST / PUT / DELETE Methods (Admin operations)
  // ----------------------------------------------------

  async syncEntity(endpoint, method, data) {
    try {
      const token = sessionStorage.getItem('gd_admin_token') || '';
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'X-Admin-Auth': token
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error(`Failed to ${method} ${endpoint}`);
      return await response.json();
    } catch (error) {
      console.warn(`Failed to sync ${endpoint} to backend:`, error);
      // We don't throw, we let the frontend keep running with its local state
      return null;
    }
  },

  async deleteEntity(endpoint, id) {
    try {
      const token = sessionStorage.getItem('gd_admin_token') || '';
      const response = await fetch(`${API_BASE}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Auth': token }
      });
      if (!response.ok) throw new Error(`Failed to delete from ${endpoint}`);
      return await response.json();
    } catch (error) {
      console.warn(`Failed to delete ${id} from ${endpoint}:`, error);
      return null;
    }
  }

};

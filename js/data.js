/* ==========================================================================
   GALAXY DECOR - PRODUCTS, CATEGORIES, & REVIEWS DATABASE
   ========================================================================== */

window.GALAXY_DECOR_DB = {
  // 1. Store Details
  store: {
    name: "GALAXY DECOR",
    phone: "8608738393",
    email: "galaxydecorind@gmail.com",
    address: "4/642, Post Office Building, Sakthi Nagar, Opposite Viswanathan Hospital, Vijayamangalam, Perundurai, Erode - 638056.",
    tagline: "Transform Your Space with Premium Imported Furniture",
    about: "GALAXY DECOR specializes in premium imported furniture and complete interior solutions for residential and commercial spaces. We import high-quality furniture from China, Indonesia, and other leading Asian countries, offering elegant, durable, and modern collections for homes, offices, restaurants, hotels, cafés, showrooms, and commercial interiors.",
    enableCOD: false
  },

  // 2. Featured Categories
  categories: [
    {
      id: "showpieces",
      name: "Showpieces",
      desc: "Handcrafted designer statuettes and abstract modern room highlights.",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "flower-pots",
      name: "FLOWER POTS",
      desc: "ARTIFICIAL REAL TOUCH FLOWERS AND VASE COLLECTIONS",
      image: "placeholder_flower-pots"
    }
  ],

  // 3. Complete Interior Solutions Packages
  interiorSolutions: [
    {
      id: "bedroom-setup",
      title: "Complete Bedroom Setup",
      subtitle: "Residential Luxury",
      desc: "Get an end-to-end master bedroom configuration including imported king size bed frame, orthopaedic mattress, bedside tables, custom wardrobe panelling, light controls, and window drapes.",
      price: "₹1,49,999",
      image: "/assets/solution_bedroom.jpg",
      features: ["Imported King Bed", "2 Bedside Tables", "Modular 4-Door Wardrobe", "Accent Bed Wall Panelling"]
    },
    {
      id: "office-setup",
      title: "Complete Office Setup",
      subtitle: "Commercial & Corporate",
      desc: "Professional layout including an executive table with integrated cord routing, ergonomic high-back posture chairs, storage file consoles, and dynamic lighting solutions.",
      price: "₹2,19,999",
      image: "/assets/solution_office.jpg",
      features: ["Executive Desk", "Premium Ergonomic Chair", "File Cabinet System", "Meeting Table with 4 Chairs"]
    },
    {
      id: "restaurant-setup",
      title: "Complete Restaurant Setup",
      subtitle: "Commercial Cafe & Hospitality",
      desc: "Cohesive aesthetic layouts for cafes and dining outlets. Includes heavy-duty marble tables, custom designer seating options, counter spaces, and weather-proof outdoor tables.",
      price: "₹4,89,999",
      image: "/assets/solution_restaurant.jpg",
      features: ["10 Dining Tables", "40 Café Chairs", "1 Reception counter", "Custom Wall Shelves"]
    },
    {
      id: "custom-projects",
      title: "Customized Interior Projects",
      subtitle: "Bespoke Design Consultancy",
      desc: "Full-scale custom site execution. From site measurements and architectural CAD space layouts to custom material selection and site installation overseen by lead designers.",
      price: "On Estimation",
      image: "placeholder_solution_custom",
      features: ["Architectural 3D Visuals", "Material Curation", "On-site Turnkey Supervision", "1-Year Warranty"]
    },
    {
      id: "imported-furniture-solutions",
      title: "Imported Furniture Solutions",
      subtitle: "Direct Sourcing Service",
      desc: "Direct procurement assistance from premium manufacturers in China and Indonesia. We handle inspection, global shipping, port clearance, and local transportation to your doorstep.",
      price: "Custom Sourcing Quote",
      image: "placeholder_solution_imported",
      features: ["Factory-Direct Procurement", "Quality Control Check", "Hassle-Free Import Clearance", "Safe Showroom Transport"]
    }
  ],

  // 4. Client Testimonials
  reviews: [
    {
      id: "rev1",
      author: "Adithya Vardhan",
      title: "Homeowner, Erode",
      rating: 5,
      text: "We bought our entire living room sofa set and marble dining table from Galaxy Decor. The import quality is top-notch, and the gold metal detailing matches our luxury theme perfectly. Highly recommended!"
    },
    {
      id: "rev2",
      author: "Deepika Rangaraj",
      title: "Founder, Zenith Café",
      rating: 5,
      text: "Galaxy Decor handled our cafe interiors. The imported dining chairs and outdoor café tables look clean, minimal, and are extremely durable. Their price was very competitive compared to Chennai showroom quotes."
    },
    {
      id: "rev3",
      author: "Dr. Karthik Sundaram",
      title: "Sundaram Clinic, Perundurai",
      rating: 5,
      text: "The executive office desk and waiting lounge chairs from Galaxy Decor are exceptional. It instantly gave our hospital lobby a premium and comfortable look. Great customer support during installation."
    },
    {
      id: "rev4",
      author: "Meera Krishnakumar",
      title: "Interior Designer",
      rating: 5,
      text: "As a professional interior designer, I trust Galaxy Decor for premium imported items. Their catalog of decorative fountains and flower vases contains pieces that are unique and not found elsewhere in the local market."
    },
    {
      id: "rev5",
      author: "Rajesh Sekhar",
      title: "Residential Customer",
      rating: 4,
      text: "Smooth delivery of our king-size bed set. Sourced directly from Asia. The finish is excellent and assembly was done on-site in a day. Will purchase showpieces next."
    }
  ],

  // 5. Default Luxury Product Catalog (Synced with window.GALAXY_PRODUCTS)
  get products() {
    return (window.GALAXY_PRODUCTS && Array.isArray(window.GALAXY_PRODUCTS) && window.GALAXY_PRODUCTS.length > 0)
      ? window.GALAXY_PRODUCTS
      : [];
  },

  // 4. Default Promo Coupons
  coupons: [
    {
      id: "c_welcome10",
      code: "WELCOME10",
      discountType: "percentage",
      discountValue: 10,
      minOrderValue: 1000,
      isActive: true
    },
    {
      id: "c_galaxy15",
      code: "GALAXY15",
      discountType: "percentage",
      discountValue: 15,
      minOrderValue: 5000,
      isActive: true
    },
    {
      id: "c_festive500",
      code: "FESTIVE500",
      discountType: "fixed",
      discountValue: 500,
      minOrderValue: 3000,
      isActive: true
    }
  ]
};


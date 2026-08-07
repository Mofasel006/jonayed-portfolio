/*
 * BLUEPRINT ATELIER — site content
 * All profile data for Md Jonayed Ahamed II's portfolio, extracted from CV.
 * Headlines read like engineered declarations; microcopy reads like telemetry.
 */

export const ASSETS = {
  logo: "/manus-storage/brand-logo_b1645213.png",
  heroStructure: "/manus-storage/hero-structure_34b0d810.jpg",
  city: "/manus-storage/section-city_0044f7ec.jpg",
  concrete: "/manus-storage/section-concrete_2fe545b7.jpg",
  river: "/manus-storage/section-river_e74020ee.jpg",
};

export const PROFILE = {
  name: "Md Jonayed Ahamed",
  suffix: "II",
  title: "Civil Engineer — Sustainable Infrastructure & Smart Cities",
  tagline:
    "I design structures that outlive their blueprints. Research-driven civil engineering for the next generation of smart, flood-resilient, AI-aware cities.",
  location: "Narsingdi, Dhaka — Bangladesh",
  phone: "+880 1869-824595",
  email: "jkjonayed6@gmail.com",
  linkedin: "https://www.linkedin.com/in/md-jonayed-ahamed-413b24334",
  status: "AVAILABLE FOR COLLABORATION",
  idCode: "JAH-II-413B24334",
};

export interface Project {
  id: string;
  no: string;
  title: string;
  edition: string;
  summary: string;
  image: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "green-city",
    no: "PRJ-01",
    title: "NextGen Green City",
    edition: "8th Edition — Sustainable Smart Urban Development",
    summary:
      "A large-scale sustainable smart-city model integrating renewable energy, smart infrastructure, and eco-friendly real estate planning. Designed residential, industrial, and green zones with turbine-powered street lighting, wireless EV charging, container duplex housing, and sustainable transport networks.",
    image: ASSETS.city,
    stats: [
      { label: "System Type", value: "Smart City Framework" },
      { label: "Energy Model", value: "Turbine-Powered Grid" },
      { label: "Housing Module", value: "Container Duplex" },
      { label: "Scale", value: "Large-Scale Zoning" },
    ],
    tags: ["Renewable Energy", "Smart Infrastructure", "Eco-Planning"],
  },
  {
    id: "quantum-infra",
    no: "PRJ-02",
    title: "Quantum Infrastructure",
    edition: "10th Edition — High-Tech AI-Powered Systems",
    summary:
      "An advanced AI-based smart infrastructure framework integrating urban planning, traffic optimization, greenery management, and data-driven resource allocation. Uses artificial intelligence for predictive urban analytics, smart facility automation, and optimized traffic control systems.",
    image: ASSETS.concrete,
    stats: [
      { label: "Intelligence", value: "Predictive Analytics" },
      { label: "Traffic System", value: "AI-Controlled Flow" },
      { label: "Automation", value: "Smart Facilities" },
      { label: "Scope", value: "City-Wide Network" },
    ],
    tags: ["Artificial Intelligence", "Traffic Optimization", "Data-Driven"],
  },
  {
    id: "permeable-road",
    no: "PRJ-03",
    title: "Super Permeable Road System",
    edition: "Hybrid Permeable Concrete — 1st & 2nd Edition",
    summary:
      "An innovative water-drainage road solution engineered for flood-prone urban areas such as Mirpur, Mohammadpur, and Bashundhara. Combines permeable concrete technology with smart soil infiltration systems to reduce waterlogging and improve stormwater management. Prototype tested at small scale; research paper accepted at ICCSD KUET Conference.",
    image: ASSETS.concrete,
    stats: [
      { label: "Concrete Grade", value: "Permeable C-Series" },
      { label: "Prototype", value: "Tested (1:1 Small)" },
      { label: "Conference", value: "ICCSD KUET" },
      { label: "Status", value: "Award-Winning" },
    ],
    tags: ["Permeable Concrete", "Flood Resilience", "Stormwater"],
  },
  {
    id: "buriganga",
    no: "PRJ-04",
    title: "Buriganga River Restoration",
    edition: "Water Cleaning & Waste-to-Energy — 2nd Edition",
    summary:
      "An environmental restoration model focused on Buriganga River pollution control through waste collection, filtration, and energy generation. Integrates floating waste collectors, water purification techniques, and waste-to-energy conversion to improve water quality and support renewable energy production.",
    image: ASSETS.river,
    stats: [
      { label: "Collection", value: "Floating Arrays" },
      { label: "Filtration", value: "Multi-Stage" },
      { label: "Output", value: "Waste-to-Energy" },
      { label: "Pilot", value: "Successful" },
    ],
    tags: ["Environmental", "Water Treatment", "Waste-to-Energy"],
  },
  {
    id: "container-housing",
    no: "PRJ-05",
    title: "Container Fast-Build Housing",
    edition: "Recycled Shipping Container Business Model",
    summary:
      "A rapid-construction, cost-effective housing solution using recycled shipping containers. Designed a professional real estate business model focusing on affordable duplex housing, sustainable construction materials, and fast deployment techniques for urban housing shortages and disaster-resilient housing.",
    image: ASSETS.heroStructure,
    stats: [
      { label: "Module", value: "Duplex Container" },
      { label: "Material", value: "Recycled Steel" },
      { label: "Deployment", value: "Fast-Build System" },
      { label: "Use Case", value: "Disaster-Resilient" },
    ],
    tags: ["Affordable Housing", "Rapid Construction", "Sustainability"],
  },
];

export const EXPERIENCE = [
  {
    org: "Nextgen Innovators",
    role: "Project Developer & Site Coordination Associate",
    period: "2024 — 2025",
    location: "Dhaka, Bangladesh",
    points: [
      "Project planning, prototype development, and site supervision of concrete-based experimental and pilot projects.",
      "Transformed academic research ideas into practical, market-ready small-scale engineering solutions.",
      "Hands-on exposure to material handling, workflow planning, and applied construction research.",
    ],
  },
  {
    org: "GreenTech Association Bangladesh",
    role: "Research Associate — Waste-to-Energy & Water Treatment",
    period: "2022 — 2023",
    location: "Dhaka, Bangladesh",
    points: [
      "Water sample collection, laboratory-based quality testing, purification techniques, and environmental data observation.",
      "Designed small-scale machinery and experimental systems for waste-to-energy and water treatment.",
      "Project achieved successful pilot outcomes for Buriganga River remediation.",
    ],
  },
  {
    org: "Sonargaon University IDC Hub",
    role: "Founder & President — Innovation, Design & Collaboration Hub",
    period: "2025 — 2026",
    location: "Sonargaon University",
    points: [
      "Led a community of 200+ active members in research, innovation, and project-based activities.",
      "Teams secured 17+ national and international awards through innovation challenges and competitions.",
      "Built one of the university's strongest student-led innovation platforms.",
    ],
  },
];

export const EDUCATION = [
  {
    institution: "Sonargaon University",
    degree: "B.Sc. in Civil Engineering",
    period: "2024 — 2027 (ongoing)",
    detail: "GPA 3.05/4.00 · Conference paper accepted at ICCSD KUET · Award-winning sustainable development projects",
  },
  {
    institution: "Barnamala Ideal College",
    degree: "HSC — Science",
    period: "2021 — 2023",
    detail: "GPA 4.67/5.00 · Best Student Award (Upazila Level) · Best Debater Award",
  },
];

export const SKILLS = [
  { name: "AutoCAD", category: "Software", level: 85 },
  { name: "Revit", category: "BIM", level: 70 },
  { name: "STAAD Pro", category: "Analysis", level: 65 },
  { name: "BIM Workflow", category: "BIM", level: 72 },
  { name: "MS Project", category: "Management", level: 75 },
  { name: "Excel / BOQ", category: "Estimation", level: 88 },
  { name: "RCC Design Basics", category: "Structural", level: 74 },
  { name: "Soil Mechanics", category: "Geotech", level: 68 },
  { name: "Permeable Concrete", category: "Materials", level: 82 },
  { name: "Sustainable Design", category: "Concepts", level: 90 },
  { name: "BNBC Concepts", category: "Codes", level: 70 },
  { name: "Site Coordination", category: "Field", level: 84 },
];

export const SERVICES = [
  {
    title: "Structural Analysis",
    desc: "RCC fundamentals, load-path reasoning, and structural report writing aligned with BNBC concepts.",
    icon: "columns-3",
  },
  {
    title: "Sustainable Infrastructure",
    desc: "SDG-aligned development, green construction strategy, and permeable concrete system design.",
    icon: "leaf",
  },
  {
    title: "Project Planning & BOQ",
    desc: "Quantity take-off, cost estimation, and construction sequence planning with MS Project.",
    icon: "clipboard-list",
  },
  {
    title: "Research & Prototyping",
    desc: "Research-based project analysis, prototype development, and technical documentation.",
    icon: "flask-conical",
  },
  {
    title: "Smart City Consultancy",
    desc: "AI-driven urban analytics, traffic optimization frameworks, and renewable integration planning.",
    icon: "cpu",
  },
  {
    title: "Site Coordination",
    desc: "Site supervision, quality control, safety awareness, and multi-team workflow coordination.",
    icon: "hard-hat",
  },
];

export const AWARDS = [
  { label: "Winner & Bronze Medalist", event: "International Science & Innovation Festival (ISIF)", loc: "Indonesia" },
  { label: "Winner & Bronze Medalist", event: "BYSIS Innovation Sparks Award 2025", loc: "Thailand" },
  { label: "Champion", event: "Eco Youth Summit", loc: "National" },
  { label: "Best Sustainable Project Award", event: "Traction Avvudoy — BRAC University", loc: "National" },
  { label: "Best Renewable Energy Project", event: "AUST Mind Sparks 2024", loc: "National" },
  { label: "1st Runner-Up", event: "NSU Civil Fest / DIU Civil Fest", loc: "National" },
  { label: "Best Ambassador", event: "DIU Civil Fest · NSU Tech Fest", loc: "National" },
  { label: "Best Student Award", event: "National Education Week 2023", loc: "Upazila Level" },
];

export const NAV_LINKS = [
  { id: "hero", label: "Overview", tag: "SEC. 00" },
  { id: "about", label: "About", tag: "SEC. 01" },
  { id: "experience", label: "Experience", tag: "SEC. 02" },
  { id: "projects", label: "Projects", tag: "SEC. 03" },
  { id: "services", label: "Capabilities", tag: "SEC. 04" },
  { id: "awards", label: "Awards", tag: "SEC. 05" },
  { id: "contact", label: "Contact", tag: "SEC. 06" },
];

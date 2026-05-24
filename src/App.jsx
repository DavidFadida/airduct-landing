import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, CheckCircle, Wind, ShieldCheck, Clock, Star, Sparkles, Home, Menu, Leaf, ChevronLeft, ChevronRight, MapPin, Maximize2, Play, X } from "lucide-react";
import heroImage from "./assets/hero.png";

const galleryImageModules = import.meta.glob("./assets/gallery/images/*.{jpg,jpeg,png,webp,avif,gif}", {
  eager: true,
  import: "default",
});

const galleryVideoModules = import.meta.glob("./assets/gallery/videos/*.{mp4,webm,ogg,mov}", {
  eager: true,
  import: "default",
});

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LogoWindIcon({ className = "" }) {
  return (
    <g className={className}>
      <circle cx="0" cy="0" r="17" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M-9 -5H4C10 -5 10 -12 4 -12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M-11 2H8C14 2 14 9 8 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M-7 9H0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function LogoShieldIcon({ className = "" }) {
  return (
    <g className={className}>
      <circle cx="0" cy="0" r="17" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M0 -11L10 -7V1C10 8 5 12 0 15C-5 12 -10 8 -10 1V-7L0 -11Z" fill="currentColor" opacity="0.18" />
      <path d="M-7 1L-2 6L8 -6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
}

function LogoSupportIcon({ className = "" }) {
  return (
    <g className={className}>
      <circle cx="0" cy="0" r="17" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M-10 1V-2C-10 -10 -4 -14 0 -14C4 -14 10 -10 10 -2V1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M-12 1V9H-7V1H-12ZM7 1V9H12V1H7Z" fill="currentColor" />
      <path d="M8 12C4 15 -2 15 -6 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  );
}

function MagicTouchLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 420 430" fill="none" aria-hidden="true">
      <path
        d="M82 146C96 63 198 30 292 74"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M118 148L174 94L230 148"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M134 148V188H204"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M166 132H181M166 149H181M188 132H203M188 149H203"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M120 180C181 205 258 203 342 169"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M176 158C237 157 256 103 352 102"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M184 183C246 182 274 133 370 128"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path d="M286 71L294 91L314 99L294 107L286 127L278 107L258 99L278 91L286 71Z" fill="currentColor" />
      <path d="M347 42L354 60L372 67L354 74L347 92L340 74L322 67L340 60L347 42Z" fill="currentColor" opacity="0.85" />
      <path d="M238 95L243 108L256 113L243 118L238 131L233 118L220 113L233 108L238 95Z" fill="currentColor" opacity="0.75" />

      <text x="210" y="235" textAnchor="middle" fill="currentColor" fontFamily="Georgia, serif" fontSize="46" fontWeight="700" letterSpacing="8">
        MAGIC TOUCH
      </text>
      <line x1="34" y1="268" x2="84" y2="268" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <text x="210" y="278" textAnchor="middle" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="700" letterSpacing="18">
        AIR CARE
      </text>
      <line x1="336" y1="268" x2="386" y2="268" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <text x="210" y="306" textAnchor="middle" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="700" letterSpacing="6">
        AIR &amp; DUCT CLEANING EXPERTS
      </text>
      <g transform="translate(65 344)">
        <LogoWindIcon />
        <text x="34" y="-3" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="800" letterSpacing="1.5">CLEANER AIR</text>
      </g>
      <line x1="150" y1="325" x2="150" y2="370" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <g transform="translate(210 344)">
        <LogoShieldIcon />
        <text x="34" y="-8" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="800" letterSpacing="1.5">HEALTHIER</text>
        <text x="34" y="9" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="800" letterSpacing="1.5">HOME</text>
      </g>
      <line x1="296" y1="325" x2="296" y2="370" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <g transform="translate(342 344)">
        <LogoSupportIcon />
        <text x="26" y="-8" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="800" letterSpacing="1">ALWAYS HERE</text>
        <text x="26" y="8" fill="currentColor" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="800" letterSpacing="1">FOR YOU</text>
      </g>
      <path d="M86 397C139 424 281 424 334 397" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
      <text x="210" y="402" textAnchor="middle" fill="currentColor" fontFamily="Brush Script MT, Segoe Script, cursive" fontSize="21">
        We clean the air you breathe.
      </text>
    </svg>
  );
}

function Button({ children, className = "", variant = "default", type = "button", ...props }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 disabled:pointer-events-none disabled:opacity-50";
  const styles =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
      : "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700";

  return (
    <button type={type} className={cx(base, styles, className)} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

const businessInfo = {
  businessName: "Magic Touch Air Care",
  phone: "888-2294777",
  email: "Magictouchaircare@gmail.com",
  serviceArea: "Your City & Nearby Areas",
  location: "Los Angeles, CA",
  heroBadge: "Professional Air Duct Cleaning Services",
  heroTitle: "Breathe Cleaner Air in Your Home Today",
  heroSubtitle: "Improve indoor air quality, reduce dust, and keep your HVAC system running efficiently with trusted residential air duct cleaning.",
  footerText: "© 2026 Magic Touch Air Care. All rights reserved.",
};

const cleaningParticles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 10 + Math.random() * 24,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 4,
}));

const floatingLeaves = [
  { left: "8%", top: "18%", size: 26, delay: 0, duration: 7 },
  { left: "78%", top: "16%", size: 34, delay: 1.2, duration: 8 },
  { left: "88%", top: "58%", size: 24, delay: 0.6, duration: 6.5 },
  { left: "18%", top: "72%", size: 30, delay: 1.8, duration: 7.5 },
  { left: "48%", top: "10%", size: 22, delay: 2.2, duration: 6.8 },
];

const defaultReviews = [
  { name: "Sarah M.", rating: 5, quote: "The difference was noticeable right away. Less dust and the house feels fresher." },
  { name: "James R.", rating: 5, quote: "Professional, on time, and very clean. The team explained everything clearly." },
  { name: "Olivia K.", rating: 5, quote: "Great service and fair pricing. I would definitely recommend them." },
];

function fileNameToTitle(path) {
  const fileName = path.split("/").pop()?.replace(/\.[^/.]+$/, "") || "Project media";
  return fileName
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const galleryMedia = [
  ...Object.entries(galleryImageModules)
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
    .map(([path, src]) => ({
      type: "image",
      src,
      alt: `${fileNameToTitle(path)} air duct cleaning project`,
      title: fileNameToTitle(path),
      description: "Photo from a recent residential air duct cleaning job.",
    })),
  ...Object.entries(galleryVideoModules)
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
    .map(([path, src]) => ({
      type: "video",
      src,
      poster: heroImage,
      alt: `${fileNameToTitle(path)} air duct cleaning video`,
      title: fileNameToTitle(path),
      description: "Muted project video from our air duct cleaning work.",
    })),
];

const visibleGalleryMedia = galleryMedia.length
  ? galleryMedia
  : [{
      type: "image",
      src: heroImage,
      alt: "Technician preparing professional duct cleaning equipment",
      title: "Add Gallery Media",
      description: "Add images to src/assets/gallery/images or videos to src/assets/gallery/videos.",
    }];

function sanitizeText(value, maxLength = 160) {
  return String(value || "")
    .replaceAll("<", "")
    .replaceAll(">", "")
    .split("")
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code === 10 || code === 13 || code === 9 || code >= 32;
    })
    .join("")
    .trim()
    .slice(0, maxLength);
}

function onlyDigits(value, maxLength = 15) {
  return String(value || "")
    .split("")
    .filter((char) => char >= "0" && char <= "9")
    .join("")
    .slice(0, maxLength);
}

function isValidEmail(value) {
  const email = String(value || "").trim();
  return email.length <= 80 && email.includes("@") && email.includes(".") && !email.includes(" ");
}

function getInitialReviews() {
  if (typeof window === "undefined") return defaultReviews;

  try {
    const saved = window.localStorage.getItem("airDuctReviews");
    if (!saved) return defaultReviews;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return defaultReviews;
    const safeReviews = parsed.slice(0, 20).map((review) => ({
      name: sanitizeText(review.name, 50),
      rating: Math.min(5, Math.max(1, Number(review.rating) || 5)),
      quote: sanitizeText(review.quote, 220),
    })).filter((review) => review.name && review.quote);
    return safeReviews.length ? safeReviews : defaultReviews;
  } catch {
    window.localStorage.removeItem("airDuctReviews");
    return defaultReviews;
  }
}

export default function AirDuctCleaningLandingPage() {
  const { businessName, phone, email, serviceArea, location, heroBadge, heroTitle, heroSubtitle, footerText } = businessInfo;
  const cleanPhone = useMemo(() => onlyDigits(phone), [phone]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviews, setReviews] = useState(getInitialReviews);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, quote: "" });
  const [reviewStatus, setReviewStatus] = useState("");
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [leadStatus, setLeadStatus] = useState("");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [expandedGalleryItem, setExpandedGalleryItem] = useState(null);
  const [isGalleryVideoPlaying, setIsGalleryVideoPlaying] = useState(false);
  const galleryVideoRef = useRef(null);
  const activeGalleryItem = visibleGalleryMedia[activeGalleryIndex];
  const goToPreviousGalleryItem = () => {
    setActiveGalleryIndex((index) => (index === 0 ? visibleGalleryMedia.length - 1 : index - 1));
  };
  const goToNextGalleryItem = () => {
    setActiveGalleryIndex((index) => (index === visibleGalleryMedia.length - 1 ? 0 : index + 1));
  };

  useEffect(() => {
    try {
      window.localStorage.setItem("airDuctReviews", JSON.stringify(reviews.slice(0, 20)));
    } catch {
      // localStorage may be unavailable in private mode.
    }
  }, [reviews]);

  useEffect(() => {
    if (!expandedGalleryItem) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setExpandedGalleryItem(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedGalleryItem]);

  const playActiveGalleryVideo = () => {
    galleryVideoRef.current?.play();
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const name = sanitizeText(reviewForm.name, 50);
    const quote = sanitizeText(reviewForm.quote, 220);
    const rating = Math.min(5, Math.max(1, Number(reviewForm.rating) || 5));

    if (!name || !quote) {
      setReviewStatus("Please add your name and review.");
      return;
    }

    setReviews([{ name, rating, quote }, ...reviews].slice(0, 20));
    setReviewForm({ name: "", rating: 5, quote: "" });
    setReviewStatus("Thank you! Your review was saved in this browser.");
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    const safeLead = {
      name: sanitizeText(leadForm.name, 60),
      phone: sanitizeText(leadForm.phone, 25),
      email: sanitizeText(leadForm.email, 80),
      message: sanitizeText(leadForm.message, 400),
    };

    if (!safeLead.name || !safeLead.phone) {
      setLeadStatus("Please enter your name and phone number.");
      return;
    }

    if (safeLead.email && !isValidEmail(safeLead.email)) {
      setLeadStatus("Please enter a valid email address.");
      return;
    }

    try {
      setLeadStatus("Sending your request...");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(safeLead),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setLeadStatus(result?.error || "Something went wrong. Please try again.");
        return;
      }

      setLeadStatus("Thank you! Your request was sent successfully.");
      setLeadForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setLeadStatus("Something went wrong. Please try again.");
    }
  };

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#benefits", label: "Benefits" },
    { href: "#gallery", label: "Gallery" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-emerald-50/60 to-white text-slate-900">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-90" aria-hidden="true">
        {cleaningParticles.map((particle) => (
          <motion.div
            key={`global-clean-${particle.id}`}
            className="absolute rounded-full bg-gradient-to-br from-white/95 via-emerald-300/80 to-lime-200/55 shadow-[0_0_34px_rgba(16,185,129,0.55)] backdrop-blur-sm ring-1 ring-emerald-200/60"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size * 1.35,
              height: particle.size * 1.35,
            }}
            initial={{ opacity: 0, scale: 0.2, y: 0, x: 0 }}
            animate={{
              opacity: [0.1, 0.95, 0.18],
              scale: [0.4, 1.9, 0.75],
              y: [0, -260],
              x: [0, Math.sin(particle.id) * 90],
            }}
            transition={{
              duration: particle.duration + 2,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute inset-y-0 -left-1/3 w-[45%] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-3xl"
          animate={{ x: ["0%", "260%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {floatingLeaves.map((leaf, index) => (
          <motion.div
            key={`global-leaf-${index}`}
            className="absolute text-emerald-500/75 drop-shadow-[0_0_18px_rgba(16,185,129,0.55)]"
            style={{ left: leaf.left, top: leaf.top }}
            initial={{ y: 0, rotate: -8, opacity: 0.18 }}
            animate={{ y: [-18, 28, -18], rotate: [-14, 14, -14], opacity: [0.35, 0.95, 0.35], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: leaf.duration + 2, delay: leaf.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Leaf size={leaf.size * 1.35} />
          </motion.div>
        ))}
      </div>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">Skip to main content</a>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <a href="#main-content" className="flex items-center gap-3 text-emerald-700" aria-label={`${businessName} home`}>
            <span className="flex h-20 w-32 shrink-0 items-center justify-center sm:h-24 sm:w-40">
              <MagicTouchLogo className="h-full w-full drop-shadow-[0_8px_18px_rgba(4,120,87,0.18)]" />
            </span>
            <span className="text-base font-bold tracking-tight text-slate-950 sm:text-lg">{businessName}</span>
          </a>

          <div className="hidden items-center gap-2 rounded-3xl bg-emerald-50/80 p-2 ring-1 ring-emerald-100 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-white hover:text-emerald-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 lg:px-5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a href={`tel:${cleanPhone}`}><Button className="rounded-2xl px-5 py-5 text-base"><Phone className="mr-2 h-4 w-4" aria-hidden="true" /> Call Now</Button></a>
          </div>

          <button type="button" className="rounded-xl p-2 text-slate-700 md:hidden" aria-label="Toggle menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}><Menu aria-hidden="true" /></button>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-3">
              {navLinks.map((link) => <a key={link.href} href={link.href} className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-slate-700 ring-1 ring-emerald-100 hover:bg-white hover:text-emerald-700 hover:shadow-sm" onClick={() => setMobileMenuOpen(false)}>{link.label}</a>)}
              <a href={`tel:${cleanPhone}`} className="rounded-xl bg-emerald-600 px-3 py-3 text-center text-sm font-bold text-white">Call Now</a>
            </div>
          </div>
        )}
      </header>

      <section id="main-content" className="relative z-10 overflow-hidden bg-gradient-to-br from-white/75 via-emerald-50/55 to-green-100/55 backdrop-blur-[1px]">
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl" aria-hidden="true" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-green-200/50 blur-3xl" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">{heroBadge}</p>
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">{heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#contact"><Button className="w-full rounded-2xl px-8 py-6 text-base sm:w-auto">Get a Free Quote</Button></a>
              <a href={`tel:${cleanPhone}`}><Button variant="outline" className="w-full rounded-2xl border-slate-300 bg-white px-8 py-6 text-base sm:w-auto"><Phone className="mr-2 h-4 w-4" aria-hidden="true" /> {phone}</Button></a>
            </div>
            <ul className="mt-8 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-3" aria-label="Service highlights">
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-700" aria-hidden="true" /> Same-week service</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-700" aria-hidden="true" /> Licensed technicians</li>
              <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-700" aria-hidden="true" /> No hidden fees</li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }} className="relative">
            <motion.div
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-r from-emerald-300/30 via-lime-200/30 to-green-300/30 blur-2xl"
              animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.98, 1.04, 0.98] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-5 shadow-2xl ring-1 ring-emerald-100">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.28),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(132,204,22,0.22),transparent_32%)]" aria-hidden="true" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 p-5 text-white">
                <motion.div
                  className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/25"
                  animate={{ scale: [0.9, 1.12, 0.9], opacity: [0.35, 0.85, 0.35] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.45, 0.8, 0.45] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-200">Home Air Refresh</p>
                      <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Magic Touch Clean Zone</h2>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/12 text-emerald-200 ring-1 ring-white/15">
                      <Sparkles size={24} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-white/10 p-6 shadow-[0_0_70px_rgba(16,185,129,0.35)] ring-1 ring-white/15 sm:h-52 sm:w-52">
                      <motion.div
                        className="absolute inset-3 rounded-full border-4 border-emerald-300 border-t-lime-200 sm:inset-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                        aria-hidden="true"
                      />
                      <div className="relative z-10 max-w-32 text-center sm:max-w-36">
                        <p className="text-2xl font-black leading-tight text-white sm:text-3xl">Clean Air<br />Pros</p>
                        <p className="mx-auto mt-2 max-w-28 text-[10px] font-bold uppercase leading-4 tracking-wide text-emerald-200 sm:max-w-32">Built for fresher homes</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                    {[
                      { icon: Wind, label: "Ducts" },
                      { icon: Home, label: "Vents" },
                      { icon: ShieldCheck, label: "HVAC" },
                      { icon: Sparkles, label: "Chimney" },
                      { icon: Leaf, label: "Attic" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/10 backdrop-blur">
                        <item.icon className="mx-auto h-5 w-5 text-emerald-200" aria-hidden="true" />
                        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-white">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Our Services</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Cleaner air, safer systems, and a fresher home</h2><p className="mt-4 text-lg text-slate-600">From ducts and vents to chimneys and attic insulation, we help remove buildup where it hides and support a cleaner, more comfortable home.</p></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Wind, title: "Air Duct Cleaning", text: "We clean supply and return ducts to remove dust, debris, and buildup that can circulate through your home. Cleaner ductwork helps improve airflow and gives your HVAC system a fresher path to work through." },
            { icon: Home, title: "Vent & Register Cleaning", text: "We detail vents, registers, and grilles so the visible parts of your airflow system look clean again. It is a simple upgrade that helps each room feel fresher and better maintained." },
            { icon: ShieldCheck, title: "HVAC System Care", text: "We focus on the airflow areas around your HVAC system where dust and debris can collect over time. This helps support smoother performance and keeps your system care connected to the duct cleaning process." },
            { icon: Sparkles, title: "Chimney Cleaning", text: "We remove soot, ash, and debris from the chimney system to help your fireplace vent more cleanly. Regular chimney cleaning supports safer seasonal use and can help reduce smoke and odor problems." },
            { icon: Leaf, title: "Attic Cleaning and Insulation", text: "We clean attic spaces by removing dust, debris, and old unwanted material that can affect comfort and air quality. When needed, we can refresh insulation to help your home stay cleaner and more energy efficient." },
          ].map((item) => <Card key={item.title} className="rounded-3xl border-slate-200 bg-white shadow-sm"><CardContent className="p-7"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><item.icon aria-hidden="true" /></div><h3 className="text-xl font-bold text-slate-950">{item.title}</h3><p className="mt-3 leading-7 text-slate-600">{item.text}</p></CardContent></Card>)}
        </div>
      </section>

      <section id="benefits" className="relative z-10 bg-white/72 py-16 backdrop-blur-[1px]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Why Clean Your Ducts?</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Small service, big difference</h2><p className="mt-5 text-lg leading-8 text-slate-600">Over time, air ducts can collect dust, pet hair, pollen, and debris. Professional cleaning helps your home feel fresher and supports better airflow.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{["Reduce household dust", "Improve indoor freshness", "Support HVAC efficiency", "Help with pet hair buildup", "Remove debris from vents", "Professional inspection included"].map((benefit) => <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" /><span className="font-medium text-slate-700">{benefit}</span></div>)}</div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="grid gap-6 md:grid-cols-3">{[{ icon: Clock, title: "Fast Scheduling", text: "Book a convenient appointment with quick response times." }, { icon: ShieldCheck, title: "Trusted Technicians", text: "Professional, respectful service from trained cleaners." }, { icon: Star, title: "Satisfaction Focused", text: "Clear communication, clean work, and reliable results." }].map((item) => <div key={item.title} className="rounded-3xl bg-emerald-900 p-7 text-white shadow-lg"><item.icon className="mb-5 h-8 w-8 text-emerald-300" aria-hidden="true" /><h3 className="text-xl font-bold">{item.title}</h3><p className="mt-3 leading-7 text-emerald-100">{item.text}</p></div>)}</div></section>

      <section id="gallery" className="relative z-10 bg-white/72 py-16 backdrop-blur-[1px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Gallery</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Our Work</h2>
            <p className="mt-4 text-lg text-slate-600">A quick look at clean setups, careful duct work, and finished details from residential jobs.</p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl ring-1 ring-emerald-100">
              <motion.div
                key={`${activeGalleryItem.type}-${activeGalleryIndex}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="aspect-[16/10] min-h-[18rem] bg-slate-950 sm:min-h-[26rem]"
              >
                {activeGalleryItem.type === "video" ? (
                  <div key={`video-${activeGalleryIndex}`} className="relative h-full w-full">
                    <video
                      ref={galleryVideoRef}
                      className="h-full w-full object-contain"
                      src={activeGalleryItem.src}
                      poster={activeGalleryItem.poster}
                      muted
                      playsInline
                      controls
                      preload="metadata"
                      aria-label={activeGalleryItem.alt}
                      onLoadedMetadata={() => setIsGalleryVideoPlaying(false)}
                      onPlay={() => setIsGalleryVideoPlaying(true)}
                      onPause={() => setIsGalleryVideoPlaying(false)}
                      onEnded={() => setIsGalleryVideoPlaying(false)}
                    />
                    {!isGalleryVideoPlaying && (
                      <button
                        type="button"
                        onClick={playActiveGalleryVideo}
                        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-[0_18px_45px_rgba(15,23,42,0.5)] ring-8 ring-slate-950/25 transition hover:scale-105 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                        aria-label={`Play ${activeGalleryItem.title}`}
                      >
                        <Play className="ml-1 h-9 w-9 fill-current" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setExpandedGalleryItem(activeGalleryItem)}
                    className="flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-emerald-200"
                    aria-label={`Expand ${activeGalleryItem.title}`}
                  >
                    <img
                      src={activeGalleryItem.src}
                      alt={activeGalleryItem.alt}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </button>
                )}
              </motion.div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent p-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">{activeGalleryItem.type === "video" ? "Video" : "Photo"}</p>
                <h3 className="mt-2 text-2xl font-bold">{activeGalleryItem.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-100">{activeGalleryItem.description}</p>
              </div>

              <button
                type="button"
                onClick={goToPreviousGalleryItem}
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-[0_14px_36px_rgba(15,23,42,0.45)] ring-4 ring-slate-950/20 transition hover:scale-105 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                aria-label="Previous gallery item"
              >
                <ChevronLeft className="h-7 w-7" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goToNextGalleryItem}
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-[0_14px_36px_rgba(15,23,42,0.45)] ring-4 ring-slate-950/20 transition hover:scale-105 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                aria-label="Next gallery item"
              >
                <ChevronRight className="h-7 w-7" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setExpandedGalleryItem(activeGalleryItem)}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-slate-900 shadow-lg transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                aria-label={`Expand ${activeGalleryItem.title}`}
              >
                <Maximize2 className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2" aria-label="Gallery pagination">
              {visibleGalleryMedia.map((item, index) => (
                <button
                  key={`gallery-dot-${item.title}`}
                  type="button"
                  onClick={() => setActiveGalleryIndex(index)}
                  className={cx(
                    "h-3 rounded-full transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200",
                    index === activeGalleryIndex ? "w-8 bg-emerald-600" : "w-3 bg-slate-300 hover:bg-emerald-300"
                  )}
                  aria-label={`Go to gallery item ${index + 1}`}
                  aria-current={index === activeGalleryIndex ? "true" : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="relative z-10 bg-emerald-50/72 py-16 backdrop-blur-[1px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Customer Reviews</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Homeowners trust our clean air service</h2><p className="mt-4 text-lg text-slate-600">Demo reviews are stored locally in the browser. For production, connect to a secure backend and approve reviews before publishing.</p></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">{reviews.slice(0, 6).map((review, index) => <Card key={`${review.name}-${index}`} className="rounded-3xl border-emerald-100 bg-white shadow-sm"><CardContent className="p-7"><div className="mb-4 flex gap-1 text-lime-500" aria-label={`${review.rating} star rating`}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`h-5 w-5 ${star <= review.rating ? "fill-current" : ""}`} aria-hidden="true" />)}</div><p className="leading-7 text-slate-700">“{review.quote}”</p><p className="mt-5 font-bold text-slate-950">{review.name}</p></CardContent></Card>)}</div>
          <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
            <h3 className="text-2xl font-bold text-slate-950">Leave a Review</h3><p className="mt-2 text-slate-600">This demo does not publish HTML and does not execute user input.</p>
            <form onSubmit={handleReviewSubmit} className="mt-6 grid gap-4" aria-label="Leave a review">
              <div><label htmlFor="review-name" className="mb-2 block text-sm font-semibold text-slate-700">Your name</label><input id="review-name" name="review-name" type="text" maxLength={50} value={reviewForm.name} onChange={(event) => setReviewForm({ ...reviewForm, name: event.target.value })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" required /></div>
              <div><label htmlFor="review-rating" className="mb-2 block text-sm font-semibold text-slate-700">Rating</label><select id="review-rating" name="review-rating" value={reviewForm.rating} onChange={(event) => setReviewForm({ ...reviewForm, rating: Number(event.target.value) })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"><option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option><option value={2}>2 Stars</option><option value={1}>1 Star</option></select></div>
              <div><label htmlFor="review-message" className="mb-2 block text-sm font-semibold text-slate-700">Review</label><textarea id="review-message" name="review-message" rows={4} maxLength={220} value={reviewForm.quote} onChange={(event) => setReviewForm({ ...reviewForm, quote: event.target.value })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" required /></div>
              <Button type="submit" className="rounded-2xl py-6 text-base">Submit Review</Button>{reviewStatus && <p className="text-sm font-medium text-slate-600" role="status">{reviewStatus}</p>}
            </form>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[3rem] opacity-40" aria-hidden="true">
          {cleaningParticles.slice(0, 20).map((particle) => (
            <motion.div
              key={`contact-${particle.id}`}
              className="absolute rounded-full bg-gradient-to-br from-white/60 via-emerald-300/35 to-lime-200/15 shadow-[0_0_12px_rgba(16,185,129,0.18)] backdrop-blur-sm"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size * 0.7,
                height: particle.size * 0.7,
              }}
              initial={{ opacity: 0, scale: 0.2, y: 0, x: 0 }}
              animate={{
                opacity: [0, 0.35, 0.03],
                scale: [0.2, 1.3, 0.4],
                y: [0, -160],
                x: [0, Math.sin(particle.id) * 70],
              }}
              transition={{
                duration: particle.duration + 1,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="absolute inset-y-0 -left-1/3 w-[55%] bg-gradient-to-r from-transparent via-emerald-100/20 to-transparent blur-3xl"
            animate={{ x: ["0%", "220%"] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
          />

          {floatingLeaves.slice(0, 3).map((leaf, index) => (
            <motion.div
              key={`contact-leaf-${index}`}
              className="absolute text-emerald-500/20 drop-shadow-[0_0_8px_rgba(16,185,129,0.12)]"
              style={{ left: leaf.left, top: leaf.top }}
              initial={{ y: 0, rotate: -8, opacity: 0.2 }}
              animate={{
                y: [-12, 18, -12],
                rotate: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: leaf.duration + 1,
                delay: leaf.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Leaf size={leaf.size * 0.8} />
            </motion.div>
          ))}
        </div>
        <div className="relative z-10 grid gap-10 rounded-[2rem] bg-white/95 p-6 shadow-xl ring-1 ring-slate-200 backdrop-blur-sm md:grid-cols-2 md:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Free Quote</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Ready for cleaner air?</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Fill out the form and we’ll contact you shortly with pricing and availability in {serviceArea}.</p>

            <div className="mt-8 rounded-3xl bg-slate-50 p-6">
              <p className="font-bold text-slate-950">Prefer to call?</p>
              <div className="mt-2 flex flex-col gap-2">
                <a href={`tel:${cleanPhone}`} className="inline-flex items-center text-lg font-bold text-emerald-700 hover:text-emerald-900"><Phone className="mr-2 h-5 w-5" aria-hidden="true" /> {phone}</a>
                <a href={`mailto:${email}`} className="inline-flex items-center text-base font-semibold text-slate-700 hover:text-emerald-700"><Mail className="mr-2 h-4 w-4" aria-hidden="true" /> {email}</a>
                <p className="inline-flex items-center text-base font-semibold text-slate-700"><MapPin className="mr-2 h-4 w-4 text-emerald-700" aria-hidden="true" /> {location}</p>
              </div>
            </div>

            <div className="mt-5 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Payment Options</p>
              <div className="mt-4 flex flex-wrap items-center gap-3" aria-label="Accepted payment methods">
                <span className="flex h-10 w-16 items-center justify-center rounded-md bg-white text-lg font-black italic tracking-tight text-blue-800 shadow-sm ring-1 ring-slate-200" aria-label="Visa">VISA</span>
                <span className="relative flex h-10 w-16 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-slate-200" aria-label="Mastercard">
                  <span className="h-7 w-7 rounded-full bg-red-500" />
                  <span className="-ml-3 h-7 w-7 rounded-full bg-amber-400 mix-blend-multiply" />
                </span>
                <span className="flex h-10 w-20 items-center justify-center rounded-md bg-white px-2 text-center text-[10px] font-black uppercase leading-3 text-blue-700 shadow-sm ring-1 ring-slate-200" aria-label="American Express">American<br />Express</span>
                <span className="flex h-10 w-14 items-center justify-center rounded-md bg-emerald-700 text-2xl font-black text-white shadow-sm ring-1 ring-emerald-800" aria-label="Cash">$</span>
                <span className="flex h-10 w-20 items-center justify-center rounded-md bg-white px-2 shadow-sm ring-1 ring-slate-200" aria-label="Check">
                  <span className="w-full border-t-2 border-blue-300 pt-1 text-right text-xs font-semibold italic text-blue-500">Check</span>
                </span>
                <span className="flex h-10 w-20 items-center justify-center rounded-md bg-white text-lg font-black tracking-tight text-sky-600 shadow-sm ring-1 ring-slate-200" aria-label="Venmo">venmo</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleLeadSubmit} className="grid gap-4" aria-label="Request a free quote">
            <div><label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-700">Full name</label><input id="name" name="name" type="text" autoComplete="name" maxLength={60} value={leadForm.name} onChange={(event) => setLeadForm({ ...leadForm, name: event.target.value })} required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" /></div>
            <div><label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={25} value={leadForm.phone} onChange={(event) => setLeadForm({ ...leadForm, phone: event.target.value })} required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" /></div>
            <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={80} value={leadForm.email} onChange={(event) => setLeadForm({ ...leadForm, email: event.target.value })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" /></div>
            <div><label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">Message</label><textarea id="message" name="message" rows={4} maxLength={400} value={leadForm.message} onChange={(event) => setLeadForm({ ...leadForm, message: event.target.value })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100" placeholder="Tell us about your home, number of vents, or preferred appointment time." /></div>
            <Button type="submit" className="rounded-2xl py-6 text-base">Request My Free Quote</Button><p className="text-sm text-slate-500">By submitting, you agree to be contacted about your request.</p>{leadStatus && <p className="text-sm font-medium text-slate-600" role="status">{leadStatus}</p>}
          </form>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200 bg-white/75 py-8 backdrop-blur-[1px]"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><p>{footerText}</p><div className="flex gap-5"><a href="#services" className="hover:text-emerald-700">Services</a><a href="#contact" className="hover:text-emerald-700">Contact</a><a href={`tel:${cleanPhone}`} className="hover:text-emerald-700">Call Now</a></div></div></footer>

      {expandedGalleryItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={expandedGalleryItem.title}
          onClick={() => setExpandedGalleryItem(null)}
        >
          <div className="relative flex h-full w-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setExpandedGalleryItem(null)}
              className="absolute right-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
              aria-label="Close expanded gallery item"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {expandedGalleryItem.type === "video" ? (
              <video
                className="max-h-[88vh] max-w-full rounded-2xl bg-black object-contain shadow-2xl"
                src={expandedGalleryItem.src}
                poster={expandedGalleryItem.poster}
                muted
                playsInline
                controls
                autoPlay
                aria-label={expandedGalleryItem.alt}
              />
            ) : (
              <img
                src={expandedGalleryItem.src}
                alt={expandedGalleryItem.alt}
                className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}

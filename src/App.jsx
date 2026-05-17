import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, CheckCircle, Wind, ShieldCheck, Clock, Star, Sparkles, Home, Menu, MessageCircle, Leaf, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
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
  businessName: "FreshFlow Duct Cleaning",
  phone: "805-265-3032",
  email: "info@freshflowducts.com",
  whatsapp: "805-265-3032",
  serviceArea: "Your City & Nearby Areas",
  location: "Los Angeles, CA",
  heroBadge: "Professional Air Duct Cleaning Services",
  heroTitle: "Breathe Cleaner Air in Your Home Today",
  heroSubtitle: "Improve indoor air quality, reduce dust, and keep your HVAC system running efficiently with trusted residential air duct cleaning.",
  footerText: "© 2026 FreshFlow Duct Cleaning. All rights reserved.",
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
  const { businessName, phone, email, whatsapp, serviceArea, location, heroBadge, heroTitle, heroSubtitle, footerText } = businessInfo;
  const cleanPhone = useMemo(() => onlyDigits(phone), [phone]);
  const cleanWhatsapp = useMemo(() => onlyDigits(whatsapp), [whatsapp]);
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}`;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviews, setReviews] = useState(getInitialReviews);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, quote: "" });
  const [reviewStatus, setReviewStatus] = useState("");
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [leadStatus, setLeadStatus] = useState("");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
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
        setLeadStatus("Something went wrong. Please try again.");
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
          <a href="#main-content" className="flex items-center gap-2 font-bold tracking-tight text-slate-950" aria-label={`${businessName} home`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><Wind size={22} aria-hidden="true" /></span>
            <span>{businessName}</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => <a key={link.href} href={link.href} className="text-sm font-medium text-slate-700 hover:text-emerald-700">{link.label}</a>)}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><Button variant="outline" className="rounded-2xl border-slate-300 px-5 py-5 text-base"><MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp</Button></a>
            <a href={`tel:${cleanPhone}`}><Button className="rounded-2xl px-5 py-5 text-base"><Phone className="mr-2 h-4 w-4" aria-hidden="true" /> Call Now</Button></a>
          </div>

          <button type="button" className="rounded-xl p-2 text-slate-700 md:hidden" aria-label="Toggle menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}><Menu aria-hidden="true" /></button>
        </nav>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-3">
              {navLinks.map((link) => <a key={link.href} href={link.href} className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => setMobileMenuOpen(false)}>{link.label}</a>)}
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
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><Button variant="outline" className="w-full rounded-2xl border-slate-300 bg-white px-8 py-6 text-base sm:w-auto">WhatsApp Us</Button></a>
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
            <div className="relative rounded-[2rem] bg-white p-4 shadow-2xl ring-1 ring-emerald-100">
              <div className="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-emerald-100 via-white to-slate-100 p-6">
                <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-emerald-100 bg-white/70 p-6 backdrop-blur">
                  <div>
                    <motion.div
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-lg"
                      animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles size={30} aria-hidden="true" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-slate-950">Cleaner ducts. Cleaner air.</h2>
                    <p className="mt-3 text-slate-700">Deep cleaning for vents, ducts, returns, and HVAC airflow pathways.</p>
                    <div className="mt-6 h-3 overflow-hidden rounded-full bg-emerald-100">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-400 to-green-500"
                        initial={{ x: "-100%" }}
                        animate={{ x: ["-100%", "120%"] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-3xl font-extrabold text-emerald-700">98%</p><p className="text-sm text-slate-600">Customer satisfaction</p></div><div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-3xl font-extrabold text-emerald-700">24h</p><p className="text-sm text-slate-600">Fast response</p></div></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Our Services</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Complete air duct cleaning for a healthier home</h2><p className="mt-4 text-lg text-slate-600">We remove dust buildup, debris, odors, and airflow blockages using professional-grade equipment.</p></div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[{ icon: Wind, title: "Air Duct Cleaning", text: "Deep cleaning of supply and return ducts to help reduce dust and improve airflow." }, { icon: Home, title: "Vent & Register Cleaning", text: "Careful cleaning of vents, registers, and grilles throughout your home." }, { icon: ShieldCheck, title: "HVAC System Care", text: "Support better HVAC performance with cleaner airflow pathways and fewer contaminants." }].map((item) => <Card key={item.title} className="rounded-3xl border-slate-200 bg-white shadow-sm"><CardContent className="p-7"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><item.icon aria-hidden="true" /></div><h3 className="text-xl font-bold text-slate-950">{item.title}</h3><p className="mt-3 leading-7 text-slate-600">{item.text}</p></CardContent></Card>)}
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

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl ring-1 ring-emerald-100">
              <motion.div
                key={`${activeGalleryItem.type}-${activeGalleryIndex}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="aspect-[16/10] min-h-[18rem] sm:min-h-[26rem]"
              >
                {activeGalleryItem.type === "video" ? (
                  <video
                    className="h-full w-full object-cover"
                    src={activeGalleryItem.src}
                    poster={activeGalleryItem.poster}
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    aria-label={activeGalleryItem.alt}
                  />
                ) : (
                  <img
                    src={activeGalleryItem.src}
                    alt={activeGalleryItem.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
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
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-slate-900 shadow-lg transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                aria-label="Previous gallery item"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goToNextGalleryItem}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-slate-900 shadow-lg transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                aria-label="Next gallery item"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="rounded-[2rem] bg-emerald-950 p-6 text-white shadow-xl">
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-200">Project Slides</p>
              <div className="mt-5 grid gap-3">
                {visibleGalleryMedia.map((item, index) => (
                  <button
                    key={`${item.title}-${index}`}
                    type="button"
                    onClick={() => setActiveGalleryIndex(index)}
                    className={cx(
                      "rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200",
                      index === activeGalleryIndex
                        ? "border-emerald-300 bg-white text-slate-950"
                        : "border-white/15 bg-white/8 text-emerald-50 hover:border-emerald-300/70 hover:bg-white/12"
                    )}
                    aria-current={index === activeGalleryIndex ? "true" : undefined}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">{item.type}</span>
                    <span className="mt-1 block text-base font-bold">{item.title}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-2" aria-label="Gallery pagination">
                {visibleGalleryMedia.map((item, index) => (
                  <button
                    key={`gallery-dot-${item.title}`}
                    type="button"
                    onClick={() => setActiveGalleryIndex(index)}
                    className={cx(
                      "h-3 rounded-full transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200",
                      index === activeGalleryIndex ? "w-8 bg-emerald-300" : "w-3 bg-white/35 hover:bg-white/70"
                    )}
                    aria-label={`Go to gallery item ${index + 1}`}
                    aria-current={index === activeGalleryIndex ? "true" : undefined}
                  />
                ))}
              </div>
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
          <div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Free Quote</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Ready for cleaner air?</h2><p className="mt-4 text-lg leading-8 text-slate-600">Fill out the form and we’ll contact you shortly with pricing and availability in {serviceArea}.</p><div className="mt-8 rounded-3xl bg-slate-50 p-6"><p className="font-bold text-slate-950">Prefer to call?</p><div className="mt-2 flex flex-col gap-2"><a href={`tel:${cleanPhone}`} className="inline-flex items-center text-lg font-bold text-emerald-700 hover:text-emerald-900"><Phone className="mr-2 h-5 w-5" aria-hidden="true" /> {phone}</a><a href={`mailto:${email}`} className="inline-flex items-center text-base font-semibold text-slate-700 hover:text-emerald-700"><Mail className="mr-2 h-4 w-4" aria-hidden="true" /> {email}</a><p className="inline-flex items-center text-base font-semibold text-slate-700"><MapPin className="mr-2 h-4 w-4 text-emerald-700" aria-hidden="true" /> {location}</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-base font-semibold text-slate-700 hover:text-emerald-700"><MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Message us on WhatsApp</a></div></div></div>
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
    </main>
  );
}

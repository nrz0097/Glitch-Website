"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, MapPin, MessageCircle, Clock, HelpCircle, PhoneCall, Languages, Coffee, Menu, ChevronDown, ChevronUp, Bike, Package, ThumbsUp, Snowflake, Flame, UtensilsCrossed, Download, FileText } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const translations = {
  en: {
    navPhilosophy: "Philosophy",
    navMenu: "Menu",
    navMerch: "Merch",
    navGallery: "Gallery",
    navLocation: "Location",
    navOrder: "Order",
    heroEst: "Established 2024",
    heroHeadline: "Step Into\nThe Static",
    heroDesc: "No need to dress up, no need to keep up appearances. Here is a place to pause for a moment from the world's noise. Sit down, enjoy your coffee, and just be yourself.",
    heroCaffeineBoost: "Get your caffeine boost",
    orderWhatsApp: "Order via WhatsApp",
    checkLocation: "Check Location",
    phiTitle: "Handcrafted.\nUnexpected.\nYours.",
    phiLabel: "Philosophy — 01",
    phiDesc: "We celebrate the imperfections. The glitches in the everyday routine. Our open-air space is designed for authentic connections and raw experiences. No filters needed.",
    menuSig1: "Signature — 01",
    menuSig2: "Signature — 02",
    menuDesc1: "Our signature sweet and salty escape. Rich butterscotch meeting perfectly whipping cream and extracted espresso, finished with a hint of sea salt.",
    menuDesc2: "Pure. Bold. Intense. Single origin beans crafted to reveal rich, dark notes with zero acidity and a clean, powerful finish. This is coffee at its rawest.",
    menuFull: "The Full Static",
    menuEssentials: "Menu Essentials",
    menuShowMore: "Expand Menu",
    menuShowLess: "Collapse Menu",
    downloadMenuPdf: "Download PDF Menu",
    deliveryTitle: "Bring the glitch home",
    deliveryHours: "Tuesday - Sunday 15:00 — 23:00",
    bottleTitle: "GLITCH MODULE",
    bottleDesc: "Enjoy Glitch Coffee in every format. Engineered for delivery, ready on demand. Available in 250 ml and 1 Liter bottle formats.",
    joinPO: "ORDER NOW!",
    merchPO: "SOON!",
    limitedStock: "LIMITED PER PRODUCTION CYCLE",
    merchTitle: "The Glitch Gear",
    merchLabel: "Limited Drop — 02",
    merchDesc: "Wear the static. Our exclusive merchandise is designed for those who embrace the unexpected and live authentically.",
    capturedMoments: "Captured Moments",
    followUs: "Follow @glitchcoffee.id",
    eventTitle: "Your Event,\nOur Vibe.",
    eventDesc: "Looking for a venue with character? We host everything from intimate weddings, office gatherings, to community workshops.",
    contactEvent: "Contact Admin",
    commonQueries: "Common Queries",
    faqOpTitle: "Operational Hours",
    faqOpContent: "Tuesday - Sunday: 15:00 - 23:00",
    faqOrderTitle: "Order Methods",
    faqOrderContent: "Dine-in, Takeaway, WhatsApp Delivery, GoFood, & ShopeeFood.",
    faqSeatTitle: "Seating Capacity",
    faqSeatContent: "We have a spacious semi-outdoor area, perfect for hanging out (30-40 pax).",
    footerHeadline: "THIS IS YOUR GLITCH MOMENT.",
    footerAddress: "Jl. Mulawarman No. 170 Rt. 24, Manggar\nBalikpapan Timur",
    footerRights: "© 2026 GLITCH COFFEE. ALL RIGHTS RESERVED."
  },
  id: {
    navPhilosophy: "Filosofi",
    navMenu: "Menu",
    navMerch: "Merch",
    navGallery: "Galeri",
    navLocation: "Lokasi",
    navOrder: "Pesan",
    heroEst: "Sejak 2024",
    heroHeadline: "Step Into\nThe Static",
    heroDesc: "Gak perlu dandan rapi, gak perlu jaga imej. Di sini tempatnya buat jeda sebentar dari bisingnya dunia. Duduk, nikmatin kopi, dan jadi diri sendiri aja.",
    heroCaffeineBoost: "Dapatkan asupan kafeinmu",
    orderWhatsApp: "Pesan via WhatsApp",
    checkLocation: "Cek Lokasi",
    phiTitle: "Handcrafted.\nUnexpected.\nYours.",
    phiLabel: "Filosofi — 01",
    phiDesc: "Kami merayakan ketidaksempurnaan. 'Glitch' dalam rutinitas sehari-hari. Ruang terbuka kami dirancang untuk koneksi otentik dan pengalaman murni. Tanpa filter.",
    menuSig1: "Signature — 01",
    menuSig2: "Signature — 02",
    menuDesc1: "Pelarian manis dan asin khas kami. Butterscotch kaya rasa berpadu dengan espresso yang diekstrak sempurna, diakhiri dengan sentuhan garam laut.",
    menuDesc2: "Murni. Berani. Intens. Biji kopi single origin yang dikurasi untuk menonjolkan rasa bold dan dark, tanpa rasa asam, dengan finish yang bersih dan kuat. Inilah kopi dalam bentuknya yang paling jujur.",
    menuFull: "The Full Static",
    menuEssentials: "Esensi Menu",
    menuShowMore: "Lihat Semua",
    menuShowLess: "Tutup Menu",
    downloadMenuPdf: "Unduh Menu PDF",
    deliveryTitle: "Bawa pulang glitch-mu",
    deliveryHours: "Selasa - Minggu 15:00 — 23:00",
    bottleTitle: "GLITCH MODUL",
    bottleDesc: "Nikmati Glitch Coffee di setiap format. Dirancang untuk pengiriman, siap on-demand. Kini varian 250 ml dan varian besar (1 Liter) sudah tersedia.",
    joinPO: "PESAN SEKARANG!",
    merchPO: "SEGERA!",
    limitedStock: "PRODUKSI TERBATAS PER BATCH",
    merchTitle: "The Glitch Gear",
    merchLabel: "Rilisan Terbatas — 02",
    merchDesc: "Pakai static-mu. Merchandise eksklusif kami dirancang untuk mereka yang merayakan ketidakterdugaan dan hidup murni.",
    capturedMoments: "Momen Tertangkap",
    followUs: "Ikuti @glitchcoffee.id",
    eventTitle: "Acara Anda,\nVibe Kami.",
    eventDesc: "Mencari tempat dengan karakter? Kami melayani segalanya mulai dari pernikahan intim, kumpul kantor, hingga lokakarya komunitas.",
    contactEvent: "Hubungi Admin",
    commonQueries: "Pertanyaan Umum",
    faqOpTitle: "Jam Operasional",
    faqOpContent: "Selasa - Minggu: 15.00 - 23.00",
    faqOrderTitle: "Metode Pemesanan",
    faqOrderContent: "Dine-in, Takeaway, WhatsApp Delivery, GoFood, & ShopeeFood.",
    faqSeatTitle: "Kapasitas Tempat Duduk",
    faqSeatContent: "Kami punya area semi-outdoor yang cukup luas, cocok buat nongkrong rame-rame (30-40 pax).",
    footerHeadline: "INI MOMEN GLITCH KAMU.",
    footerAddress: "Jl. Mulawarman no. 170 Rt. 24, manggar\nBalikpapan Timur",
    footerRights: "© 2026 GLITCH COFFEE. HAK CIPTA DILINDUNGI."
  }
};

interface MenuItem {
  name: string;
  desc?: string;
  price: string;
  recommended?: boolean;
  type?: "cold" | "hot" | "snack";
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    category: "MILK BLEND COFFEE",
    items: [
      { name: "White Glitch", desc: "Kopi Susu Klasik", price: "18K", recommended: true, type: "cold" },
      { name: "Tropica Static", desc: "Kopi Susu Kelapa", price: "18K", type: "cold" },
      { name: "Bit Berry", desc: "Kopi Susu Stroberi", price: "18K", type: "cold" },
      { name: "Brown Signal", desc: "Kopi Susu Aren", price: "18K", type: "cold" },
      { name: "Golden Delay", desc: "Kopi Susu Karamel", price: "21K", type: "cold" },
      { name: "Soft Byte", desc: "Kopi Susu Vanila", price: "21K", type: "cold" },
      { name: "Bloom Sign", desc: "Kopi Susu Jasmine", price: "21K", type: "cold" },
      { name: "Pandan Drift", desc: "Kopi Susu Pandan", price: "21K", type: "cold" },
      { name: "Sunny Peel", desc: "Kopi Susu Pisang", price: "21K", type: "cold" },
      { name: "Nut Stream", desc: "Kopi Susu Hazelnut", price: "21K", type: "cold" },
      { name: "Mocha Tide", desc: "Kopi Susu Mocha Seasalt", price: "21K", type: "cold" },
      { name: "Mangolier", desc: "Kopi Susu Mango Sticky Rice", price: "21K", type: "cold" },
      { name: "Monswift", desc: "Kopi Susu Cinnamon", price: "23K", type: "cold" },
      { name: "Cheesecode", desc: "Kopi Susu Cream Cheese", price: "23K", type: "cold" },
      { name: "Buttersync", desc: "Kopi Susu Butterscotch", price: "23K", recommended: true, type: "cold" },
      { name: "Sweetflow", desc: "Kopi Susu Caramel Macchiato", price: "23K", type: "cold" },
    ]
  },
  {
    category: "NOIR COFFEE SERIES",
    items: [
      { name: "Ice Black", desc: "Single Shot Americano", price: "18K", type: "cold" },
      { name: "Long Black", desc: "Double Shot Americano", price: "24K", type: "cold" },
      { name: "Black Shift", desc: "Peach/Leci Americano", price: "22K", type: "cold" },
      { name: "Vietnam Drip", desc: "Kopi Susu Vietnam", price: "20K", type: "hot" },
      { name: "Shakerato", desc: "Espresso Lemonade", price: "21K", type: "cold" },
      { name: "Honey Fizz", desc: "Espresso Madu Soda", price: "21K", type: "cold" },
      { name: "Peach Wave", desc: "Espresso Jeruk Peach", price: "22K", type: "cold" },
      { name: "Berry Comb", desc: "Espresso Berry Madu", price: "22K", type: "cold" },
    ]
  },
  {
    category: "NON COFFEE SERIES",
    items: [
      { name: "Dark Error", desc: "Coklat", price: "18K", type: "cold" },
      { name: "Hazel Core", desc: "Coklat Hazelnut", price: "21K", type: "cold" },
      { name: "Amber Echo", desc: "Coklat Karamel", price: "21K", type: "cold" },
      { name: "Berry Patch", desc: "Susu Stroberi Jam", price: "21K", type: "cold" },
      { name: "Red Glint", desc: "Red Velvet", price: "21K", type: "cold" },
      { name: "Green Pulse", desc: "Matcha", price: "23K", type: "cold" },
      { name: "Regal Phase", desc: "Susu Regal", price: "22K", type: "cold" },
      { name: "Banana Cloud", desc: "Susu Pisang Creamy", price: "22K", type: "cold" },
      { name: "Lychee-T", desc: "Teh Leci", price: "19K", type: "cold" },
      { name: "Pixelade Blue", desc: "Leci Soda", price: "21K", type: "cold" },
      { name: "Air Mineral", price: "6K" },
    ]
  },
  {
    category: "SNACK / MAKANAN",
    items: [
      { name: "Tahu Bakso", price: "18K", type: "snack" },
      { name: "Kentang Goreng", price: "22K", type: "snack" },
      { name: "Mix Platter", price: "25K", type: "snack" },
    ]
  }
];

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`grid-line-h w-full ${className}`}>
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 min-h-[100px]">
      {children}
    </div>
  </section>
);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function GlitchCoffeeLanding() {
  const [lang, setLang] = useState<"en" | "id">("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const t = translations[lang];

  const IG_LINK = "https://www.instagram.com/glitchcoffee.id/";
  const WA_ORDER_LINK = "https://wa.me/6289527539529?text=Halo%20kak%2C%20aku%20mau%20order%20Glitch%20Coffee%20nya%20dong!";
  const WA_PO_LINK = "https://wa.me/6289527539529?text=Halo%20kak%2C%20aku%20mau%20order%20Glitch%20Module%20(250ml%20%2F%201%20Liter)%20dong!";
  const GOFOOD_LINK = "https://gofood.co.id/balikpapan/restaurant/toko-kopi-glitch-coffee-stadion-batakan--f5005098-6a23-40fe-8b0e-79b0126191b6";
  const SHOPEE_LINK = "https://shopee.co.id/now-food/shop/22328224?deep_and_deferred=1&shareChannel=copy_link&stm_medium=referral&stm_source=https%3A%2F%2Flnk.bio%2F-rw&uls_trackid=54vtd5gl00pv";
  const WA_EVENT_LINK = "https://wa.me/6289527539529?text=Halo%20kak%2C%20aku%20mau%20tanya-tanya%20untuk%20event%20dong!";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const NavLinks = () => (
    <>
      <a href="#philosophy" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-muted-foreground transition-colors uppercase font-code tracking-tight">{t.navPhilosophy}</a>
      <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-muted-foreground transition-colors uppercase font-code tracking-tight">{t.navMenu}</a>
      <a href="#merchandise" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-muted-foreground transition-colors uppercase font-code tracking-tight">{t.navMerch}</a>
      <a href="#delivery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-muted-foreground transition-colors uppercase font-code tracking-tight">{t.navOrder}</a>
      <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-muted-foreground transition-colors uppercase font-code tracking-tight">{t.navGallery}</a>
      <a href="#location" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-muted-foreground transition-colors uppercase font-code tracking-tight">{t.navLocation}</a>
    </>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <main className="min-h-screen bg-black overflow-x-hidden">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 grid-line-h">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12">
            <div className="col-span-4 p-6 grid-line-v flex items-center justify-between md:justify-start">
              <a href="#hero" className="flex items-center h-8 md:h-10">
                <Image
                  src="/logo.png"
                  alt="Glitch Coffee Logo"
                  width={200}
                  height={60}
                  className="h-full w-auto object-contain"
                  priority
                />
              </a>
              <div className="md:hidden flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLang(lang === "en" ? "id" : "en")}
                  className="font-code text-xs uppercase p-0 h-auto hover:bg-transparent flex items-center gap-2"
                >
                  {lang === "en" ? "ID" : "EN"}
                </Button>
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="p-0 h-auto w-auto hover:bg-transparent">
                      <Menu className="w-6 h-6 text-white" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-black border-l border-[#333] text-white p-12">
                    <SheetHeader className="text-left mb-8">
                      <SheetTitle className="text-white uppercase font-headline">Navigation</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-8 font-code text-lg">
                      <NavLinks />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <nav className="col-span-8 p-6 hidden md:flex justify-end gap-6 items-center font-code text-xs">
              <NavLinks />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLang(lang === "en" ? "id" : "en")}
                className="font-code text-xs uppercase p-0 h-auto hover:bg-transparent flex items-center gap-2"
              >
                <Languages className="w-3 h-3" />
                {lang === "en" ? "ID" : "EN"}
              </Button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <Section id="hero" className="pt-24 md:pt-32 min-h-screen flex items-center">
          <div className="col-span-12 md:col-span-8 p-8 md:p-16 flex flex-col justify-center grid-line-v">
            <motion.div {...fadeIn}>
              <span className="font-code text-xs text-muted-foreground uppercase tracking-widest mb-4 block">{t.heroEst}</span>
              <h1 className="font-headline font-black text-6xl md:text-9xl tracking-tighter uppercase leading-[0.85] mb-8 whitespace-pre-line glitch-headline">
                {t.heroHeadline}
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mb-12">
                {t.heroDesc}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#delivery">
                  <Button variant="outline" className="rounded-none border-white hover:bg-white hover:text-black font-code uppercase px-8 h-12 transition-colors">
                    <Coffee className="mr-2 h-4 w-4" /> {t.heroCaffeineBoost}
                  </Button>
                </a>
                <a href="#location">
                  <Button variant="secondary" className="rounded-none font-code uppercase px-8 h-12 transition-colors">
                    <MapPin className="mr-2 h-4 w-4" /> {t.checkLocation}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
          <div className="col-span-12 md:col-span-4 p-8 flex items-center justify-center bg-[#111]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative w-full aspect-square overflow-hidden"
            >
              <Image
                src="/images/hero-coffee.jpg"
                alt="Hero Coffee"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </Section>

        {/* Philosophy Section */}
        <Section id="philosophy">
          <div className="col-span-12 md:col-span-4 p-8 md:p-16 grid-line-v flex flex-col justify-between">
            <motion.h3 {...fadeIn} className="font-headline font-black text-3xl uppercase whitespace-pre-line">{t.phiTitle}</motion.h3>
            <div className="font-code text-xs text-muted-foreground uppercase mt-8">{t.phiLabel}</div>
          </div>
          <div className="col-span-12 md:col-span-8 p-8 md:p-16 flex flex-col justify-center">
            <motion.p {...fadeIn} className="font-body text-2xl md:text-4xl leading-tight">
              {t.phiDesc}
            </motion.p>
          </div>
        </Section>

        {/* Product Deep Dive - SIGNATURE SECTION */}
        <Section>
          <div className="col-span-12 md:col-span-6 p-0 grid-line-v">
            <div className="p-8 md:p-16 grid-line-h">
              <span className="font-code text-xs text-muted-foreground uppercase mb-4 block">{t.menuSig1}</span>
              <h4 className="font-headline font-black text-4xl uppercase mb-4">Buttersync</h4>
              <p className="font-body text-muted-foreground mb-8">
                {t.menuDesc1}
              </p>
              <span className="font-code text-xl">IDR 23.000</span>
            </div>
            <div className="relative aspect-video overflow-hidden transition-all duration-500">
              <Image
                src="/images/butterscotch.jpg"
                alt="Butterscotch"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 p-0">
            <div className="p-8 md:p-16 grid-line-h">
              <span className="font-code text-xs text-muted-foreground uppercase mb-4 block">{t.menuSig2}</span>
              <h4 className="font-headline font-black text-4xl uppercase mb-4">Ice Black</h4>
              <p className="font-body text-muted-foreground mb-8">
                {t.menuDesc2}
              </p>
              <span className="font-code text-xl">IDR 18.000</span>
            </div>
            <div className="relative aspect-video overflow-hidden transition-all duration-500">
              <Image
                src="/images/americano.jpg"
                alt="Ice Black"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </Section>

        {/* Additional Menu List - Essentials */}
        <Section id="menu">
          <div className="col-span-12 p-8 md:p-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4 pb-6 border-b border-[#333]">
              <div>
                <h3 className="font-headline font-black text-4xl md:text-5xl uppercase">{t.menuFull}</h3>
                <span className="font-code text-xs text-muted-foreground uppercase">{t.menuEssentials}</span>
              </div>
              <a
                href="/menu-glitch-coffee.pdf"
                download="Glitch-Coffee-Menu.pdf"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  className="rounded-none border-white/20 hover:border-white hover:bg-white hover:text-black font-code uppercase text-xs h-11 px-5 transition-all flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t.downloadMenuPdf}
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {menuData.map((cat, catIdx) => (
                <div key={catIdx} className="flex flex-col gap-4">
                  <h4 className="font-headline text-lg text-muted-foreground border-b border-[#333] pb-2 mb-2">{cat.category}</h4>
                  <div className="flex flex-col gap-1">
                    {(isMenuExpanded ? cat.items : cat.items.slice(0, 4)).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start py-3 border-b border-[#333]/30 hover:bg-white/5 transition-colors px-2 font-body group"
                      >
                        <div className="flex flex-col pr-4">
                          <div className="flex items-center gap-2">
                            <span className="uppercase font-bold tracking-tight text-sm md:text-base group-hover:text-white transition-colors">
                              {item.name}
                            </span>
                            {item.recommended && (
                              <span className="inline-flex items-center gap-1 text-[9px] bg-white text-black font-code px-1.5 py-0.5 font-bold uppercase tracking-wider">
                                <ThumbsUp className="w-2.5 h-2.5 fill-black" /> Best
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <span className="font-code text-xs text-muted-foreground/80 mt-0.5 tracking-tight">
                              --. {item.desc}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 font-code text-sm shrink-0 pt-0.5">
                          <span className="font-medium text-white/90">{item.price}</span>
                          {item.type === "cold" && (
                            <Snowflake className="w-3.5 h-3.5 text-sky-400/80" />
                          )}
                          {item.type === "hot" && (
                            <Flame className="w-3.5 h-3.5 text-amber-500/90" />
                          )}
                          {item.type === "snack" && (
                            <UtensilsCrossed className="w-3.5 h-3.5 text-zinc-400/80" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-wrap justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsMenuExpanded(!isMenuExpanded)}
                className="rounded-none border-white/20 hover:border-white font-code uppercase px-8 md:px-12 h-14 transition-all"
              >
                {isMenuExpanded ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
                {isMenuExpanded ? t.menuShowLess : t.menuShowMore}
              </Button>
              <a
                href="/menu-glitch-coffee.pdf"
                download="Glitch-Coffee-Menu.pdf"
              >
                <Button
                  variant="default"
                  className="bg-white text-black hover:bg-zinc-200 rounded-none border border-white font-code uppercase px-8 h-14 transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t.downloadMenuPdf}
                </Button>
              </a>
            </div>
          </div>
        </Section>

        {/* Online Delivery & Bottle Series */}
        <Section id="delivery">
          <div className="col-span-12 md:col-span-6 p-8 md:p-16 grid-line-v flex flex-col justify-between">
            <div>
              <h3 className="font-headline font-black text-4xl uppercase mb-8">{t.deliveryTitle}</h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <a href={GOFOOD_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="rounded-none font-code uppercase h-14 w-full border-white/20 hover:border-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                      <Bike className="w-4 h-4" /> GoFood
                    </Button>
                  </a>
                  <a href={SHOPEE_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="rounded-none font-code uppercase h-14 w-full border-white/20 hover:border-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                      <Bike className="w-4 h-4" /> ShopeeFood
                    </Button>
                  </a>
                </div>
                <a href={WA_ORDER_LINK} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-none font-code uppercase h-14 w-full border-white/20 hover:border-white hover:bg-white hover:text-black transition-all">
                    <MessageCircle className="mr-2 h-4 w-4" /> {t.orderWhatsApp}
                  </Button>
                </a>
              </div>
            </div>
            <p className="font-code text-xs text-muted-foreground uppercase mt-12 tracking-widest flex items-center">
              <Clock className="w-3 h-3 mr-2" /> {t.deliveryHours}
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 p-8 md:p-16 flex flex-col justify-between bg-white text-black relative overflow-hidden">
            {/* Minimalist Bottle Illustration Overlay */}
            <svg className="absolute bottom-0 right-0 w-32 h-64 text-black/25 -mr-8 -mb-16 pointer-events-none opacity-60" viewBox="0 0 100 200" fill="currentColor">
              <path d="M30 20 L70 20 L70 50 L85 70 L85 180 L15 180 L15 70 L30 50 Z" />
              <rect x="35" y="10" width="30" height="10" />
            </svg>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-code text-[11px] bg-black text-white px-2 py-0.5 uppercase tracking-wider font-semibold">Ready Stock</span>
                <span className="font-code text-[11px] text-black/60 uppercase tracking-wider">Take-Home Series</span>
              </div>
              <h3 className="font-headline font-black text-4xl uppercase mb-3">{t.bottleTitle}</h3>
              <p className="font-body mb-6 text-black/80">
                {t.bottleDesc}
              </p>

              {/* Volume Options Badges */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="border border-black/20 p-3 bg-black/[0.03] flex flex-col justify-between">
                  <span className="font-headline font-black text-base md:text-lg">250 ML</span>
                  <span className="font-code text-[10px] text-black/60 uppercase tracking-tight">Personal Dose • Ready</span>
                </div>
                <div className="border-2 border-black p-3 bg-black text-white flex flex-col justify-between relative shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="font-headline font-black text-base md:text-lg">1 LITER</span>
                    <span className="text-[9px] bg-white text-black font-code font-bold px-1.5 py-0.5 uppercase tracking-wider">Ready</span>
                  </div>
                  <span className="font-code text-[10px] text-zinc-300 uppercase tracking-tight mt-1">Varian Besar • Tersedia</span>
                </div>
              </div>

              <a href={WA_PO_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="bg-black text-white hover:bg-zinc-800 rounded-none font-code uppercase w-full h-14 transition-colors">
                  {t.joinPO}
                </Button>
              </a>
            </div>
            <span className="font-code text-xs uppercase mt-12 block text-center relative z-10">{t.limitedStock}</span>
          </div>
        </Section>

        {/* Merchandise Section */}
        <Section id="merchandise">
          <div className="col-span-12 md:col-span-4 p-8 md:p-16 grid-line-v flex flex-col justify-between bg-[#080808]">
            <motion.div {...fadeIn}>
              <span className="font-code text-xs text-muted-foreground uppercase tracking-widest mb-4 block">{t.merchLabel}</span>
              <h3 className="font-headline font-black text-4xl uppercase mb-8 whitespace-pre-line">{t.merchTitle}</h3>
              <p className="font-body text-muted-foreground mb-8">
                {t.merchDesc}
              </p>
            </motion.div>
            <div className="mt-8">
              <a href={WA_PO_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-none border-white/20 hover:border-white font-code uppercase px-8 h-12 transition-all flex items-center gap-2">
                  <Package className="w-4 h-4" /> {t.merchPO}
                </Button>
              </a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-8 p-8 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 0.98 }}
                  className="relative aspect-[3/4] bg-[#111] overflow-hidden transition-all border border-[#333]/30 group cursor-pointer"
                >
                  {/* Front Image */}
                  <Image
                    src={`/images/merch-${i}-front.jpg`}
                    alt={`Merch ${i} Front`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  {/* Back Image (Hover) */}
                  <Image
                    src={`/images/merch-${i}-back.jpg`}
                    alt={`Merch ${i} Back`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Gallery Section */}
        <Section id="gallery">
          <div className="col-span-12 p-8 md:p-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
              <h3 className="font-headline font-black text-4xl md:text-5xl uppercase">{t.capturedMoments}</h3>
              <a href={IG_LINK} target="_blank" rel="noopener noreferrer" className="font-code text-xs flex items-center hover:underline uppercase">
                <Instagram className="w-4 h-4 mr-2" /> {t.followUs}
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['gallery-1', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5', 'gallery-6', 'hero-coffee', 'americano'].map((id, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 0.98 }}
                  className="relative aspect-square bg-[#111] overflow-hidden transition-all cursor-crosshair"
                >
                  <Image
                    src={`/images/${id}.jpg`}
                    alt={`Gallery ${idx}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Event & Gathering */}
        <Section>
          <div className="col-span-12 md:col-span-4 p-8 md:p-16 grid-line-v flex flex-col justify-center bg-[#111]">
            <h3 className="font-headline font-black text-4xl md:text-5xl uppercase mb-6 leading-none whitespace-pre-line">{t.eventTitle}</h3>
          </div>
          <div className="col-span-12 md:col-span-8 p-8 md:p-16 flex flex-col justify-center">
            <p className="font-body text-xl md:text-2xl mb-12">
              {t.eventDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WA_EVENT_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-none font-code uppercase px-8 h-12 flex items-center gap-2 border-white/20 hover:border-white hover:bg-white hover:text-black transition-all">
                  <PhoneCall className="w-4 h-4" /> {t.contactEvent}
                </Button>
              </a>
            </div>
          </div>
        </Section>

        {/* Location & FAQ */}
        <Section id="location">
          <div className="col-span-12 md:col-span-7 grid-line-v min-h-[300px] md:min-h-[400px]">
            <div className="relative w-full h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.825264356877!2d116.94825909951066!3d-1.236624933906585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df1490064d5c5f3%3A0xab3ae5f90f00daaf!2sGLITCH%20COFFEE!5e0!3m2!1sid!2sid!4v1771649451092!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '300px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 p-8 md:p-16 bg-black">
            <div className="flex items-center gap-2 mb-8">
              <HelpCircle className="w-5 h-5" />
              <h3 className="font-headline font-black text-2xl uppercase">{t.commonQueries}</h3>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-[#333]">
                <AccordionTrigger className="font-headline text-sm uppercase hover:no-underline py-6 text-left">{t.faqOpTitle}</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-6 whitespace-pre-line">
                  {t.faqOpContent}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-[#333]">
                <AccordionTrigger className="font-headline text-sm uppercase hover:no-underline py-6 text-left">{t.faqOrderTitle}</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-6 whitespace-pre-line">
                  {t.faqOrderContent}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-[#333]">
                <AccordionTrigger className="font-headline text-sm uppercase hover:no-underline py-6 text-left">{t.faqSeatTitle}</AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-6 whitespace-pre-line">
                  {t.faqSeatContent}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Section>

        {/* Footer */}
        <footer className="w-full bg-black text-white pt-24 pb-12 border-t border-[#333]">
          <div className="max-w-[1440px] mx-auto px-8 md:px-16 text-center">
            <div className="flex flex-col items-center mb-16">
              <h2 className="font-headline font-black text-xs md:text-sm tracking-[0.2em] uppercase mb-12 text-muted-foreground opacity-50">
                {t.footerHeadline}
              </h2>
              <div className="flex flex-col items-center gap-4 font-code text-[10px] uppercase max-w-2xl mx-auto">
                <span className="text-muted-foreground">Location</span>
                <span className="whitespace-pre-line leading-relaxed text-center">{t.footerAddress}</span>
              </div>
            </div>
            <div className="flex flex-col items-center border-t border-[#333] pt-12">
              <span className="font-code text-[10px] text-muted-foreground uppercase tracking-widest text-center">
                {t.footerRights}
              </span>
            </div>
          </div>
        </footer>

        {/* Floating Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-[100] bg-white text-black p-3 rounded-none border border-white hover:bg-black hover:text-white transition-all duration-300 shadow-xl"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </TooltipProvider>
  );
}

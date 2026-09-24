import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Search,
  ShoppingBag,
  Clock,
  Phone,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Heart,
  X,
} from "lucide-react";
import { useState, useRef, useEffect, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/data/products";
import { useStore } from "@/context/store-context";
import { CartDrawer } from "./cart-drawer";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground px-4 py-2 text-center text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
        <Sparkles className="h-3 w-3 text-accent shrink-0" />
        <span>
          Showroom San Carlos, Huancayo · Reserva online y pruébate antes de
          pagar
        </span>
      </div>

      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </div>
  );
}

/* ─── Search Box ─── */
function SearchBox({ onDone }: { onDone?: () => void }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    nav({ to: "/catalogo", search: { q } });
    onDone?.();
  };

  return (
    <form onSubmit={submit} className="relative w-full">
      <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar vestido, blusa o código..."
        className="pl-9 pr-4 h-9 text-xs rounded-full bg-secondary/60 border-border/80 focus:bg-background transition-all"
        aria-label="Buscar productos"
      />
    </form>
  );
}

/* ─── Header ─── */
function Header() {
  const { cartCount, setCartOpen, config } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const prevCount = useRef(cartCount);
  const [popAnim, setPopAnim] = useState(false);

  // Track scroll for sticky shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Pop animation when cart count changes
  useEffect(() => {
    if (cartCount > prevCount.current) {
      setPopAnim(true);
      const timer = setTimeout(() => setPopAnim(false), 500);
      prevCount.current = cartCount;
      return () => clearTimeout(timer);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Main Bar */}
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        {/* Mobile Menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[85%] max-w-xs flex flex-col justify-between p-6"
            >
              <div>
                <SheetHeader className="text-left border-b border-border pb-4">
                  <SheetTitle className="font-display text-2xl font-bold tracking-tight">
                    Valentino Dresses
                  </SheetTitle>
                  <p className="text-xs text-muted-foreground">
                    Moda americana en Huancayo
                  </p>
                </SheetHeader>

                <div className="mt-6">
                  <SearchBox />
                  <nav className="mt-6 grid gap-1">
                    <Link
                      to="/catalogo"
                      search={{ q: "" }}
                      className="menu-link font-medium"
                    >
                      Todo el catálogo
                    </Link>
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        to="/categoria/$slug"
                        params={{ slug: c.slug }}
                        className="menu-link"
                      >
                        {c.name}
                      </Link>
                    ))}
                    <Link
                      to="/catalogo"
                      search={{ q: "ofertas" }}
                      className="menu-link text-primary font-bold"
                    >
                      ⭐ Ofertas Especiales
                    </Link>
                    <Link to="/contacto" className="menu-link">
                      Contacto & Showroom
                    </Link>
                  </nav>
                </div>
              </div>

              <div className="border-t border-border pt-4 text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>San Carlos, Huancayo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span>WhatsApp: {config.whatsapp}</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Search (Left) */}
        <div className="hidden lg:block lg:w-72">
          <SearchBox />
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="min-w-0 text-center flex flex-col items-center group"
        >
          <span className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            Valentino Dresses
          </span>
          <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
            Boutique & Atelier · Huancayo
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-2">
          {/* WhatsApp Desktop */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex text-xs font-medium text-emerald-800 hover:text-emerald-900 hover:bg-emerald-50"
          >
            <a
              href={`https://wa.me/51${config.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("¡Hola Valentino Dresses! Deseo información sobre la tienda.")}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600 mr-1.5" />
              WhatsApp
            </a>
          </Button>

          {/* Cart Button with Pop Animation */}
          <Button
            variant="ghost"
            size="icon"
            className={`relative h-10 w-10 text-foreground hover:bg-secondary ${popAnim ? "cart-pop-anim" : ""}`}
            onClick={() => setCartOpen(true)}
            aria-label={`Bolsa de selección, ${cartCount} productos`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Desktop Category Nav */}
      <nav className="mx-auto hidden max-w-7xl items-center justify-center gap-7 overflow-x-auto border-t border-border/80 px-8 py-2.5 text-[11px] font-semibold tracking-wider uppercase lg:flex">
        <Link
          to="/catalogo"
          search={{ q: "" }}
          className="transition-colors hover:text-primary py-1"
        >
          Todo
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/categoria/$slug"
            params={{ slug: c.slug }}
            className="whitespace-nowrap transition-colors hover:text-primary py-1"
          >
            {c.name}
          </Link>
        ))}
        <Link
          to="/catalogo"
          search={{ q: "ofertas" }}
          className="text-primary font-bold transition-colors hover:opacity-80 py-1 flex items-center gap-1"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary gentle-pulse" />{" "}
          Ofertas
        </Link>
      </nav>
    </header>
  );
}

/* ─── Footer ─── */
function Footer() {
  const { config } = useStore();

  return (
    <footer className="mt-28 bg-secondary/80 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="space-y-3">
          <p className="font-display text-3xl font-bold tracking-tight text-foreground">
            Valentino Dresses
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Huancayo · Perú
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Colección seleccionada de vestidos americanos, blazers, pantalones,
            vestidos de niñas, carteras y calzado de alta calidad.
          </p>
          <div className="pt-2 text-xs text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>RUC: 20568254873</span>
          </div>
        </div>

        {/* Nav */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Atención & Guía
          </h3>
          <nav className="mt-4 grid gap-2.5 text-xs text-muted-foreground">
            <Link
              to="/como-comprar"
              className="hover:text-primary transition-colors"
            >
              Cómo comprar y recoger
            </Link>
            <Link
              to="/cambios"
              className="hover:text-primary transition-colors"
            >
              Políticas de cambios y garantías
            </Link>
            <Link
              to="/terminos"
              className="hover:text-primary transition-colors"
            >
              Términos y condiciones
            </Link>
            <Link
              to="/catalogo"
              search={{ q: "ofertas" }}
              className="hover:text-primary transition-colors font-medium text-primary"
            >
              Precios de liquidación
            </Link>
          </nav>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Visítanos en Huancayo
          </h3>
          <div className="mt-4 space-y-3 text-xs text-muted-foreground">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong className="text-foreground block font-medium">
                  Showroom San Carlos:
                </strong>
                Jr. San José N° 210, 2do Piso, San Carlos – Huancayo
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong className="text-foreground block font-medium">
                  Horario de Atención:
                </strong>
                Lun a Sáb: 9:00 am - 1:00 pm y 3:30 pm - 8:30 pm
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <a
                href={`mailto:${config.email}`}
                className="hover:text-primary transition-colors"
              >
                {config.email}
              </a>
            </div>
          </div>
        </div>

        {/* Payment & Social */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
            Medios de Pago en Tienda
          </h3>
          <p className="mt-2 text-xs text-muted-foreground">
            Aceptamos pagos directos al momento de tu recojo:
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-foreground">
            <span className="px-2 py-1 bg-background rounded border border-border">
              Yape
            </span>
            <span className="px-2 py-1 bg-background rounded border border-border">
              Plin
            </span>
            <span className="px-2 py-1 bg-background rounded border border-border">
              Efectivo
            </span>
            <span className="px-2 py-1 bg-background rounded border border-border">
              Tarjetas VISA/MC
            </span>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mt-6">
            Síguenos en Redes
          </h3>
          <div className="mt-3 flex gap-2">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <a
                href="https://instagram.com/valentinodresses"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <a
                href="https://facebook.com/valentinodresses"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            >
              <a
                href="https://tiktok.com/@valentino.dresses"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
              >
                <span className="font-bold text-xs">T</span>
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <div>
          © 2026 Valentino Dresses · Todos los derechos reservados · San
          Carlos, Huancayo
        </div>
        <div className="mt-2 sm:mt-0 text-[11px] text-muted-foreground flex items-center gap-1">
          <Heart className="h-3 w-3 text-primary" /> Atención personalizada
          por Erika Pantoja
        </div>
      </div>
    </footer>
  );
}

/* ─── Floating WhatsApp ─── */
function FloatingWhatsApp() {
  const { config } = useStore();
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {showTooltip && (
        <div className="hidden md:flex glass-card rounded-full py-2 px-3.5 text-xs text-foreground items-center gap-2 fade-in-up">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>¿Dudas con tu talla? Escríbenos</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="ml-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
      <a
        href={`https://wa.me/51${config.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("¡Hola Erika! Vi la tienda online de Valentino Dresses y deseo hacer una consulta.")}`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn grid h-14 w-14 place-items-center rounded-full shadow-2xl"
        aria-label="Escribir por WhatsApp"
      >
        <span className="text-2xl">💬</span>
      </a>
    </div>
  );
}

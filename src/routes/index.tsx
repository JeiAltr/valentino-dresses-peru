import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  MessageCircle,
  ShoppingBag,
  Store,
  Sparkles,
  Heart,
  MapPin,
  Check,
  Star,
  Shield,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/store/product-card";
import { categories } from "@/data/products";
import { useStore } from "@/context/store-context";

const steps = [
  {
    Icon: ShoppingBag,
    n: "01",
    title: "Elige tus prendas",
    description:
      "Navega nuestra colección americana exclusiva, elige tu talla y color favorito desde cualquier dispositivo.",
  },
  {
    Icon: MessageCircle,
    n: "02",
    title: "Reserva por WhatsApp",
    description:
      "Con un solo clic tu selección se envía al WhatsApp del showroom. Sin pagos anticipados, sin compromisos.",
  },
  {
    Icon: Store,
    n: "03",
    title: "Pruébate y paga en tienda",
    description:
      "Visita nuestro showroom en San Carlos, mídete las prendas en nuestros vestidores y paga solo si te encanta.",
  },
];

const pillars = [
  {
    icon: "👗",
    title: "Prendas Americanas",
    desc: "Importadas con cortes y telas de alta durabilidad. Calce impecable y detalles elegantes.",
  },
  {
    icon: "🏬",
    title: "Showroom Exclusivo",
    desc: "Jr. San José 210, 2do Piso, San Carlos. Ambiente cómodo para probarte todo.",
  },
  {
    icon: "💬",
    title: "Atención Personal",
    desc: "Asesoría directa por WhatsApp con Erika Pantoja para guiarte en tallas y estilos.",
  },
  {
    icon: "💳",
    title: "Cero Riesgo",
    desc: "Reserva online sin cobros. Solo pagas cuando estés 100% satisfecha con tu prenda.",
  },
];

const testimonials = [
  {
    name: "María José R.",
    city: "Huancayo",
    text: "Encontré el vestido perfecto para mi evento. La atención de Erika fue increíble, me ayudó con las medidas por WhatsApp y al llegar a la tienda todo calzó perfecto.",
    rating: 5,
  },
  {
    name: "Carla P.",
    city: "El Tambo",
    text: "Me encanta que puedo ver las prendas online, reservar y probarme en tienda sin presión. Los blazers americanos son de una calidad impresionante.",
    rating: 5,
  },
  {
    name: "Lucía V.",
    city: "San Carlos",
    text: "Compré un vestido para mi hija y uno para mí. Los precios son justos para la calidad que ofrecen. Definitivamente volveré por más prendas.",
    rating: 5,
  },
];

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      {
        title: "Valentino Dresses — Moda Femenina y Exclusiva en Huancayo",
      },
      {
        name: "description",
        content:
          "Vestidos americanos, blusas, blazers, calzado y accesorios en San Carlos, Huancayo. Reserva por WhatsApp y pruébate en showroom.",
      },
      {
        property: "og:title",
        content: "Valentino Dresses — Moda Femenina en Huancayo",
      },
      {
        property: "og:description",
        content:
          "Moda americana seleccionada para ocasiones especiales. Reserva por WhatsApp y pruébate en tienda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { products, config } = useStore();
  const visible = products.filter((p) => p.published);
  const newArrivals = visible.filter((p) => p.isNew).slice(0, 8);
  const saleProducts = visible.filter((p) => p.salePrice).slice(0, 4);

  return (
    <>
      {/* ═══ Hero Section ═══ */}
      <section className="hero-band border-b border-border/80">
        <div className="mx-auto flex min-h-[78vh] max-w-7xl items-center px-5 py-20 lg:px-8">
          <div className="max-w-2xl py-6 fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/90 border border-border px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary mb-6 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Nueva Colección · Primavera / Verano</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.95]">
              Prendas que celebran tu{" "}
              <span className="text-primary">estilo</span> y distinción
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground font-light max-w-xl">
              Moda femenina americana elegida cuidadosamente para ocasiones
              memorables y looks cotidianos. Reserva en línea y pruébatela en
              nuestro showroom.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="font-semibold text-sm px-7 py-6 shadow-lg"
              >
                <Link to="/catalogo" search={{ q: "" }}>
                  Explorar Colección{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold text-sm px-6 py-6 bg-background/80 backdrop-blur"
              >
                <Link to="/contacto">
                  <MapPin className="mr-2 h-4 w-4 text-primary" /> Visitar
                  Showroom
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-border/60 flex flex-wrap gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary font-bold" />
                <span>Pruébatelo antes de pagar</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary font-bold" />
                <span>Tallas desde S hasta XL</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary font-bold" />
                <span>Yape, Plin o Tarjeta</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Marquee Promo Banner ═══ */}
      <div className="promo-banner py-2.5 overflow-hidden">
        <div className="marquee-scroll text-primary-foreground text-[11px] font-semibold uppercase tracking-widest gap-12">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0 pr-12">
              <span className="flex items-center gap-2">
                <Sparkles className="h-3 w-3" /> Envíos a todo el Perú
              </span>
              <span className="flex items-center gap-2">
                <Heart className="h-3 w-3" /> Pruébate antes de pagar
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-3 w-3" /> Cambios hasta 7 días
              </span>
              <span className="flex items-center gap-2">
                <CreditCard className="h-3 w-3" /> Yape · Plin · Tarjetas
              </span>
              <span className="flex items-center gap-2">
                <Store className="h-3 w-3" /> Showroom San Carlos, Huancayo
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ 4 Pilares de la Marca ═══ */}
      <section className="bg-secondary/40 border-b border-border py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="luxury-card p-6"
              >
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Categorías ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Encuentra Tu Prenda Ideal</p>
            <h2>Líneas de la Colección</h2>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/catalogo" search={{ q: "" }}>
              Ver Catálogo Completo{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="scroll-row mt-10">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/categoria/$slug"
              params={{ slug: c.slug }}
              className={`category-tile tone-${i % 6} group relative`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <span className="relative z-10 text-white font-display text-2xl font-bold">
                {c.short}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ Nuevos Ingresos ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 border-t border-border">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recién Llegadas al Showroom</p>
            <h2>Nuevos Ingresos</h2>
          </div>
          <Button
            asChild
            variant="link"
            className="text-primary font-semibold text-xs"
          >
            <Link to="/catalogo" search={{ q: "" }}>
              Ver todas las novedades ({visible.length} prendas)
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* ═══ Ofertas ═══ */}
      {saleProducts.length > 0 && (
        <section className="bg-secondary/60 border-y border-border py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Precios de Temporada</p>
                <h2>Prendas en Liquidación & Oferta</h2>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-primary text-primary font-semibold"
              >
                <Link to="/catalogo" search={{ q: "ofertas" }}>
                  Ver Todas las Ofertas
                </Link>
              </Button>
            </div>

            <div className="mt-10">
              <ProductGrid products={saleProducts} />
            </div>
          </div>
        </section>
      )}

      {/* ═══ Testimonios ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="eyebrow">Lo Que Dicen Nuestras Clientas</p>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mt-2">
            Experiencias Reales
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Cada prenda cuenta una historia. Estas son las experiencias de
            quienes nos visitan en San Carlos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 stagger-children">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="flex items-center gap-1 mb-3 pt-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                "{t.text}"
              </p>
              <div className="mt-4 flex items-center gap-3 pt-3 border-t border-border/60">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Cómo Comprar ═══ */}
      <section className="bg-secondary/30 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="text-center max-w-xl mx-auto">
            <p className="eyebrow">Experiencia Cómoda y Segura</p>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mt-2">
              ¿Cómo comprar?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Elige desde tu celular y ten tus prendas listas cuando visites
              nuestro showroom.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 stagger-children">
            {steps.map(({ Icon, n, title, description }) => (
              <div
                key={n}
                className="relative text-center luxury-card p-8"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary border border-border/80">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mt-6 inline-block text-[11px] font-bold uppercase tracking-widest text-primary font-mono">
                  PASO {n}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Banner Showroom */}
          <div className="mt-16 rounded-2xl promo-banner p-8 md:p-12 text-primary-foreground shadow-xl">
            <div className="grid gap-6 md:grid-cols-[1.5fr_auto] items-center">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-accent">
                  📍 Tu Showroom en San Carlos
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold mt-2">
                  Ven a visitarnos en Huancayo
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/90 max-w-xl leading-relaxed">
                  Estamos en{" "}
                  <strong>
                    Jr. San José N° 210, 2do Piso, San Carlos
                  </strong>
                  . Atendemos de Lunes a Sábado de 9:00 am a 1:00 pm y de
                  3:30 pm a 8:30 pm.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-xs"
                >
                  <a
                    href={`https://wa.me/51${config.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("¡Hola Erika! Deseo coordinar una visita al showroom de San Carlos.")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" /> Coordinar
                    Visita
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

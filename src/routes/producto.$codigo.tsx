import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { 
  Minus, 
  Plus, 
  Share2, 
  Store, 
  ShieldCheck, 
  Ruler, 
  Sparkles, 
  Check, 
  ArrowLeft,
  Clock,
  MapPin,
  MessageCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductArt } from "@/components/store/product-art";
import { ProductGrid } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/data/products";
import { useStore } from "@/context/store-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/producto/$codigo")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.codigo} — Valentino Dresses Huancayo` },
      { name: "description", content: "Detalle de prenda, tallas y colores disponibles en Valentino Dresses, San Carlos." },
      { property: "og:title", content: `${params.codigo} — Valentino Dresses` },
      { property: "og:description", content: "Elige tu talla y color, reserva por WhatsApp y pruébate en nuestro showroom de San Carlos, Huancayo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-28 text-center">
      <h1 className="font-display text-4xl font-semibold">Prenda no encontrada</h1>
      <p className="mt-2 text-muted-foreground text-sm">El producto que buscas ya no está disponible en catálogo.</p>
      <Button asChild className="mt-6">
        <Link to="/catalogo" search={{ q: "" }}>Volver al catálogo</Link>
      </Button>
    </div>
  )
});

function ProductPage() {
  const { codigo } = Route.useParams();
  const { products, addToCart, config } = useStore();
  
  const product = products.find((p) => p.code === codigo && p.published);
  if (!product) throw notFound();

  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const initialSize = availableSizes.find((s) => product.variants.some((v) => v.size === s && v.stock > 0)) ?? availableSizes[0] ?? "";
  
  const [size, setSize] = useState(initialSize);
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [qty, setQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const stock = product.variants.find((v) => v.size === size && v.color === color)?.stock ?? 0;
  const related = products.filter((p) => p.category === product.category && p.code !== product.code && p.published).slice(0, 4);
  const finalPrice = product.salePrice ?? product.price;

  // Enlace de WhatsApp directo para este producto puntual
  const singleWhatsAppMessage = encodeURIComponent(
    `¡Hola Valentino Dresses! 👋\n` +
    `Deseo consultar disponibilidad para reservar y probarme esta prenda en su showroom de San Carlos:\n\n` +
    `👗 *${product.code} ${product.name}*\n` +
    `• Talla: *${size}*\n` +
    `• Color: *${color}*\n` +
    `• Precio: *${formatPrice(finalPrice)}*\n` +
    `📍 Recojo en tienda de San Carlos, Huancayo.\n\n` +
    `¿Tienen stock disponible para pasar a probármela? ¡Muchas gracias!`
  );
  const directWhatsAppUrl = `https://wa.me/51${config.whatsapp.replace(/\D/g, "")}?text=${singleWhatsAppMessage}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
        <span>/</span>
        <Link to="/catalogo" search={{ q: "" }} className="hover:text-primary transition-colors">Catálogo</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      {/* Grid de Detalle */}
      <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
        
        {/* Galería de Imágenes */}
        <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 md:grid-cols-[96px_minmax(0,1fr)]">
          {/* Miniaturas de ángulos */}
          <div className="grid content-start gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={cn(
                  "cursor-pointer rounded-md overflow-hidden aspect-[3/4] border transition-all",
                  activeImageIndex === idx 
                    ? "border-primary ring-2 ring-primary/20 scale-[1.02]" 
                    : "border-border hover:border-primary/50 opacity-80 hover:opacity-100"
                )}
              >
                <ProductArt name="" tone={(product.imageTone + idx) % 6} className="h-full w-full" />
              </div>
            ))}
          </div>

          {/* Imagen Principal */}
          <div className="relative rounded-lg overflow-hidden border border-border shadow-sm aspect-[3/4]">
            <ProductArt name={product.name} tone={(product.imageTone + activeImageIndex) % 6} className="h-full w-full" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.salePrice && <Badge className="bg-primary text-primary-foreground font-semibold">Oferta Especial</Badge>}
              {product.isNew && <Badge variant="secondary" className="border-border">Nuevo Ingreso</Badge>}
            </div>
            <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur px-2.5 py-1 rounded text-[11px] text-muted-foreground font-mono">
              Foto {activeImageIndex + 1} de 4
            </div>
          </div>
        </div>

        {/* Información y Compra */}
        <div className="lg:sticky lg:top-36 lg:self-start space-y-6">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                CÓDIGO: {product.code}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Store className="h-3.5 w-3.5 text-primary" /> Disponible en Showroom
              </span>
            </div>

            <h1 className="mt-2 font-display text-4xl lg:text-5xl font-semibold text-foreground leading-[1.05]">
              {product.name}
            </h1>

            {/* Precios */}
            <div className="mt-4 flex items-baseline gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-primary font-display">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                    Ahorras {formatPrice(product.price - product.salePrice)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-foreground font-display">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>

          <div className="border-t border-border pt-5 space-y-5">
            {/* Selector de Talla */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="label">Selecciona tu Talla:</span>
                <SizeGuideModal category={product.category} />
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((s) => {
                  const hasStock = product.variants.some((v) => v.size === s && v.stock > 0);
                  const isSelected = size === s;
                  return (
                    <button
                      key={s}
                      disabled={!hasStock}
                      onClick={() => setSize(s)}
                      className={cn(
                        "h-10 min-w-10 px-3.5 rounded-md text-xs font-semibold uppercase transition-all border",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : hasStock
                            ? "bg-background text-foreground border-border hover:border-primary/60 hover:bg-secondary/40"
                            : "bg-muted/50 text-muted-foreground border-dashed border-border opacity-50 cursor-not-allowed line-through"
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector de Color */}
            <div>
              <div className="mb-2">
                <span className="label">Color: <strong className="text-foreground font-semibold normal-case">{color}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    title={c}
                    aria-label={`Seleccionar color ${c}`}
                    onClick={() => setColor(c)}
                    className={cn(
                      "color-swatch",
                      `swatch-${i % 5}`,
                      color === c && "ring-2 ring-primary ring-offset-2 scale-105"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Disponibilidad */}
            <div className="rounded-md bg-secondary/50 border border-border p-3 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {stock > 0 ? (
                  <span className="text-foreground font-medium">
                    {stock} {stock === 1 ? "unidad disponible" : "unidades disponibles"} en talla {size}
                  </span>
                ) : (
                  <span className="text-destructive font-medium">Agotado temporalmente en esta combinación</span>
                )}
              </span>
              <span className="text-[11px] text-primary font-semibold">San Carlos, Huancayo</span>
            </div>

            {/* Controles y Botones de Compra */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-3">
                {/* Cantidad */}
                <div className="flex items-center justify-between rounded-md border border-border bg-background px-1 h-11">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Disminuir"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQty(Math.min(stock, qty + 1))}
                    aria-label="Aumentar"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Botón Agregar a Carrito */}
                <Button
                  size="lg"
                  disabled={!stock}
                  className="h-11 font-semibold"
                  onClick={() => {
                    addToCart({
                      code: product.code,
                      name: product.name,
                      price: finalPrice,
                      size,
                      color,
                      quantity: qty
                    });
                    toast.success("¡Prenda añadida a tu selección!");
                  }}
                >
                  Agregar a mi Selección
                </Button>
              </div>

              {/* Botón Compra Directa por WhatsApp */}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full h-11 whatsapp-btn text-white font-semibold flex items-center justify-center gap-2 border-none shadow-md"
              >
                <a href={directWhatsAppUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Consultar y Pedir por WhatsApp esta prenda
                </a>
              </Button>
            </div>
          </div>

          {/* Bloque de Garantías de Boutique */}
          <div className="border-t border-border pt-5 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary shrink-0" />
              <span>Pruébatelo antes de pagar en tienda</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary shrink-0" />
              <span>Confección americana seleccionada</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary shrink-0" />
              <span>Cambios hasta por 7 días</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary shrink-0" />
              <span>Aceptamos Yape, Plin y tarjetas</span>
            </div>
          </div>

          {/* Descripción & Detalles */}
          <div className="border-t border-border pt-5 space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-1">Material y Tejido</h3>
              <p className="text-muted-foreground">{product.material}</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2">Detalles de la prenda</h3>
              <ul className="space-y-1 text-muted-foreground">
                {product.details.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Productos Relacionados */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-border pt-16">
          <div className="section-heading mb-8">
            <div>
              <p className="eyebrow">Selección Especial</p>
              <h2>Prendas que combinan con tu estilo</h2>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/catalogo" search={{ q: "" }}>Ver más</Link>
            </Button>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}

// Modal Completo de Cuadro de Medidas
function SizeGuideModal({ category }: { category: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <Ruler className="h-3.5 w-3.5" />
          <span>Guía de Medidas</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-3xl font-semibold">
            Guía de Tallas y Medidas
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Medidas corporales exactas en centímetros para encontrar tu calce ideal.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="vestidos" className="mt-4">
          <TabsList className="grid grid-cols-3 w-full h-9">
            <TabsTrigger value="vestidos" className="text-xs">Vestidos & Tops</TabsTrigger>
            <TabsTrigger value="pantalones" className="text-xs">Pantalones</TabsTrigger>
            <TabsTrigger value="ninas" className="text-xs">Niñas / Zapatos</TabsTrigger>
          </TabsList>

          {/* Tabla Vestidos y Tops */}
          <TabsContent value="vestidos" className="mt-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-secondary/60 text-foreground font-semibold border-b border-border">
                    <th className="py-2.5 px-3 text-left">Talla</th>
                    <th className="py-2.5 px-2 text-center">Busto (cm)</th>
                    <th className="py-2.5 px-2 text-center">Cintura (cm)</th>
                    <th className="py-2.5 px-2 text-center">Cadera (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["S", "84 – 88", "64 – 68", "90 – 94"],
                    ["M", "88 – 94", "68 – 74", "94 – 100"],
                    ["L", "94 – 100", "74 – 80", "100 – 106"],
                    ["XL", "100 – 108", "80 – 88", "106 – 114"]
                  ].map(([sz, b, c, cd]) => (
                    <tr key={sz} className="hover:bg-secondary/20">
                      <td className="py-2 px-3 font-bold text-primary">{sz}</td>
                      <td className="py-2 px-2 text-center text-muted-foreground">{b}</td>
                      <td className="py-2 px-2 text-center text-muted-foreground">{c}</td>
                      <td className="py-2 px-2 text-center text-muted-foreground">{cd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Tabla Pantalones */}
          <TabsContent value="pantalones" className="mt-4">
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-secondary/60 text-foreground font-semibold border-b border-border">
                    <th className="py-2.5 px-3 text-left">Talla</th>
                    <th className="py-2.5 px-2 text-center">Cintura (cm)</th>
                    <th className="py-2.5 px-2 text-center">Cadera (cm)</th>
                    <th className="py-2.5 px-2 text-center">Largo (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["28 / S", "66 – 70", "92 – 96", "98"],
                    ["30 / M", "70 – 76", "96 – 102", "100"],
                    ["32 / L", "76 – 82", "102 – 108", "102"],
                    ["34 / XL", "82 – 88", "108 – 114", "103"]
                  ].map(([sz, ci, cd, l]) => (
                    <tr key={sz} className="hover:bg-secondary/20">
                      <td className="py-2 px-3 font-bold text-primary">{sz}</td>
                      <td className="py-2 px-2 text-center text-muted-foreground">{ci}</td>
                      <td className="py-2 px-2 text-center text-muted-foreground">{cd}</td>
                      <td className="py-2 px-2 text-center text-muted-foreground">{l}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Tabla Niñas & Zapatos */}
          <TabsContent value="ninas" className="mt-4 space-y-4">
            <div>
              <p className="text-xs font-semibold mb-2 text-foreground">Vestidos para Niñas:</p>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-secondary/60 text-foreground font-semibold border-b border-border">
                      <th className="py-2 px-3 text-left">Talla / Edad</th>
                      <th className="py-2 px-2 text-center">Estatura</th>
                      <th className="py-2 px-2 text-center">Pecho</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ["Talla 4", "98–104 cm", "56 cm"],
                      ["Talla 6", "110–116 cm", "60 cm"],
                      ["Talla 8", "122–128 cm", "64 cm"],
                      ["Talla 10", "134–140 cm", "70 cm"],
                      ["Talla 12", "146–152 cm", "76 cm"]
                    ].map(([t, e, p]) => (
                      <tr key={t}>
                        <td className="py-2 px-3 font-bold text-primary">{t}</td>
                        <td className="py-2 px-2 text-center text-muted-foreground">{e}</td>
                        <td className="py-2 px-2 text-center text-muted-foreground">{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Consejo Boutique */}
        <div className="mt-4 rounded-md bg-secondary/50 border border-border p-3 text-[11px] text-muted-foreground leading-relaxed">
          💡 <strong className="text-foreground">Recuerda:</strong> Al reservar por la web, puedes pasar por nuestro showroom en <strong>Jr. San José N° 210, 2do Piso, San Carlos</strong> y probarte la prenda en nuestros vestidores antes de pagar.
        </div>
      </DialogContent>
    </Dialog>
  );
}

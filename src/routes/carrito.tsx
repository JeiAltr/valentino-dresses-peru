import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Store, ShieldCheck, MapPin, Clock } from "lucide-react";
import { CartContents } from "@/components/store/cart-drawer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Bolsa de Selección — Valentino Dresses Huancayo" },
      { name: "description", content: "Revisa tus prendas seleccionadas y envía tu pedido por WhatsApp para recoger en tienda San Carlos." },
      { property: "og:title", content: "Bolsa de Selección — Valentino Dresses" },
      { property: "og:description", content: "Reserva tus prendas americanas seleccionadas y recógelas en tienda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  }),
  component: CartPage
});

function CartPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      {/* Navegación y Encabezado */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <p className="eyebrow">Tu Selección Exclusiva</p>
          <h1 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mt-1">
            Bolsa de Compras
          </h1>
        </div>
        <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
          <Link to="/catalogo" search={{ q: "" }}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Seguir explorando
          </Link>
        </Button>
      </div>

      {/* Contenido del Carrito */}
      <div className="mt-8 bg-card rounded-xl border border-border p-6 shadow-sm">
        <CartContents />
      </div>

      {/* Bloque Informativo de Confianza de la Tienda */}
      <div className="mt-10 grid gap-6 sm:grid-cols-3 border-t border-border pt-8 text-xs text-muted-foreground">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-secondary p-2 text-primary shrink-0">
            <Store className="h-4 w-4" />
          </div>
          <div>
            <strong className="block text-foreground font-semibold mb-0.5">Recojo en Showroom</strong>
            Jr. San José N° 210, 2do Piso, San Carlos – Huancayo.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-secondary p-2 text-primary shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <strong className="block text-foreground font-semibold mb-0.5">Horarios de Atención</strong>
            Lun a Sáb: 9:00 am - 1:00 pm y 3:30 pm - 8:30 pm.
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="rounded-full bg-secondary p-2 text-primary shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <strong className="block text-foreground font-semibold mb-0.5">Paga al Recoger</strong>
            Aceptamos Yape, Plin, efectivo y tarjetas de débito/crédito.
          </div>
        </div>
      </div>
    </div>
  );
}

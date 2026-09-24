import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Store,
  Clock,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Gift,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatPrice } from "@/data/products";
import { useStore, type CartItem } from "@/context/store-context";

export type CustomerOrderDetails = {
  name: string;
  phone: string;
  pickupTime: string;
  paymentMethod: string;
  notes: string;
};

export function buildWhatsAppUrl(
  items: CartItem[],
  total: number,
  storePhone: string,
  details?: CustomerOrderDetails
) {
  const cleanPhone = storePhone.replace(/\D/g, "");

  const customerName = details?.name?.trim() || "Cliente Web";
  const customerPhone = details?.phone?.trim() || "No especificado";
  const pickupTime =
    details?.pickupTime || "Hoy por la tarde (3:30 pm a 8:30 pm)";
  const paymentMethod =
    details?.paymentMethod || "Yape / Plin en tienda";
  const notes = details?.notes?.trim();

  const lines = items.map((item, index) => {
    return `${index + 1}️⃣ *${item.code} ${item.name}*\n   • Talla: *${item.size}* | Color: *${item.color}*\n   • Cantidad: ${item.quantity} unid.\n   • Subtotal: *${formatPrice(item.price * item.quantity)}*`;
  });

  let message =
    `✨ *NUEVA RESERVA - VALENTINO DRESSES* ✨\n` +
    `📍 *Showroom San Carlos:* Jr. San José N° 210, 2do Piso, Huancayo\n` +
    `──────────────────────────────\n` +
    `👤 *Cliente:* ${customerName}\n` +
    `📱 *WhatsApp:* ${customerPhone}\n` +
    `🕒 *Horario estimado de recojo:* ${pickupTime}\n` +
    `💳 *Preferencia de pago en tienda:* ${paymentMethod}\n` +
    `──────────────────────────────\n\n` +
    `👗 *PRENDAS SOLICITADAS:*\n` +
    `${lines.join("\n\n")}\n\n` +
    `──────────────────────────────\n` +
    `💰 *TOTAL A PAGAR EN TIENDA: ${formatPrice(total)}*\n` +
    `──────────────────────────────\n`;

  if (notes) {
    message += `📝 *Nota especial:* ${notes}\n──────────────────────────────\n`;
  }

  message += `_¡Hola Erika! Vi estas prendas en la web de Valentino Dresses. ¿Podrías confirmarme disponibilidad para pasar por la tienda en San Carlos a probármelas y retirarlas? ¡Muchas gracias!_`;

  return `https://wa.me/51${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function CartContents({ compact = false }: { compact?: boolean }) {
  const {
    cart,
    subtotal,
    updateQuantity,
    removeFromCart,
    config,
    setCartOpen,
  } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupTime, setPickupTime] = useState(
    "Hoy por la tarde (3:30 pm a 8:30 pm)"
  );
  const [paymentMethod, setPaymentMethod] = useState(
    "Yape / Plin en tienda"
  );
  const [customerNotes, setCustomerNotes] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!cart.length) {
    return (
      <div className="grid min-h-[380px] place-items-center text-center px-4">
        <div className="fade-in-up">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary border border-border">
            <ShoppingBag className="h-7 w-7 text-primary" />
          </div>
          <p className="mt-5 font-display text-3xl font-semibold text-foreground">
            Tu selección está vacía
          </p>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Explora nuestra colección americana de vestidos, blusas y calzado
            para tu próxima visita al showroom.
          </p>
          <Button
            className="mt-6 font-medium"
            onClick={() => setCartOpen(false)}
            asChild
          >
            <Link to="/catalogo" search={{ q: "" }}>
              Explorar Catálogo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const orderDetails: CustomerOrderDetails = {
    name: customerName,
    phone: customerPhone,
    pickupTime,
    paymentMethod,
    notes: customerNotes,
  };

  const whatsappUrl = buildWhatsAppUrl(
    cart,
    subtotal,
    config.whatsapp,
    orderDetails
  );

  // Show a free shipping teaser when close to a threshold
  const freeDeliveryThreshold = 350;
  const remaining = freeDeliveryThreshold - subtotal;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Boutique Info Banner */}
      <div className="mb-4 rounded-lg bg-secondary/80 border border-border p-3 text-xs flex items-start gap-2.5">
        <Store className="h-4 w-4 text-primary shrink-0 mt-0.5" />
        <div className="text-muted-foreground leading-snug">
          <strong className="text-foreground font-semibold">
            Showroom San Carlos:
          </strong>{" "}
          Jr. San José N° 210, 2do Piso, Huancayo.
          <span className="block mt-0.5 text-primary font-medium">
            ✨ Separa sin adelanto y pruébatelas antes de pagar.
          </span>
        </div>
      </div>

      {/* Progress bar for threshold */}
      {remaining > 0 && (
        <div className="mb-4 rounded-lg border border-border bg-accent/20 p-3 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-foreground font-medium">
              <Gift className="h-3.5 w-3.5 text-primary" />
              Agrega {formatPrice(remaining)} más para envío gratis
            </span>
            <span className="text-muted-foreground">
              {Math.round((subtotal / freeDeliveryThreshold) * 100)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}
      {remaining <= 0 && (
        <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 p-3 text-xs text-primary font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          ¡Envío gratis habilitado para tu pedido!
        </div>
      )}

      {/* Items List */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {cart.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-[76px_minmax(0,1fr)] gap-3.5 border-b border-border/80 pb-4 fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Thumbnail */}
            <div className="product-art tone-0 aspect-[3/4] rounded-md border border-border/60 flex items-center justify-center text-center p-1">
              <span className="text-[10px] font-mono font-bold uppercase text-primary/80 tracking-tighter">
                {item.code}
              </span>
            </div>

            {/* Info */}
            <div className="min-w-0 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold text-foreground leading-tight">
                      {item.name}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-muted font-medium text-foreground text-[11px]">
                        Talla {item.size}
                      </span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        Color {item.color}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                    aria-label="Eliminar prenda"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Quantity & Price */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex h-8 items-center rounded border border-border bg-background">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-none"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    aria-label="Restar una prenda"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-none"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    aria-label="Sumar una prenda"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  {item.quantity > 1 && (
                    <span className="block text-[10px] text-muted-foreground">
                      ({formatPrice(item.price)} c/u)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Customer Details Section */}
        <div className="rounded-lg border border-border bg-secondary/30 p-3.5 space-y-3 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Datos para
              tu reserva
            </span>
            <button
              type="button"
              onClick={() => setShowCheckoutForm(!showCheckoutForm)}
              className="text-xs text-primary hover:underline font-medium"
            >
              {showCheckoutForm ? "Ocultar" : "Personalizar"}
            </button>
          </div>

          {showCheckoutForm ? (
            <div className="space-y-2.5 pt-1 fade-in-up">
              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Tu Nombre completo:
                </label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. María Rodríguez"
                  className="h-8 text-xs bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                    Tu WhatsApp / Celular:
                  </label>
                  <Input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ej. 989232023"
                    className="h-8 text-xs bg-background"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                    Pago al retirar:
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Yape / Plin en tienda">
                      Yape / Plin
                    </option>
                    <option value="Tarjeta de Crédito / Débito (POS)">
                      Tarjeta (POS)
                    </option>
                    <option value="Efectivo al retirar">Efectivo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  ¿Cuándo pasarías a recoger?:
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="h-8 w-full rounded-md border border-input bg-background px-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="Hoy por la tarde (3:30 pm a 8:30 pm)">
                    Hoy por la tarde (3:30 pm – 8:30 pm)
                  </option>
                  <option value="Mañana por la mañana (9:00 am a 1:00 pm)">
                    Mañana por la mañana (9:00 am – 1:00 pm)
                  </option>
                  <option value="Mañana por la tarde (3:30 pm a 8:30 pm)">
                    Mañana por la tarde (3:30 pm – 8:30 pm)
                  </option>
                  <option value="Este fin de semana">
                    Este fin de semana
                  </option>
                  <option value="Coordinar por WhatsApp">
                    Coordinar por WhatsApp
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-muted-foreground mb-1">
                  Nota adicional (opcional):
                </label>
                <Input
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Ej. Deseo probármelo al llegar"
                  className="h-8 text-xs bg-background"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tu pedido se enviará al WhatsApp del showroom con la lista
              completa de prendas.
            </p>
          )}
        </div>
      </div>

      {/* Footer: Totals & WhatsApp CTA */}
      <div
        className={
          compact
            ? "border-t border-border pt-4 mt-3"
            : "mt-6 border-t border-border pt-5"
        }
      >
        <div className="space-y-1.5 mb-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Prendas seleccionadas</span>
            <span>
              {cart.reduce((s, i) => s + i.quantity, 0)} unidades
            </span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Reserva en showroom</span>
            <span className="text-primary font-semibold">GRATIS</span>
          </div>
          <div className="flex justify-between text-base font-bold text-foreground pt-1 border-t border-dashed border-border">
            <span>Total a pagar en tienda</span>
            <span className="font-display text-xl text-primary">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <Button
          asChild
          size="lg"
          className="w-full whatsapp-btn text-white py-5 sm:py-6 text-xs sm:text-sm flex items-center justify-center gap-2 font-semibold shadow-lg"
        >
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            Enviar Pedido por WhatsApp
          </a>
        </Button>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted-foreground text-center">
          <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>
            Atención directa con Erika Pantoja · Valentino Dresses
          </span>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart } = useStore();
  const totalItems = cart.reduce((s, x) => s + x.quantity, 0);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md p-4 sm:p-6">
        <SheetHeader className="text-left border-b border-border pb-3">
          <SheetTitle className="font-display text-2xl sm:text-3xl font-semibold text-foreground flex items-center justify-between">
            <span>Tu Selección</span>
            <span className="text-xs font-sans font-medium px-2.5 py-0.5 rounded-full bg-secondary text-primary">
              {totalItems} {totalItems === 1 ? "prenda" : "prendas"}
            </span>
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Reserva tus prendas favoritas para probarte y recoger en San
            Carlos, Huancayo.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 min-h-0 flex-1">
          <CartContents compact />
        </div>
      </SheetContent>
    </Sheet>
  );
}

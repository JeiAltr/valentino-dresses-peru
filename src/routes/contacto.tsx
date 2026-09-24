import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/context/store-context";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y cómo llegar — Valentino Dresses Huancayo" },
      {
        name: "description",
        content: "Visita Valentino Dresses en San Carlos, Huancayo.",
      },
      { property: "og:title", content: "Contacto — Valentino Dresses" },
      {
        property: "og:description",
        content: "Dirección, horario y canales de atención.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { config } = useStore();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-14 lg:px-8 w-full max-w-full overflow-hidden">
      <p className="eyebrow">Estamos cerca</p>
      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-1">
        Contacto y cómo llegar
      </h1>

      <div className="mt-8 sm:mt-10 grid gap-8 sm:gap-10 lg:grid-cols-2">
        <div className="map-placeholder grid min-h-[260px] sm:min-h-[420px] place-items-center rounded-xl border border-border p-6 text-center">
          <div>
            <MapPin className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-4 font-display text-2xl font-bold">
              San Carlos, Huancayo
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Jr. San José N° 210, 2do Piso
            </p>
            <p className="mt-1 text-xs text-primary font-medium">
              (A media cuadra del Parque Bolognesi)
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Info icon={MapPin} title="Visítanos" text={config.address} />
          <Info icon={Clock} title="Horario" text={config.hours} />
          <Info
            icon={MessageCircle}
            title="WhatsApp"
            text={`+51 ${config.whatsapp}`}
          />
          <Info icon={Mail} title="Correo" text={config.email} />

          <Button
            asChild
            size="lg"
            className="mt-6 w-full sm:w-auto self-start whatsapp-btn text-white font-semibold"
          >
            <a
              href={`https://wa.me/51${config.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("¡Hola Erika! Deseo hacer una consulta sobre la tienda.")}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4 mr-2" /> Escribir por WhatsApp
            </a>
          </Button>

          <div className="mt-8 flex gap-2">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <a
                href="https://instagram.com/valentinodresses"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <a
                href="https://facebook.com/valentinodresses"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-full"
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
    </div>
  );
}

function Info({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof MapPin;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 border-b border-border py-4 sm:py-5">
      <Icon className="mt-1 h-5 w-5 text-primary shrink-0" />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
}

import { useStore, type StoreConfig } from "@/context/store-context";

export function InfoPage({
  title,
  kind,
}: {
  title: string;
  kind: keyof Pick<StoreConfig, "returns" | "terms" | "buying">;
}) {
  const { config } = useStore();
  return (
    <div className="mx-auto min-h-[55vh] max-w-3xl px-4 py-8 sm:py-16 w-full max-w-full overflow-hidden">
      <p className="eyebrow">Información</p>
      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-1">
        {title}
      </h1>
      <div className="prose mt-6 sm:mt-8 max-w-none text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4">
        <p className="text-foreground">{config[kind]}</p>
        <p className="text-xs text-muted-foreground border-t border-border pt-4">
          Este contenido es referencial y puede editarse desde el panel administrador de la maqueta.
        </p>
      </div>
    </div>
  );
}

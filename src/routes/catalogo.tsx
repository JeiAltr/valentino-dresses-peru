import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search, RotateCcw, SlidersHorizontal, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/products";
import { useStore } from "@/context/store-context";

export const Route = createFileRoute("/catalogo")({
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s["q"] === "string" ? s["q"] : ""
  }),
  head: () => ({
    meta: [
      { title: "Catálogo Completo — Valentino Dresses Huancayo" },
      { name: "description", content: "Explora nuestra selección de vestidos americanos, blusas, blazers y calzado en Huancayo." },
      { property: "og:title", content: "Catálogo — Valentino Dresses" },
      { property: "og:description", content: "Vestidos, blusas, blazers, ropa para niñas, accesorios y calzado en San Carlos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  }),
  component: CatalogRoute
});

function CatalogRoute() {
  const { q } = Route.useSearch();
  return <CatalogPage routeQuery={q} />;
}

export function CatalogPage({ category, routeQuery = "" }: { category?: string; routeQuery?: string }) {
  const { products } = useStore();
  const routeQ = routeQuery;
  const initialQ = routeQ === "ofertas" ? "" : routeQ;
  
  const [q, setQ] = useState(initialQ);
  const [cats, setCats] = useState<string[]>(category ? [category] : []);
  const [sizes, setSizes] = useState<string[]>([]);
  const [order, setOrder] = useState(routeQ === "ofertas" ? "ofertas" : "novedad");

  const toggle = (v: string, list: string[], set: (v: string[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const clearAllFilters = () => {
    setQ("");
    setCats(category ? [category] : []);
    setSizes([]);
    setOrder("novedad");
  };

  const filtered = useMemo(
    () =>
      products
        .filter((p) => p.published)
        .filter((p) => !q || `${p.name} ${p.code} ${p.description}`.toLowerCase().includes(q.toLowerCase()))
        .filter((p) => !cats.length || cats.includes(p.category))
        .filter((p) => !sizes.length || p.variants.some((v) => sizes.includes(v.size)))
        .filter((p) => order !== "ofertas" || p.salePrice)
        .sort((a, b) =>
          order === "menor"
            ? (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
            : order === "mayor"
            ? (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
            : Number(b.isNew) - Number(a.isNew)
        ),
    [products, q, cats, sizes, order]
  );

  const hasActiveFilters = q || (category ? cats.length > 1 : cats.length > 0) || sizes.length > 0 || order !== "novedad";

  const filters = (
    <Filters
      cats={cats}
      sizes={sizes}
      toggleCat={(v) => toggle(v, cats, setCats)}
      toggleSize={(v) => toggle(v, sizes, setSizes)}
      clearAll={clearAllFilters}
      hasActive={hasActiveFilters}
    />
  );

  const currentCategoryName = category ? categories.find((c) => c.slug === category)?.name : "Catálogo Completo";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:px-8 w-full max-w-full overflow-hidden">
      {/* Encabezado */}
      <div className="mb-6 sm:mb-8 border-b border-border pb-4 sm:pb-6">
        <p className="eyebrow">Colección Exclusiva Huancayo</p>
        <div className="mt-1 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              {currentCategoryName}
            </h1>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "prenda disponible" : "prendas disponibles"} para entrega y recojo en San Carlos
            </p>
          </div>

          {/* Quick Clear */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs text-primary hover:text-primary/80 self-start md:self-auto"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      {/* Barra de Búsqueda y Ordenamiento */}
      <div className="mb-6 sm:mb-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por prenda, tela o código (ej. VES-001)..."
            className="pl-10 h-10 text-xs bg-card"
          />
        </div>

        <Select value={order} onValueChange={setOrder}>
          <SelectTrigger className="h-10 text-xs bg-card">
            <SelectValue placeholder="Ordenar por..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="novedad" className="text-xs">Más recientes</SelectItem>
            <SelectItem value="menor" className="text-xs">Menor precio</SelectItem>
            <SelectItem value="mayor" className="text-xs">Mayor precio</SelectItem>
            <SelectItem value="ofertas" className="text-xs font-semibold text-primary">Precios de Oferta</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botón de Filtros Móvil */}
      <div className="mb-6 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full text-xs font-semibold flex items-center justify-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filtrar Catálogo {hasActiveFilters && "(Activos)"}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] max-w-xs p-4 sm:p-6 overflow-y-auto">
            <SheetHeader className="text-left border-b border-border pb-3">
              <SheetTitle className="font-display text-2xl font-bold">Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-4 sm:mt-6">{filters}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Layout Grid con Sidebar */}
      <div className="grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="hidden lg:block space-y-6">{filters}</aside>
        <div>
          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  );
}

function Filters({
  cats,
  sizes,
  toggleCat,
  toggleSize,
  clearAll,
  hasActive
}: {
  cats: string[];
  sizes: string[];
  toggleCat: (s: string) => void;
  toggleSize: (s: string) => void;
  clearAll: () => void;
  hasActive: boolean;
}) {
  return (
    <div className="space-y-8 text-xs">
      {/* Categorías */}
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-3 pb-2 border-b border-border">
          Líneas de Prenda
        </h3>
        <div className="grid gap-2">
          {categories.map((c) => {
            const isChecked = cats.includes(c.slug);
            return (
              <label
                key={c.slug}
                className="flex items-center gap-2.5 cursor-pointer py-1 hover:text-primary transition-colors text-muted-foreground"
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleCat(c.slug)}
                />
                <span className={isChecked ? "font-semibold text-foreground" : ""}>
                  {c.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Tallas */}
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="font-semibold text-foreground uppercase tracking-wider text-[11px] mb-3 pb-2 border-b border-border">
          Filtrar por Talla
        </h3>
        
        <p className="text-[10px] text-muted-foreground mb-2">Adulto:</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {["S", "M", "L", "XL"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={`h-7 min-w-7 px-2 rounded text-[11px] font-semibold border transition-all ${
                sizes.includes(s)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/40 text-foreground border-border hover:border-primary/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground mb-2">Niñas / Calzado:</p>
        <div className="flex flex-wrap gap-1.5">
          {["4", "6", "8", "10", "12", "35", "36", "37", "38", "39", "40", "Única"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={`h-7 min-w-7 px-1.5 rounded text-[11px] font-medium border transition-all ${
                sizes.includes(s)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/40 text-foreground border-border hover:border-primary/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {hasActive && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearAll}
          className="w-full text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5 mr-2" /> Restablecer filtros
        </Button>
      )}
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { formatPrice, totalStock, type Product } from "@/data/products";
import { ProductArt } from "./product-art";
import { Sparkles, Eye, ShoppingBag } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const stock = totalStock(product);
  const isSale = !!product.salePrice;
  const discount = isSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <article className="group min-w-0 transition-all duration-300">
      <Link
        to="/producto/$codigo"
        params={{ codigo: product.code }}
        aria-label={`Ver ${product.name}`}
        className="block"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-muted border border-border/70 aspect-[3/4] shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:border-primary/40">
          <ProductArt
            name={product.name}
            tone={product.imageTone}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          {/* Floating Badges */}
          <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5 z-10">
            {isSale && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-sm">
                -{discount}%
              </span>
            )}
            {product.isNew && !isSale && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-secondary border border-border/80 text-foreground shadow-sm">
                Nuevo
              </span>
            )}
            {stock > 0 && stock < 6 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                Pocas unidades
              </span>
            )}
            {stock === 0 && (
              <Badge variant="destructive" className="text-[10px]">
                Agotado
              </Badge>
            )}
          </div>

          {/* Quick Overlay on Hover */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:flex items-center justify-center">
            <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              <Eye className="h-3.5 w-3.5" /> Ver detalles y tallas
            </span>
          </div>

          {/* Wishlist hint on hover */}
          <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/60 shadow-sm">
              <ShoppingBag className="h-3.5 w-3.5 text-primary" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="pt-3.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground uppercase font-mono tracking-wider">
            <span>{product.code}</span>
            <div className="flex gap-1 items-center">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c}
                  className="h-2.5 w-2.5 rounded-full border border-border/80 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor:
                      c.toLowerCase() === "negro"
                        ? "#111"
                        : c.toLowerCase() === "blanco" ||
                            c.toLowerCase() === "marfil"
                          ? "#fafafa"
                          : c.toLowerCase() === "vino" ||
                              c.toLowerCase() === "rojo"
                            ? "#722f37"
                            : c.toLowerCase() === "rosa" ||
                                c.toLowerCase() === "rosa palo"
                              ? "#e8c5c8"
                              : c.toLowerCase() === "azul noche"
                                ? "#1e293b"
                                : c.toLowerCase() === "camel" ||
                                    c.toLowerCase() === "arena"
                                  ? "#c2a688"
                                  : c.toLowerCase() === "champán"
                                    ? "#f5e6d3"
                                    : c.toLowerCase() === "celeste"
                                      ? "#a8d8ea"
                                      : c.toLowerCase() === "lavanda"
                                        ? "#c4b7d5"
                                        : c.toLowerCase() === "olivo"
                                          ? "#708238"
                                          : c.toLowerCase() === "nude"
                                            ? "#e3c9b8"
                                            : c.toLowerCase() === "carey"
                                              ? "#8B6914"
                                              : "#b39283",
                  }}
                  title={c}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-muted-foreground">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>

          <h3 className="font-display text-base sm:text-lg lg:text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* Prices */}
          <div className="flex items-baseline gap-2 pt-0.5 flex-wrap">
            {product.salePrice ? (
              <>
                <span className="font-bold text-primary font-display text-base sm:text-lg whitespace-nowrap">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-xs text-muted-foreground line-through whitespace-nowrap">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-foreground font-display text-base sm:text-lg whitespace-nowrap">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return products.length ? (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 stagger-children">
      {products.map((p) => (
        <ProductCard key={p.code} product={p} />
      ))}
    </div>
  ) : (
    <div className="rounded-xl border border-dashed border-border py-24 text-center px-4">
      <p className="font-display text-3xl font-semibold text-foreground">
        No encontramos prendas en esta selección
      </p>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
        Intenta cambiando los filtros o buscando por nombre en el buscador
        superior.
      </p>
    </div>
  );
}

export type CategorySlug = "vestidos" | "ninas" | "blusas" | "blazers" | "pantalones" | "chompas-casacas" | "carteras" | "lentes" | "zapatos";
export type Variant = { size: string; color: string; stock: number };
export type Product = {
  code: string; name: string; category: CategorySlug; description: string; material: string;
  details: string[]; price: number; salePrice?: number | undefined; colors: string[]; variants: Variant[];
  published: boolean; isNew: boolean; imageTone: number;
};
export const categories: { slug: CategorySlug; name: string; short: string }[] = [
  { slug: "vestidos", name: "Vestidos", short: "Vestidos" }, { slug: "ninas", name: "Vestidos para niñas", short: "Niñas" },
  { slug: "blusas", name: "Blusas", short: "Blusas" }, { slug: "blazers", name: "Blazers", short: "Blazers" },
  { slug: "pantalones", name: "Pantalones", short: "Pantalones" }, { slug: "chompas-casacas", name: "Chompas y casacas", short: "Abrigos" },
  { slug: "carteras", name: "Carteras", short: "Carteras" }, { slug: "lentes", name: "Lentes", short: "Lentes" },
  { slug: "zapatos", name: "Zapatos", short: "Zapatos" },
];
const clothing = ["S", "M", "L", "XL"];
const girls = ["4", "6", "8", "10", "12"];
const shoes = ["35", "36", "37", "38", "39", "40"];
const variants = (sizes: string[], colors: string[], seed: number): Variant[] => sizes.flatMap((size, i) => colors.map((color, j) => ({ size, color, stock: (seed + i * 2 + j * 3) % 7 })));
const make = (code:string,name:string,category:CategorySlug,price:number,colors:string[],sizes:string[],seed:number,salePrice?:number): Product => ({
  code,name,category,price,salePrice,colors,variants:variants(sizes,colors,seed),published:true,isNew:seed%3!==0,imageTone:seed%6,
  description:`${name} de silueta femenina y acabado cuidado, ideal para combinar en ocasiones especiales o looks cotidianos.`,
  material: category === "carteras" ? "Cuero sintético premium" : category === "lentes" ? "Acetato y protección UV400" : "Tela americana seleccionada",
  details:["Acabado de alta calidad","Calce cómodo","Disponible para recojo en tienda"],
});
export const initialProducts: Product[] = [
  make("VES-001","Vestido Ivanna","vestidos",199,["Negro","Vino","Rosa"],clothing,1,179),
  make("VES-002","Vestido Aurora","vestidos",229,["Azul noche","Champán"],clothing,2),
  make("VES-003","Vestido Amelie","vestidos",189,["Rojo","Negro"],clothing,3,149),
  make("VES-004","Vestido Mini Florencia","ninas",119,["Rosa","Marfil"],girls,4),
  make("VES-005","Vestido Mini Celeste","ninas",109,["Celeste","Lavanda"],girls,5,89),
  make("VES-006","Blusa Renata","blusas",89,["Marfil","Negro","Rosa"],clothing,6),
  make("VES-007","Blusa Siena","blusas",79,["Blanco","Vino"],clothing,7,59),
  make("VES-008","Blazer Milán","blazers",219,["Camel","Negro"],clothing,8),
  make("VES-009","Blazer Verona","blazers",239,["Rosa palo","Marfil"],clothing,9,199),
  make("VES-010","Pantalón Elisa","pantalones",139,["Negro","Arena"],clothing,10),
  make("VES-011","Pantalón Palazzo Roma","pantalones",149,["Vino","Negro"],clothing,11,119),
  make("VES-012","Chompa Bianca","chompas-casacas",129,["Marfil","Rosa"],clothing,12),
  make("VES-013","Casaca Génova","chompas-casacas",249,["Negro","Olivo"],clothing,13,219),
  make("VES-014","Cartera Vittoria","carteras",159,["Vino","Negro","Camel"],["Única"],14),
  make("VES-015","Cartera Mini Capri","carteras",119,["Rosa","Marfil"],["Única"],15,99),
  make("VES-016","Lentes Mónaco","lentes",69,["Negro","Carey"],["Única"],16),
  make("VES-017","Zapatos Valentina","zapatos",189,["Negro","Nude"],shoes,17),
  make("VES-018","Tacos Fiorella","zapatos",209,["Vino","Negro"],shoes,18,179),
];
export const formatPrice = (value:number) => `S/ ${value.toFixed(2)}`;
export const getCategoryName = (slug:string) => categories.find((item)=>item.slug===slug)?.name ?? "Catálogo";
export const totalStock = (product:Product) => product.variants.reduce((sum,item)=>sum+item.stock,0);

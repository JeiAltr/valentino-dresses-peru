# Valentino Dresses Mockup

Crea la maqueta SOLO FRONT-END (sin backend, sin base de datos, sin pagos reales) de una tienda online para "Valentino Dresses", una tienda de ropa americana en Huancayo, Perú. Toda la interfaz en español (Perú). Moneda: soles, formato "S/ 179.00".

STACK: React + Vite + TypeScript + Tailwind + shadcn/ui + react-router. Datos de ejemplo en un archivo local (src/data/products.ts). El carrito y el panel usan estado local con persistencia en localStorage. Mobile-first y totalmente responsive.

DISEÑO
- Moda femenina, elegante, limpia y llamativa. Mucho espacio en blanco, fotos grandes, tipografía serif elegante para títulos (Playfair Display o Cormorant) y sans-serif (Inter) para el texto.
- Paleta provisional: neutros cálidos con un acento burdeos/rosa palo. Define TODOS los colores como variables CSS/tokens de Tailwind para poder cambiar la paleta en un solo lugar (luego la ajustaré según capturas de referencia).
- Logo provisional: texto "Valentino Dresses" (aún no hay logo).
- Estructura inspirada en una tienda de moda tipo Tutti Frutti Perú: NO copies marca, textos ni imágenes de terceros. Usa imágenes de relleno neutras (placeholders con degradado y el nombre de la prenda).

DATOS DE LA TIENDA
- Nombre: Valentino Dresses
- Dirección: Jr. San José, San Carlos, Huancayo
- WhatsApp: 989 232 023
- Correo: valentinodresses@gmail.com
- Redes: Instagram, Facebook y TikTok (usuario: valentinodresses). Usa iconos con enlaces de relleno.
- Venta y recojo en tienda física (no hay delivery ni envíos).

PÁGINAS Y COMPONENTES (lado cliente)
1. Barra superior de anuncio: "Venta y recojo en tienda · Pedidos por WhatsApp".
2. Header: logo, buscador, icono de carrito con contador. Menú de categorías (en móvil, menú hamburguesa): Vestidos, Vestidos para niñas, Blusas, Blazers, Pantalones, Chompas y casacas, Carteras, Lentes, Zapatos, Ofertas.
3. Inicio: banner principal con título y botón "Ver catálogo", franja de categorías con tarjetas, sección "Novedades", sección "Ofertas" y bloque "Cómo comprar" en 3 pasos (1. Elige tus prendas, 2. Envía tu pedido por WhatsApp, 3. Recoge y paga en tienda).
4. Catálogo (/catalogo y /categoria/:slug): grilla de productos, buscador por nombre o código, filtros por categoría y por talla (sidebar en escritorio, drawer en móvil), orden por precio/novedad. Cada tarjeta: foto, nombre, precio, badge "Oferta" con precio anterior tachado, badge "Últimas unidades" (stock bajo) y "Agotado".
5. Detalle de producto (/producto/:codigo): galería de 4 miniaturas, nombre, código (ej. VES-001), precio y precio de oferta, selector de TALLA (deshabilita tallas sin stock), selector de COLOR (círculos), cantidad, botón "Agregar al carrito", enlace "Ver cuadro de medidas" (abre un modal con una tabla de medidas), descripción con material y detalles, botones de compartir (WhatsApp, Facebook, Pinterest) y sección "Productos relacionados".
6. Carrito (drawer lateral + página /carrito): lista de ítems con talla, color y cantidad editable, subtotal y botón grande "Enviar pedido por WhatsApp". Ese botón abre un enlace wa.me/51989232023 con un mensaje prellenado, por ejemplo:
"Hola Valentino Dresses, quiero hacer este pedido:
- VES-001 Vestido Ivanna, Talla M, Color negro x1 (S/ 179.00)
Total: S/ 179.00
Lo recogeré en tienda."
7. Botón flotante de WhatsApp en todas las páginas.
8. Página "Contacto / Cómo llegar": dirección, horario (relleno editable), mapa placeholder, WhatsApp y redes.
9. Footer: enlaces de políticas (Cambios y devoluciones, Términos y condiciones, Cómo comprar), atención al cliente, redes y dirección.

DATOS DE EJEMPLO (16 a 20 productos, con códigos VES-001, VES-002…)
- Cubre todas las categorías: vestidos, vestidos para niñas, blusas, blazers, pantalones, chompas y casacas, carteras, lentes y zapatos.
- Tallas: ropa de mujer S, M, L, XL; niñas 4, 6, 8, 10, 12; zapatos 35 a 40; carteras y lentes con talla "Única".
- Cada producto con 2 a 3 colores, stock por talla, y algunos con precio de oferta. Precios realistas entre S/ 39 y S/ 250.
- Nombres de fantasía (ej. "Vestido Ivanna", "Blazer Milán"), en español.

PANEL ADMINISTRADOR (ruta /admin, solo maqueta, sin seguridad real)
- Login simulado (cualquier correo y contraseña entra).
- Layout con barra lateral: Productos, Categorías, Stock, Configuración.
- Productos: tabla con buscador, foto, código, nombre, categoría, precio y stock total, y toggle "Publicado". Botones "Nuevo producto", "Importar desde Excel" (solo abre un modal simulado con un botón de descargar plantilla) y editar/eliminar.
- Formulario de producto (drawer o página): nombre, código, categoría, descripción, precio, precio de oferta, subida de varias fotos con vista previa (solo local), tabla de variantes por talla y color con stock editable.
- Stock: vista rápida para actualizar el stock por variante.
- Configuración: editar número de WhatsApp, dirección, horario y textos de las políticas.
- Los cambios hechos en el panel se reflejan en el catálogo del cliente (mismo estado local) para poder mostrar la demo.

CALIDAD
- Componentes reutilizables (ProductCard, ProductGrid, SizeSelector, ColorSelector, CartDrawer, etc.), accesibilidad básica, estados vacíos ("Tu carrito está vacío") y toasts de confirmación.
- No agregues pasarela de pagos, registro de clientes ni cupones: eso será una fase posterior. Deja el código organizado para poder conectar luego un backend (capa de datos separada en src/data y hooks).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://valentino-dresses-peru.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/98ec5bba-ed74-41a1-8977-1a2e8179a3dd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# Plan: Maqueta de Valentino Dresses

## Resultado
Construir una tienda de moda femenina completa, solo front-end, en español peruano. Incluirá catálogo, detalle, carrito por WhatsApp, contacto y panel administrador simulado, con cambios persistentes en el navegador.

## Diseño y experiencia
- Crear una identidad editorial elegante con títulos serif, texto sans-serif, neutros cálidos y acentos burdeos/rosa palo.
- Centralizar colores, tipografías, sombras y estados en el sistema visual para facilitar cambios posteriores.
- Usar composiciones amplias, fotografías simuladas mediante placeholders editoriales con degradados y nombres de prendas, sin imágenes de terceros.
- Adaptar navegación, filtros, tablas, panel y carrito para móvil, tableta y escritorio.

## Tienda pública
- Crear encabezado global, anuncio, navegación por categorías, búsqueda, contador de carrito, menú móvil, botón flotante de WhatsApp y pie de página.
- Construir Inicio con banner, categorías, novedades, ofertas y los tres pasos de compra.
- Crear Catálogo y páginas de categoría con búsqueda por nombre/código, filtros por categoría/talla, orden y estados de producto.
- Crear detalle de producto con galería, variantes, cantidad, cuadro de medidas, compartir y relacionados.
- Crear carrito lateral y página de carrito, edición de cantidades, subtotal y mensaje de WhatsApp prellenado.
- Crear Contacto/Cómo llegar y páginas informativas para políticas y proceso de compra.

## Panel administrador simulado
- Crear acceso local con cualquier correo y contraseña.
- Añadir navegación para Productos, Categorías, Stock y Configuración.
- Permitir buscar, publicar, crear, editar y eliminar productos localmente.
- Añadir importación Excel simulada con descarga de plantilla.
- Añadir formulario con imágenes locales, datos comerciales y stock por talla/color.
- Permitir edición rápida de stock y datos de contacto/políticas.

## Datos y estado
- Crear 18 productos de ejemplo repartidos entre todas las categorías, con códigos, colores, tallas, precios, ofertas y stock realista.
- Separar catálogo inicial, tipos y utilidades de datos.
- Implementar una capa de estado React persistida en `localStorage` para catálogo, carrito, configuración y sesión simulada del panel.
- Incluir estados vacíos, validaciones básicas y confirmaciones visuales.

## Estructura técnica
- Mantener TanStack Router, equivalente compatible con el `react-router` solicitado en esta plantilla.
- Crear rutas independientes para inicio, catálogo, categorías, producto, carrito, contacto, políticas y panel.
- Reutilizar los controles existentes de shadcn/ui y crear piezas específicas como ProductCard, ProductGrid, selectores y CartDrawer.
- Añadir metadatos únicos en cada página pública.

## Verificación
- Revisar compilación y errores de ejecución.
- Recorrer desde Inicio hasta producto, agregado al carrito y generación del pedido de WhatsApp.
- Probar login simulado y comprobar que cambios de producto/stock/configuración aparecen en la tienda.
- Verificar visualmente escritorio y móvil, sin desbordes ni elementos superpuestos.

## Fuera de alcance
- Backend, base de datos, seguridad real, pagos, registro de clientes, delivery, envíos y cupones.

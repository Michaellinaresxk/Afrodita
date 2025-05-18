import { client } from './client';
import * as queries from '../graphql/queries';
import { Product, Category } from '../graphql/types';
import { luxuryProducts } from '@/constants/products';

/**
 * Normaliza un producto de Hygraph al formato interno
 * @param product Producto desde Hygraph API
 * @returns Producto normalizado
 */
const normalizeProduct = (product: any): Product => {
  console.log('Normalizando producto:', product.id || 'sin ID');

  // Generar un ID seguro
  const safeId =
    product.id || `fallback-${Math.random().toString(36).substr(2, 9)}`;

  // Obtener URL de imagen de manera segura
  let imageUrl = '/placeholder.jpg';
  if (typeof product.image === 'string') {
    imageUrl = product.image;
  } else if (
    product.image &&
    typeof product.image === 'object' &&
    product.image.url
  ) {
    imageUrl = product.image.url;
  }

  // Manejo seguro de categorías
  const categoriesArray = Array.isArray(product.categories)
    ? product.categories.filter(Boolean)
    : [];

  // Crear categoria principal
  const primaryCategory =
    categoriesArray.length > 0
      ? { id: categoriesArray[0], name: categoriesArray[0] }
      : { id: 'default', name: 'General' };

  // Producto normalizado
  const normalized: Product = {
    id: safeId,
    name: product.name || 'Producto sin nombre',
    description: product.description || 'Sin descripción disponible',
    price: Number(product.price) || 0,
    categories: categoriesArray,
    category: primaryCategory,
    image: imageUrl,
    isNew: Boolean(product.isNew),
    featured: Boolean(product.featured),
    ingredients: Array.isArray(product.ingredients) ? product.ingredients : [],
    // Propiedades adicionales con valores predeterminados
    rating: product.rating || 4.5,
    reviews: product.reviews || 0,
    isSale: Boolean(product.isSale),
    stock: product.stock || 10,
    sizes: product.sizes || [],
  };

  return normalized;
};

/**
 * Obtiene productos de fallback cuando la API falla
 * @returns Lista de productos de fallback
 */
const getFallbackProducts = (): Product[] => {
  console.warn('Usando productos de fallback');
  return luxuryProducts.map((product) => {
    // Asegurarse de que cada producto tenga un ID único
    const uniqueId = product.id
      ? String(product.id)
      : `fallback-${Math.random().toString(36).substr(2, 9)}`;

    // Determinar categorías
    let categories = [];
    if (Array.isArray(product.categories)) {
      categories = product.categories;
    } else if (typeof product.category === 'string') {
      categories = [product.category];
    } else if (
      product.category &&
      typeof product.category === 'object' &&
      product.category.id
    ) {
      categories = [product.category.id];
    } else {
      categories = ['default'];
    }

    return normalizeProduct({
      ...product,
      id: uniqueId,
      categories,
    });
  });
};

/**
 * Obtiene categorías de fallback cuando la API falla
 * @returns Lista de categorías de fallback
 */
const getFallbackCategories = (): Category[] => {
  console.warn('Usando categorías de fallback');
  return [
    { id: 'todos', name: 'Todos', description: 'Todos los productos' },
    {
      id: 'hidratantes',
      name: 'Hidratantes',
      description: 'Jabones hidratantes para pieles secas',
    },
    {
      id: 'relajantes',
      name: 'Relajantes',
      description: 'Jabones con aromas relajantes',
    },
    {
      id: 'especiales',
      name: 'Especiales',
      description: 'Colección especial de jabones premium',
    },
  ];
};

// Servicio para productos mejorado
export const productsService = {
  /**
   * Obtiene todos los productos
   * @returns Lista de productos
   */
  async getAllProducts(): Promise<Product[]> {
    try {
      console.log('Obteniendo productos desde Hygraph...');

      const response = await client.request(queries.GET_ALL_PRODUCTS);
      console.log(
        `Respuesta API - productos: ${response?.products?.length || 0}`
      );

      if (response?.products && response.products.length > 0) {
        console.log(
          `✅ Se encontraron ${response.products.length} productos en Hygraph`
        );
        // Asegurar que cada producto tenga un ID único
        const uniqueProducts = response.products.map(
          (product: any, index: number) => {
            if (!product.id) {
              product.id = `hygraph-${index}-${Date.now()}`;
            }
            return product;
          }
        );
        return uniqueProducts.map(normalizeProduct);
      }

      console.warn('No se encontraron productos en Hygraph, usando fallback');
      return getFallbackProducts();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return getFallbackProducts();
    }
  },

  /**
   * Obtiene productos destacados
   * @returns Lista de productos destacados
   */
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      console.log('Obteniendo productos destacados desde Hygraph...');

      const response = await client.request(queries.GET_FEATURED_PRODUCTS);
      console.log(
        'Featured products response:',
        response?.products?.length || 0
      );

      if (response?.products && response.products.length > 0) {
        console.log(
          `✅ Se encontraron ${response.products.length} productos destacados en Hygraph`
        );
        // Asegurar que cada producto tenga un ID único
        const uniqueProducts = response.products.map(
          (product: any, index: number) => {
            if (!product.id) {
              product.id = `featured-${index}-${Date.now()}`;
            }
            return product;
          }
        );
        return uniqueProducts.map(normalizeProduct);
      }

      console.warn(
        'No se encontraron productos destacados en Hygraph, usando fallback'
      );
      return getFallbackProducts().filter((p) => p.featured);
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
      return getFallbackProducts().filter((p) => p.featured);
    }
  },

  /**
   * Obtiene un producto específico por ID
   * @param id ID del producto
   * @returns Producto o null si no se encuentra
   */
  async getProductById(id: string): Promise<Product | null> {
    try {
      console.log(`Obteniendo producto con ID ${id} desde Hygraph...`);

      // Validar que el ID exista
      if (!id) {
        console.error('ID del producto es undefined o vacío');
        return null;
      }

      const response = await client.request(queries.GET_PRODUCT_BY_ID, { id });

      if (!response?.product) {
        console.warn(`Producto con ID ${id} no encontrado en Hygraph`);
        const fallbackProduct = getFallbackProducts().find(
          (p) => String(p.id) === String(id)
        );
        return fallbackProduct || null;
      }

      return normalizeProduct(response.product);
    } catch (error) {
      console.error(`Error al obtener producto con ID ${id}:`, error);
      const fallbackProduct = getFallbackProducts().find(
        (p) => String(p.id) === String(id)
      );
      return fallbackProduct || null;
    }
  },

  /**
   * Obtiene productos por categoría
   * @param category ID de la categoría
   * @returns Lista de productos filtrados por categoría
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      // Caso especial para la categoría "todos"
      if (category === 'todos') {
        return this.getAllProducts();
      }

      console.log(
        `Obteniendo productos de categoría ${category} desde Hygraph...`
      );

      // Obtener todos los productos y filtrar manualmente
      const allProducts = await this.getAllProducts();

      const filteredProducts = allProducts.filter((product) => {
        // Revisar las diferentes representaciones de categorías

        // 1. Si tenemos categorías como array
        if (
          Array.isArray(product.categories) &&
          product.categories.length > 0
        ) {
          return product.categories.some(
            (cat) =>
              typeof cat === 'string' &&
              cat.toLowerCase() === category.toLowerCase()
          );
        }

        // 2. Si tenemos categoría como objeto
        if (
          typeof product.category === 'object' &&
          product.category &&
          'id' in product.category
        ) {
          return product.category.id.toLowerCase() === category.toLowerCase();
        }

        // 3. Si tenemos categoría como string
        if (typeof product.category === 'string') {
          return product.category.toLowerCase() === category.toLowerCase();
        }

        return false;
      });

      if (filteredProducts.length > 0) {
        console.log(
          `✅ Se encontraron ${filteredProducts.length} productos para categoría ${category}`
        );
        return filteredProducts;
      }

      console.warn(`No se encontraron productos para categoría ${category}`);
      return [];
    } catch (error) {
      console.error(
        `Error al obtener productos por categoría ${category}:`,
        error
      );
      return [];
    }
  },

  /**
   * Obtiene todas las categorías disponibles
   * @returns Lista de categorías
   */
  async getCategories(): Promise<Category[]> {
    try {
      console.log('Obteniendo categorías desde Hygraph...');

      const response = await client.request(queries.GET_CATEGORIES);

      if (response?.products && response.products.length > 0) {
        // Extraer categorías únicas de los productos
        const categoryValues: string[] = response.products
          .flatMap((product: any) => product.categories || [])
          .filter(Boolean);

        // Eliminar duplicados
        const uniqueCategories = [...new Set(categoryValues)];

        // Convertir a formato de categoría con IDs únicos
        const categories: Category[] = uniqueCategories.map(
          (catName: string) => ({
            id: catName,
            name: catName,
            description: `Productos de ${catName}`,
          })
        );

        // Añadir categoría "todos" al principio
        return [
          { id: 'todos', name: 'Todos', description: 'Todos los productos' },
          ...categories,
        ];
      }

      console.warn(
        'No se encontraron productos para extraer categorías, usando fallback'
      );
      return getFallbackCategories();
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      return getFallbackCategories();
    }
  },
};

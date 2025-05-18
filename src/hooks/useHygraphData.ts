import { useState, useEffect } from 'react';
import { productsService } from '@/lib/hygraph/productsService';
import { Product, Category } from '@/lib/graphql/types';

export const useProducts = (categoryId?: string | 'featured') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: Product[];
        console.log(`Fetching products with category: ${categoryId || 'all'}`);

        if (categoryId === 'featured') {
          data = await productsService.getFeaturedProducts();
        } else if (categoryId && categoryId !== 'todos') {
          data = await productsService.getProductsByCategory(categoryId);
        } else {
          data = await productsService.getAllProducts();
        }

        console.log(`Received ${data.length} products from Hygraph`);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return { products, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching categories from Hygraph');
        const data = await productsService.getCategories();
        console.log(`Received ${data.length} categories from Hygraph`);
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('No se pudieron cargar las categorías');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useProductDetails = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`Fetching product details for ID: ${productId}`);
        const productData = await productsService.getProductById(productId);

        if (!productData) {
          setError('Producto no encontrado');
          return;
        }

        setProduct(productData);

        // Cargar productos relacionados si hay categoría
        try {
          if (productData.category) {
            const categoryId =
              typeof productData.category === 'string'
                ? productData.category
                : productData.category.id;

            if (categoryId) {
              console.log(
                `Fetching related products for category: ${categoryId}`
              );
              const relatedData = await productsService.getAllProducts();

              // Filtramos manualmente los relacionados (misma categoría, diferente ID)
              const related = relatedData.filter((p) => {
                // Si la categoría es un string
                if (
                  typeof p.category === 'string' &&
                  typeof productData.category === 'string'
                ) {
                  return (
                    p.category === productData.category && p.id !== productId
                  );
                }

                // Si la categoría es un objeto
                if (
                  typeof p.category === 'object' &&
                  p.category &&
                  typeof productData.category === 'object' &&
                  productData.category
                ) {
                  return (
                    p.category.id === productData.category.id &&
                    p.id !== productId
                  );
                }

                // Si tenemos categorías como array en categories
                if (p.categories && productData.categories) {
                  return (
                    p.categories.some((cat) =>
                      productData.categories.includes(cat)
                    ) && p.id !== productId
                  );
                }

                return false;
              });

              setRelatedProducts(related.slice(0, 4));
            }
          }
        } catch (relatedErr) {
          console.error('Error fetching related products:', relatedErr);
          // No establecer error general, solo para relacionados
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('No se pudo cargar el detalle del producto');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  return { product, relatedProducts, loading, error };
};

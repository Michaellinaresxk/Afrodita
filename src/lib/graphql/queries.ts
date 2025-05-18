import { gql } from 'graphql-request';

// Consulta para obtener todos los productos
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      description
      price
      categories
      image {
        url
      }
      featured
      isNew
      ingredients
    }
  }
`;

// Consulta mejorada para productos destacados
export const GET_FEATURED_PRODUCTS = gql`
  query GetFeaturedProducts {
    products(where: { featured: true }) {
      id
      name
      description
      price
      categories
      image {
        url
      }
      isNew
      ingredients
    }
  }
`;

// Consulta para obtener un producto por ID
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      price
      categories
      image {
        url
      }
      featured
      isNew
      ingredients
    }
  }
`;

// Consulta corregida para productos por categoría - FIXED
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    products(where: { categories_contains_some: [$category] }) {
      id
      name
      description
      price
      categories
      image {
        url
      }
      featured
      isNew
      ingredients
    }
  }
`;

// Consulta para obtener categorías únicas de productos
export const GET_CATEGORIES = gql`
  query GetCategories {
    products {
      categories
    }
  }
`;

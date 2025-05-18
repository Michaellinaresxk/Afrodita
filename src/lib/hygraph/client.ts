// src/lib/hygraph/client.ts
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_API_URL || '';
const token = process.env.NEXT_PUBLIC_HYGRAPH_AUTH_TOKEN || '';

console.log('Hygraph Configuration:');
console.log('- Endpoint:', endpoint);
console.log('- Token available:', Boolean(token));

// Create the GraphQL client
export const client = new GraphQLClient(endpoint, {
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {},
});

// Test function to verify connection
export const testConnection = async () => {
  try {
    // Try the simplest query first
    const simpleQuery = `{ __typename }`;
    console.log('Testing connection with simple query...');
    const simpleResult = await client.request(simpleQuery);
    console.log('Simple query result:', simpleResult);

    // Now try a products query
    console.log('Testing products query...');
    const productQuery = `
      query {
        productsConnection {
          edges {
            node {
              id
            }
          }
        }
      }
    `;
    const productResult = await client.request(productQuery);
    console.log('Products query result:', productResult);

    return true;
  } catch (error) {
    console.error('Connection test failed:', error);
    //@ts-ignore
    console.error('Error details:', error.response?.errors || error.message);

    //@ts-ignore
    if (error.request) {
      //@ts-ignore
      console.error('Request that failed:', error.request);
    }

    return false;
  }
};

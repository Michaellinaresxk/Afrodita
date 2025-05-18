'use client';

import { useEffect } from 'react';
import { testConnection } from '@/lib/hygraph/client';

export default function HygraphInitializer() {
  useEffect(() => {
    // Test the connection when the app initializes
    const initializeHygraph = async () => {
      try {
        const connected = await testConnection();

        if (!connected) {
          console.error(
            '⚠️ La aplicación usará datos de fallback debido a problemas de conexión con Hygraph'
          );
        } else {
          console.log(
            '✅ Conexión a Hygraph establecida correctamente. La aplicación está lista para usar datos reales.'
          );
        }
      } catch (error) {
        console.error('Error al inicializar la conexión con Hygraph:', error);
      }
    };

    initializeHygraph();
  }, []);

  // This component doesn't render anything
  return null;
}

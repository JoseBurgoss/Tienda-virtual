import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';

const useFeaturedProducts = (itemsCount) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getFeaturedProducts(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No se encontraron productos.');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setFeaturedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Error en encontrar productos');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (featuredProducts.length === 0 && didMount) {
      fetchFeaturedProducts();
    }
  }, []);

  return {
    featuredProducts, fetchFeaturedProducts, isLoading, error
  };
};

export default useFeaturedProducts;

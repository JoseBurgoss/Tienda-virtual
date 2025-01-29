import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Tiendas Burgos';
    }
  }, [title]);
};

export default useDocumentTitle;

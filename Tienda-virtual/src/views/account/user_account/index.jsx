/* eslint-disable react/no-multi-comp */
import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { lazy, Suspense } from 'react';
import UserTab from '../components/UserTab';

const UserAccountTab = lazy(() => import('../components/UserAccountTab'));
const UserWishListTab = lazy(() => import('../components/UserWishListTab'));
const UserOrdersTab = lazy(() => import('../components/UserOrdersTab'));

const Loader = () => (
  <div className="loader" style={{ minHeight: '80vh' }}>
    <LoadingOutlined />
    <h6>Cargando ... </h6>
  </div>
);

const UserAccount = () => {
  useScrollTop();
  useDocumentTitle('Mi cuenta | Tienda Burgos');

  return (
    <UserTab>
      <div index={0} label="Cuenta">
        <Suspense fallback={<Loader />}>
          <UserAccountTab />
        </Suspense>
      </div>
      <div index={1} label="Mi Lista de Deseos">
        <Suspense fallback={<Loader />}>
          <UserWishListTab />
        </Suspense>
      </div>
      <div index={2} label="Mis Ordenes">
        <Suspense fallback={<Loader />}>
          <UserOrdersTab />
        </Suspense>
      </div>
    </UserTab>
  );
};

export default UserAccount;

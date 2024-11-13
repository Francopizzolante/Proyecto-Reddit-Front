import React from 'react';
import PageLayout from './PageLayout';
import CrearPost from '../Componentes/CrearPost';

function CrearPostPage() {
  return (
    <PageLayout title="Crear un nuevo post">
      <CrearPost />
    </PageLayout>
  );
}

export default CrearPostPage;

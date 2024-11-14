import React from 'react';
import PageLayout from './PageLayout';
import Comments from '../Componentes/Comments';

function CommentsPage() {
  return (
    <PageLayout title="Comentarios hechos por {user}">
      <Comments/>
    </PageLayout>
  );
}

export default CommentsPage;

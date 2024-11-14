import React from 'react';
import PageLayout from './PageLayout';
import PostList from '../Componentes/PostList';

function Home() {
  return (
    <PageLayout title="Bienvenido, {user}">
      <PostList fetchType="all" />
    </PageLayout>
  );
}

export default Home;

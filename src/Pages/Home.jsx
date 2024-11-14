import React from 'react';
import PageLayout from './PageLayout';
import PostList from '../Componentes/PostList';
import posts from '../data/posts';

function Home() {
  return (
    <PageLayout title="Bienvenido, {user}">
      <PostList posts={posts} filterType="all" />
    </PageLayout>
  );
}

export default Home;

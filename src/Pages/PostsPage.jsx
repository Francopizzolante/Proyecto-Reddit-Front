import React from 'react';
import PageLayout from './PageLayout';
import PostList from '../Componentes/PostList';

function PostsPage() {
  return (
    <PageLayout title="Posts hechos por {user}">
      <PostList fetchType="user" />
    </PageLayout>
  );
}

export default PostsPage;

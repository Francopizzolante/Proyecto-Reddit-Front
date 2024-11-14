import React from 'react';
import PageLayout from './PageLayout';
import PostList from '../Componentes/PostList';

function LikesPage() {
  return (
    <PageLayout title="Posts likeados por {user}">
      <PostList fetchType="liked" />
    </PageLayout>
  );
}

export default LikesPage;

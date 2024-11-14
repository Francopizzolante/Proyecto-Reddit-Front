import React from 'react';
import PageLayout from './PageLayout';
import Comments from '../Componentes/Comments';
import posts from '../data/posts';

function CommentsPage() {

  return (
    <PageLayout title="Comentarios hechos por {user}">
      <Comments userPosts={posts} />
    </PageLayout>
  );
}

export default CommentsPage;

import React from 'react';
import PageLayout from './PageLayout';
import PostList from '../Componentes/PostList';
import posts from '../data/posts';

function LikesPage({ userComments }) {
  return (
    <PageLayout title="Posts likeados por {user}">
      <PostList posts={posts} comments={userComments} filterType="liked" />
    </PageLayout>
  );
}

export default LikesPage;

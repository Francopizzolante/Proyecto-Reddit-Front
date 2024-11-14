import React from 'react';
import PageLayout from './PageLayout';
import PostList from '../Componentes/PostList';
import { useAuth0 } from '@auth0/auth0-react';

function PostsPage({ userPosts}) {
  const { user } = useAuth0();
  return (
    <PageLayout title="Posts hechos por {user}">
      <PostList posts={userPosts} userId={user.name} filterType="user" />
    </PageLayout>
  );
}

export default PostsPage;

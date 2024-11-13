import React from 'react';
import PageLayout from './PageLayout';
import Comments from '../Componentes/Comments';
import posts from '../data/posts';
import { useAuth0 } from '@auth0/auth0-react';

function CommentsPage({ userComments }) {
  const { user } = useAuth0();
  const userSpecificComments = userComments.filter(comment => comment.user === user.name);

  return (
    <PageLayout title="Comentarios hechos por {user}">
      <Comments userComments={userSpecificComments} userPosts={posts} />
    </PageLayout>
  );
}

export default CommentsPage;

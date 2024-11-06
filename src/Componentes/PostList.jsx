import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

function PostList({ posts, filterType, userId, comments }) {
  // Estado para gestionar los "likes" en los posts
  const [likedPosts, setLikedPosts] = useState(
    posts.reduce((acc, post) => ({ ...acc, [post.id]: { liked: post.isLiked || false, likesCount: post.likesCount || 0 } }), {})
  );

  // Estado para gestionar la visibilidad de los comentarios
  const [commentsVisibility, setCommentsVisibility] = useState({}); 

  // Ordena los posts por fecha en orden descendente
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Filtra los posts según el tipo de filtro seleccionado
  const filteredPosts = sortedPosts.filter(post => {
    switch (filterType) {
      case 'all':
        return true;
      case 'user':
        return post.authorId === userId;
      case 'liked':
        return likedPosts[post.id]?.liked;
      default:
        return false;
    }
  });

  // Maneja el cambio de "like" en un post específico
  const handleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => {
      const isLiked = prevLikedPosts[postId].liked;
      const newLikesCount = isLiked ? prevLikedPosts[postId].likesCount - 1 : prevLikedPosts[postId].likesCount + 1;

      return {
        ...prevLikedPosts,
        [postId]: { liked: !isLiked, likesCount: newLikesCount },
      };
    });
  };

  // Función para alternar la visibilidad de los comentarios de un post
  const toggleComments = (postId) => {
    setCommentsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [postId]: !prevVisibility[postId]
    }));
  };

  // Función para obtener los comentarios específicos de un post
  const getCommentsForPost = (postId) => {
    return comments.filter(comment => comment.postId === postId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid white",
            padding: "20px",
            margin: "20px 0",
            maxWidth: "600px",
            width: "100%"
          }}
        >
          <div className="d-flex justify-content-between mb-3">
            <span>{post.user}</span>
            <span>{post.date}</span>
          </div>
          <h4 className="text-center">{post.title}</h4>
          <div className="text-center mb-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={post.image} 
              alt="post visual" 
              style={{ 
                width: '300px',
                height: '300px',
                objectFit: 'cover'
              }} 
            />
          </div>
          <p>{post.content}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <span className="me-2">{likedPosts[post.id]?.likesCount}</span>
              <FaHeart
                onClick={() => handleLike(post.id)}
                style={{ color: likedPosts[post.id]?.liked ? 'red' : 'gray', cursor: 'pointer' }}
                size={24}
              />
            </div>

            {/* Botón para mostrar/ocultar comentarios */}
            <button className="btn btn-light" onClick={() => toggleComments(post.id)}>
              {commentsVisibility[post.id] ? "Ocultar Comentarios" : "Mostrar Comentarios"}
            </button>
          </div>

          {/* Sección de comentarios */}
          {commentsVisibility[post.id] && (
            <div className="comments-section mt-3">
              <h5>Comentarios:</h5>
              {getCommentsForPost(post.id).map(comment => (
                <div key={comment.id} className="comment mt-2 p-2 border border-secondary">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">{comment.user}</span>
                    <span>{comment.date}</span>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
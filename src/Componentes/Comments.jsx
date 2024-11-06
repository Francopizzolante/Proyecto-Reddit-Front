import React from 'react';

function Comments({ userComments, userPosts }) {

  // Función para obtener el título del post a partir del postId
  const getPostTitle = (postId) => {
    const post = userPosts.find(p => p.id === postId);
    return post ? post.title : "Título no encontrado";
  };

  return (
    <div className="container mt-5">

      {/* Mapea y renderiza cada comentario del usuario */}
      {userComments.map((comment, index) => (
          <div key={index} className="comment mt-4 p-3 border border-light">
            <div className="d-flex justify-content-between">
              <span>{getPostTitle(comment.postId)}</span> {/* Título del post obtenido con postId */}
              <span>{comment.date}</span> {/* Fecha del comentario */}
            </div>
            <p className="mt-2">{comment.content}</p> {/* Contenido del comentario */}
          </div>
        ))
      }
    </div>
  );
}

export default Comments;

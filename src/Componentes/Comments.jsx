// src/Componentes/Comments.js
import React from 'react';

function Comments({ userComments, userName }) {
  return (
    <div className="container mt-5">
      <h2>Comentarios hechos por {userName}</h2> {/* Usamos el nombre del usuario logueado */}
      {userComments.length === 0 ? (
        <p>No has hecho ningún comentario todavía.</p>
      ) : (
        userComments.map((comment, index) => (
          <div key={index} className="comment mt-4 p-3 border border-light">
            <div className="d-flex justify-content-between">
              <span>{comment.postTitle}</span> {/* Título del post al que pertenece el comentario */}
              <span>{comment.date}</span>
            </div>
            <p className="mt-2">{comment.content}</p> {/* Contenido del comentario */}
          </div>
        ))
      )}
    </div>
  );
}

export default Comments;

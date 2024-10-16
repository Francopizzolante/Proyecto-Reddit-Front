// src/Componentes/Posts.js
import React from 'react';

function Posts({ userPosts, userName }) {
  return (
    <div className="container mt-5">
      <h2>Posts creados por {userName}</h2> 
      {userPosts.length === 0 ? (
        <p>No has creado ningún post todavía.</p>
      ) : (
        userPosts.map((post, index) => (
          <div key={index} className="post mt-4 p-3 border border-light">
            <div className="d-flex justify-content-between">
              <span>{post.user}</span>
              <span>{post.date}</span>
            </div>
            <h4 className="mt-2">{post.title}</h4>
            <div className="image-container bg-white text-center mb-3" style={{ height: '200px' }}>
              <img src={post.image} alt={post.title} style={{ height: '100%', width: '100%' }} />
            </div>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
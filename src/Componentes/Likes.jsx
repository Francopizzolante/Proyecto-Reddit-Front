import React from 'react';

function Likes({ likedPosts }) {
  return (
    <div className="container mt-5">
      <h2>Posts a los que has dado Like</h2>
      {likedPosts.length === 0 ? (
        <p>No has dado like a ningún post todavía.</p>
      ) : (
        likedPosts.map((post, index) => (
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

export default Likes;

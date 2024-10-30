import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

function SeccionPosts() {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="mt-5" style={{ border: "1px solid white", padding: "20px", margin: "20px 0" }}>
      <div className="d-flex justify-content-between mb-3">
        <span>usuario</span>
        <span>Fecha</span>
      </div>
      <h4 className="text-center">Título del post</h4>
      <div className="bg-white text-center mb-3" style={{ height: '200px', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span>Imagen</span>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <span className="me-2">{likesCount}</span>
          <FaHeart 
            onClick={handleLike} 
            style={{ color: liked ? 'red' : 'gray', cursor: 'pointer' }} 
            size={24} 
          />
        </div>
        <button className="btn btn-light">Comments</button>
      </div>
    </div>
  );
}

export default SeccionPosts;

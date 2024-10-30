import React from 'react';
import { Link } from 'react-router-dom';

function BarraLateral({ user }) {
  return (
    <div className="col-2 bg-dark text-white d-flex flex-column align-items-center justify-content-start pt-5">
      <img
        src={user.picture}
        alt={user.name}
        className="rounded-circle mb-3"
        style={{ width: '100px', height: '100px' }}
      />
      <h5>{user.name}</h5>
      <nav className="nav flex-column mt-3">
        <hr></hr>
        <Link className="text-white" style={{fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px'}} to="/">Home</Link>
        <hr></hr>
        <Link className="text-white" style={{fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px'}} to="/crear-post">Crear post</Link>
        <hr></hr>
        <Link className="text-white"  style={{fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px'}} to="/likes">Likes</Link>
        <hr></hr>
        <Link className="text-white" style={{fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px'}} to="/posts">Posts</Link>
        <hr></hr>
        <Link className="text-white" style={{fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px'}} to="/comments">Comments</Link>
        <hr></hr>
      </nav>
    </div>
  );
}

export default BarraLateral;

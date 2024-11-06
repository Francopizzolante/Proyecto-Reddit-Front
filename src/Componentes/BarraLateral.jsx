import React from 'react';
import { Link } from 'react-router-dom';

function BarraLateral({ user }) {
  return (
    <div className="col-2 bg-dark text-white" style={{ height: 'auto', overflow: 'hidden' }}>
      <div
        className="d-flex flex-column align-items-center justify-content-start pt-5"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '16.666%', // Ancho equivalente a col-2 en Bootstrap, ajusta según el diseño deseado
        }}
      >
        <img
          src={user.picture}
          alt={user.name}
          className="rounded-circle mb-3"
          style={{ width: '100px', height: '100px' }}
        />
        <h5>{user.name}</h5>
        <nav className="nav flex-column mt-3">
          <hr />
          <Link className="text-white" style={{ fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px' }} to="/">Home</Link>
          <hr />
          <Link className="text-white" style={{ fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px' }} to="/crear-post">Crear post</Link>
          <hr />
          <Link className="text-white" style={{ fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px' }} to="/likes">Likes</Link>
          <hr />
          <Link className="text-white" style={{ fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px' }} to="/posts">Posts</Link>
          <hr />
          <Link className="text-white" style={{ fontSize: '1.2em', textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px' }} to="/comments">Comments</Link>
          <hr />
        </nav>
      </div>
    </div>
  );
}

export default BarraLateral;

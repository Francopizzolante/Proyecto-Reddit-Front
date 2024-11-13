import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// Componente BarraLateral: Renderiza una barra lateral fija con la foto, nombre del usuario y enlaces de navegación.
function BarraLateral() {

  const { user } = useAuth0();

  return (
    <div className="col-2 bg-dark text-white" style={{ height: 'auto', overflow: 'hidden' }}>
      <div
        className="d-flex flex-column align-items-center justify-content-start pt-5"
        style={{
          position: 'fixed',    // Fija la barra lateral para que permanezca visible al hacer scroll
          top: 0,
          left: 0,
          height: 'auto',
          width: '16.666%',     // Ancho equivalente a col-2 en Bootstrap (ajustable según diseño)
        }}
      >
        
        {/* Imagen de perfil del usuario */}
        <img
          src={user.picture}
          alt={user.name}
          className="rounded-circle mb-3"
          style={{ width: '100px', height: '100px' }}
        />

        {/* Nombre del usuario */}
        <h5>{user.name}</h5>

        {/* Navegación de enlaces en barra lateral */}
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

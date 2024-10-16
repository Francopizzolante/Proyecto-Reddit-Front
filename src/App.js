// src/App.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // Importar el hook useAuth0
import Inicio from './Componentes/Inicio';
import './App.css';

function App() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0(); // Obtener las funciones de Auth0

  // Si el usuario no está autenticado, muestra el componente Inicio
  if (!isAuthenticated) {
    return <Inicio onLoginClick={loginWithRedirect} />;
  }

  // Si el usuario está autenticado, muestra la página con el logout
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome, {user.name}!</h2>
        <img src={user.picture} alt={user.name} />
        <p>Email: {user.email}</p>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default App;
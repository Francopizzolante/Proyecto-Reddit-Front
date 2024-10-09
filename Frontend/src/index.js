import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './Componentes/Inicio';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';
import OlvidasteContrasenia from './Componentes/OlvidasteContrasenia';

// Creación del nodo raíz donde se renderizará la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));


function App() {
  // Definimos el estado 'view' para controlar qué vista mostrar ('inicio', 'login', 'registro', 'olvidasteContrasenia').
  const [view, setView] = useState('inicio');

  // Cambia la vista a 'login' cuando el usuario hace clic en "Iniciar sesión".
  const handleLoginClick = () => {
    setView('login');
  };

  // Cambia la vista de vuelta a 'inicio' cuando el usuario hace clic en el botón de regresar.
  const handleBackToHome = () => {
    setView('inicio');
  };

  // Cambia la vista a 'registro' cuando el usuario hace clic en "Registrar".
  const handleRegisterClick = () => {
    setView('registro');
  };

  // Cambia la vista a 'olvidasteContrasenia' cuando el usuario hace clic en "Olvidé mi contraseña".
  const handleForgotPasswordClick = () => {
    setView('olvidasteContrasenia');
  };

  // Esta función decide qué vista renderizar en base al estado 'view'.
  const renderView = () => {
    switch(view) {
      case 'login':
        return <Login onBackToHome={handleBackToHome} onForgotPasswordClick={handleForgotPasswordClick} />;
      case 'registro':
        return <Registro onBackToHome={handleBackToHome} />;
      case 'olvidasteContrasenia':
        return <OlvidasteContrasenia onBackToHome={handleBackToHome} />;
      default:
        return <Inicio onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />;
    }
  };

  // Renderizamos la aplicación dentro de React.StrictMode para resaltar problemas potenciales en la aplicación.
  return (
    <React.StrictMode>
      {renderView()}
    </React.StrictMode>
  );
}

// Renderizamos el componente App en el elemento raíz del DOM.
root.render(
  <App />
);
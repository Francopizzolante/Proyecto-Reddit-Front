import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Registro({ onBackToHome }) {
  // Definimos el estado inicial para el formulario con los campos vacíos.
  const [formData, setFormData] = useState({
    genero: '',
    fechaNacimiento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    usuario: '',
    contrasenia: '',
    repetirContrasenia: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Función para manejar el envío del formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitamos que la página se recargue al enviar el formulario.
    console.log("Datos del formulario:", formData); // Mostramos los datos del formulario en la consola.
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#000', color: '#fff' }}>
      <div className="container mt-5">
        <button onClick={onBackToHome} className="btn btn-danger btn-block" style={{ position: 'absolute', top: 20, left: 20 }}>Volver al inicio</button>
        <h2>Registro de usuario:</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="genero" className="form-label">Género</label>
            <select id="genero" name="genero" className="form-control" value={formData.genero} onChange={handleChange} required>
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="noBinario">No binario</option>
                <option value="generoFluido">Género fluido</option>
                <option value="agenero">Agénero</option>
                <option value="demigenero">Demigénero</option>
                <option value="generoQueer">Género queer</option>
                <option value="transgenero">Transgénero</option>
                <option value="Tanque aleman">Tanque aleman</option>
                <option value="otro">Otro</option>
            </select>
            </div>
            <div className="mb-3">
            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
            <input type="date" id="fechaNacimiento" name="fechaNacimiento" className="form-control" value={formData.fechaNacimiento} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" id="nombre" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input type="text" id="apellido" name="apellido" className="form-control" value={formData.apellido} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="tel" id="telefono" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Nombre de usuario único</label>
            <input type="text" id="usuario" name="usuario" className="form-control" value={formData.usuario} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="contrasenia" className="form-label">Contraseña</label>
            <input type="password" id="contrasenia" name="contrasenia" className="form-control" value={formData.contrasenia} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
            <label htmlFor="repetirContrasenia" className="form-label">Repetir Contraseña</label>
            <input type="password" id="repetirContrasenia" name="repetirContrasenia" className="form-control" value={formData.repetirContrasenia} onChange={handleChange} required/>
            </div>
            <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
        </div>
    </div>
  );
}

export default Registro;
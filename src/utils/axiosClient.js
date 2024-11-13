import axios from 'axios';

// Crear una instancia de Axios con la configuración base
const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Cambia esto según tu URL base del backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para crear un nuevo post
export const createPost = async (data) => {
    try {
        const response = await axiosClient.post('/posts', data); // Realiza la solicitud POST
        return response.data; // Devuelve los datos del post creado
    } catch (error) {
        console.error('Error creando el post:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Exportar la instancia de Axios y las funciones
export default axiosClient;

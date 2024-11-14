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

// Función para obtener los comentarios de un usuario
export const getCommentsByUser = async (user) => {
    try {
        const response = await axiosClient.get(`/comments/user/${user}`); // Solicitud GET al backend
        return response.data; // Devuelve los comentarios del usuario
    } catch (error) {
        console.error('Error obteniendo los comentarios del usuario:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

// Obtener comentarios específicos de un post
export const getCommentsByPostId = async (postId) => {
    try {
        const response = await axiosClient.get(`/comments/post/${postId}`); // Asegúrate de que la ruta coincida
        return response.data;
    } catch (error) {
        console.error('Error al obtener comentarios por postId:', error);
        throw error;
    }
};

// Exportar la instancia de Axios y las funciones
export default axiosClient;

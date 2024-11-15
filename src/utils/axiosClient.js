import axios from 'axios';

// Crear una instancia de Axios con la configuración base
const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Cambia esto según tu URL base del backend
    headers: {
        'Content-Type': 'application/json',
        'Content-Type': 'multipart/form-data',
    },
});

// Función para crear un nuevo post
export const createPost = async (data) => {
    try {
        const response = await axiosClient.post('/posts/create', data); // Endpoint correcto
        return response.data;
    } catch (error) {
        console.error('Error creando el post:', error);
        throw error;
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

// Obtener el título de un post por su ID
export const getPostTitleById = async (postId) => {
    try {
        const response = await axiosClient.get(`/posts/title/${postId}`);
        return response.data.titulo; // Devuelve solo el título
    } catch (error) {
        console.error(`Error al obtener el título para el post ${postId}:`, error);
        return 'Título no disponible'; // Mensaje de error por defecto
    }
};

// Obtener todos los posts
export const getAllPosts = async () => {
    try {
        const response = await axiosClient.get('/posts');
        return response.data; // Devuelve los posts
    } catch (error) {
        console.error('Error al obtener todos los posts:', error);
        throw error;
    }
};

// Obtener posts creados por un usuario
export const getPostsByUser = async (user) => {
    try {
        const response = await axiosClient.get(`/posts/user/${user}`);
        return response.data; // Devuelve los posts creados por el usuario
    } catch (error) {
        console.error(`Error al obtener posts del usuario ${user}:`, error);
        throw error;
    }
};

// Obtener posts "likeados" por un usuario
export const getPostsLikedByUser = async (user) => {
    try {
        const response = await axiosClient.get(`/posts/user/${user}/liked`);
        return response.data; // Devuelve los posts likeados
    } catch (error) {
        console.error(`Error al obtener posts likeados por el usuario ${user}:`, error);
        throw error;
    }
};

// Agregar un like a un post
export const addLikeToPost = async (postId, user) => {
    try {
        const response = await axiosClient.post(`/posts/${postId}/like`, user, {
            headers: { 'Content-Type': 'text/plain', },
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar el like:', error);
        throw error;
    }
};

// Quitar un like de un post
export const removeLikeFromPost = async (postId, user) => {
    try {
        const response = await axiosClient.delete(`/posts/${postId}/like`, { data: user,
            headers: {'Content-Type': 'text/plain', },
        });
        return response.data;
    } catch (error) {
        console.error('Error al quitar el like:', error);
        throw error;
    }
};

// Exportar la instancia de Axios y las funciones
export default axiosClient;

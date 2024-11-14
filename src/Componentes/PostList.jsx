import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { getCommentsByPostId } from '../utils/axiosClient'; // Importa la función para obtener comentarios desde el backend

function PostList({ posts, filterType, userId }) {
    // Estado para gestionar los "likes" de los posts
    const [likedPosts, setLikedPosts] = useState(
        posts.reduce((acc, post) => ({
            ...acc,
            [post.id]: { liked: post.isLiked || false, likesCount: post.likesCount || 0 }, // Inicializa el estado con los likes de los posts
        }), {})
    );

    // Estado para gestionar la visibilidad de los comentarios de cada post
    const [commentsVisibility, setCommentsVisibility] = useState({});

    // Estado para almacenar los comentarios cargados desde el backend por postId
    const [commentsByPost, setCommentsByPost] = useState({});

    // Ordena los posts por fecha en orden descendente
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    // Filtra los posts según el tipo de filtro seleccionado (todos, del usuario o con like)
    const filteredPosts = sortedPosts.filter((post) => {
        switch (filterType) {
            case 'all': // Todos los posts
                return true;
            case 'user': // Posts creados por el usuario actual
                return post.user === userId;
            case 'liked': // Posts a los que el usuario dio like
                return likedPosts[post.id]?.liked;
            default: // Si no coincide con ningún filtro, no muestra nada
                return false;
        }
    });

    // Maneja el evento de "like" en un post específico
    const handleLike = (postId) => {
        setLikedPosts((prevLikedPosts) => {
            const isLiked = prevLikedPosts[postId].liked; // Comprueba si ya tiene un like
            const newLikesCount = isLiked 
                ? prevLikedPosts[postId].likesCount - 1 // Si tenía like, lo reduce
                : prevLikedPosts[postId].likesCount + 1; // Si no tenía like, lo incrementa

            return {
                ...prevLikedPosts,
                [postId]: { liked: !isLiked, likesCount: newLikesCount }, // Actualiza el estado con el nuevo valor
            };
        });
    };

    // Llama al backend para cargar los comentarios de un post específico
    const fetchCommentsForPost = async (postId) => {
        try {
            const comments = await getCommentsByPostId(postId); // Llama al endpoint del backend
            setCommentsByPost((prev) => ({
                ...prev,
                [postId]: comments, // Almacena los comentarios obtenidos en el estado, indexados por postId
            }));
        } catch (error) {
            console.error(`Error al cargar los comentarios para el post ${postId}:`, error); // Maneja errores de la solicitud
        }
    };

    // Alterna la visibilidad de los comentarios de un post
    const toggleComments = (postId) => {
        setCommentsVisibility((prevVisibility) => ({
            ...prevVisibility,
            [postId]: !prevVisibility[postId], // Cambia el estado de visibilidad del post específico
        }));

        if (!commentsVisibility[postId]) { // Si los comentarios no están visibles, los carga
            fetchCommentsForPost(postId);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Mapea y renderiza los posts filtrados */}
            {filteredPosts.map((post) => (
                <div
                    key={post.id} // Clave única para cada post
                    style={{
                        border: "1px solid white",
                        padding: "20px",
                        margin: "20px 0",
                        maxWidth: "600px",
                        width: "100%"
                    }}
                >
                    {/* Información del usuario y la fecha del post */}
                    <div className="d-flex justify-content-between mb-3">
                        <span>{post.user}</span> {/* Nombre del usuario que creó el post */}
                        <span>{post.date}</span> {/* Fecha de creación del post */}
                    </div>
                    <h4 className="text-center">{post.title}</h4> {/* Título del post */}
                    
                    {/* Imagen del post */}
                    <div className="text-center mb-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img 
                            src={post.image} 
                            alt="post visual" 
                            style={{ 
                                width: '300px',
                                height: '300px',
                                objectFit: 'cover'
                            }} 
                        />
                    </div>

                    <p>{post.content}</p> {/* Contenido del post */}

                    {/* Sección de likes y botón para comentarios */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <span className="me-2">{likedPosts[post.id]?.likesCount}</span> {/* Cantidad de likes */}
                            <FaHeart
                                onClick={() => handleLike(post.id)} // Maneja el evento de "like"
                                style={{ color: likedPosts[post.id]?.liked ? 'red' : 'gray', cursor: 'pointer' }} // Cambia el color según el estado de "like"
                                size={24}
                            />
                        </div>

                        {/* Botón para mostrar/ocultar comentarios */}
                        <button className="btn btn-light" onClick={() => toggleComments(post.id)}>
                            {commentsVisibility[post.id] ? "Ocultar Comentarios" : "Mostrar Comentarios"}
                        </button>
                    </div>

                    {/* Renderiza los comentarios del post si están visibles */}
                    {commentsVisibility[post.id] && (
                        <div className="comments-section mt-3">
                            <h5>Comentarios:</h5>
                            {commentsByPost[post.id] ? ( // Verifica si ya se cargaron los comentarios
                                commentsByPost[post.id].map((comment) => (
                                    <div key={comment.id} className="comment mt-2 p-2 border border-secondary">
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold">{comment.user}</span> {/* Usuario del comentario */}
                                            <span>{new Date(comment.created_at).toLocaleDateString()}</span> {/* Fecha del comentario */}
                                        </div>
                                        <p className="mt-2">{comment.content}</p> {/* Contenido del comentario */}
                                    </div>
                                ))
                            ) : (
                                <p>No hay ningun comentario aun</p> // Mensaje si no hay comentarios cargados
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostList;

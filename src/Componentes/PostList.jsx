import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import {getAllPosts, getPostsByUser, getPostsLikedByUser, getCommentsByPostId, addCommentToPost, addLikeToPost, removeLikeFromPost} from '../utils/axiosClient';
import { useAuth0 } from '@auth0/auth0-react';

function PostList({ fetchType }) {
    const { user } = useAuth0();
    const [posts, setPosts] = useState([]);
    const [commentsData, setCommentsData] = useState({});
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState(""); // Estado para el nuevo comentario

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let fetchedPosts;
                switch (fetchType) {
                    case 'all':
                        fetchedPosts = await getAllPosts();
                        break;
                    case 'user':
                        fetchedPosts = await getPostsByUser(user.name);
                        break;
                    case 'liked':
                        fetchedPosts = await getPostsLikedByUser(user.name);
                        break;
                }
                setPosts(fetchedPosts);
            } 
            catch (err) {
                console.error('Error al cargar los posts:', err);
                setError('No hay posts para mostrar.');
            }
        };
        fetchPosts();
    }, [fetchType, user.name]);

    const handleLike = async (postId) => {
        try {
            const postIndex = posts.findIndex((post) => post.id === postId);
            if (postIndex === -1) return;

            const post = posts[postIndex];
            const likedByArray = (post.likedBy || '').split(',').map((name) => name.trim()).filter(Boolean);
            const isLiked = likedByArray.includes(user.name);

            let updatedPost;
            if (isLiked) {
                await removeLikeFromPost(postId, user.name);
                updatedPost = {
                    ...post,
                    likedBy: likedByArray.filter((u) => u !== user.name).join(', '),
                    likesCount: post.likesCount - 1,
                };
            } 
            else {
                await addLikeToPost(postId, user.name);
                updatedPost = {
                    ...post,
                    likedBy: [...likedByArray, user.name].join(', '),
                    likesCount: post.likesCount + 1,
                };
            }

            setPosts((prevPosts) => {
                const updatedPosts = [...prevPosts];
                if (fetchType === 'liked' && !updatedPost.likedBy.includes(user.name)) {
                    return updatedPosts.filter((_, i) => i !== postIndex);
                }
                updatedPosts[postIndex] = updatedPost;
                return updatedPosts;
            });
        } 
        catch (error) {
            console.error('Error manejando el like:', error);
        }
    };

    const toggleComments = async (postId) => {
        setCommentsData((prev) => ({
            ...prev,
            [postId]: {
                visible: !prev[postId]?.visible,
                comments: prev[postId]?.comments || null,
            },
        }));

        if (!commentsData[postId]?.comments) {
            try {
                const comments = await getCommentsByPostId(postId);
                setCommentsData((prev) => ({
                    ...prev,
                    [postId]: {
                        ...prev[postId],
                        comments,
                    },
                }));
            } 
            catch (error) {
                console.error(`Error al cargar comentarios para el post ${postId}:`, error);
            }
        }
    };

    const handleCreateComment = async (postId) => {
        try {
            if (!newComment.trim()) {
                alert("El comentario no puede estar vacío");
                return;
            }
            const createdComment = await addCommentToPost(postId, user.name, newComment);
            setCommentsData((prev) => ({
                ...prev,
                [postId]: {
                    ...prev[postId],
                    comments: [...(prev[postId]?.comments || []), createdComment],
                },
            }));
            setNewComment(""); // Limpiar el campo de texto
        } 
        catch (error) {
            console.error('Error al crear comentario:', error);
            alert("No se pudo crear el comentario. Intenta de nuevo.");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {posts.map((post) => (
                <div
                    key={post.id}
                    style={{
                        border: "1px solid white",
                        padding: "20px",
                        margin: "20px 0",
                        maxWidth: "600px",
                        width: "100%"
                    }}
                >
                    <div className="d-flex justify-content-between mb-3">
                        <span>{post.user}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-center">{post.titulo}</h4>
                    <div className="text-center mb-3">
                        <img
                            src={`http://localhost:3000${post.imagen}`}
                            alt="Post visual"
                            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                        />
                    </div>
                    <p>{post.descripcion}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <span className="me-2">{post.likesCount}</span>
                            <FaHeart
                                onClick={() => handleLike(post.id)}
                                style={{
                                    color: post.likedBy?.includes(user.name) ? 'red' : 'gray',
                                    cursor: 'pointer',
                                }}
                                size={24}
                            />
                        </div>
                        <button className="btn btn-light" onClick={() => toggleComments(post.id)}>
                            {commentsData[post.id]?.visible ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
                        </button>
                    </div>
                    {commentsData[post.id]?.visible && (
                        <div className="comments-section mt-3">
                            {commentsData[post.id]?.comments ? (
                                commentsData[post.id].comments.map((comment) => (
                                    <div key={comment.id} className="comment mt-2 p-2 border border-secondary">
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold">{comment.user}</span>
                                            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="mt-2">{comment.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No hay comentarios aún.</p>
                            )}
                            <div className="create-comment mt-3">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Escribe un comentario"
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleCreateComment(post.id)}
                                >
                                    Crear Comentario
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostList;

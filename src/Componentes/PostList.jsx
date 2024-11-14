import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { getCommentsByPostId } from '../utils/axiosClient';

function PostList({ posts, filterType, userId }) {
    const [likedPosts, setLikedPosts] = useState(
        posts.reduce((acc, post) => ({
            ...acc,
            [post.id]: { liked: post.isLiked || false, likesCount: post.likesCount || 0 },
        }), {})
    );

    const [commentsVisibility, setCommentsVisibility] = useState({});
    const [commentsByPost, setCommentsByPost] = useState({});

    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    const filteredPosts = sortedPosts.filter((post) => {
        switch (filterType) {
            case 'all':
                return true;
            case 'user':
                return post.authorId === userId;
            case 'liked':
                return likedPosts[post.id]?.liked;
            default:
                return false;
        }
    });

    const handleLike = (postId) => {
        setLikedPosts((prevLikedPosts) => {
            const isLiked = prevLikedPosts[postId].liked;
            const newLikesCount = isLiked ? prevLikedPosts[postId].likesCount - 1 : prevLikedPosts[postId].likesCount + 1;

            return {
                ...prevLikedPosts,
                [postId]: { liked: !isLiked, likesCount: newLikesCount },
            };
        });
    };

    const fetchCommentsForPost = async (postId) => {
        try {
            const comments = await getCommentsByPostId(postId);
            setCommentsByPost((prev) => ({
                ...prev,
                [postId]: comments,
            }));
        } catch (error) {
            console.error(`Error al cargar los comentarios para el post ${postId}:`, error);
        }
    };

    const toggleComments = (postId) => {
        setCommentsVisibility((prevVisibility) => ({
            ...prevVisibility,
            [postId]: !prevVisibility[postId],
        }));

        if (!commentsVisibility[postId]) {
            fetchCommentsForPost(postId);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {filteredPosts.map((post) => (
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
                        <span>{post.date}</span>
                    </div>
                    <h4 className="text-center">{post.title}</h4>
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
                    <p>{post.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <span className="me-2">{likedPosts[post.id]?.likesCount}</span>
                            <FaHeart
                                onClick={() => handleLike(post.id)}
                                style={{ color: likedPosts[post.id]?.liked ? 'red' : 'gray', cursor: 'pointer' }}
                                size={24}
                            />
                        </div>

                        <button className="btn btn-light" onClick={() => toggleComments(post.id)}>
                            {commentsVisibility[post.id] ? "Ocultar Comentarios" : "Mostrar Comentarios"}
                        </button>
                    </div>

                    {commentsVisibility[post.id] && (
                        <div className="comments-section mt-3">
                            <h5>Comentarios:</h5>
                            {commentsByPost[post.id] ? (
                                commentsByPost[post.id].map((comment) => (
                                    <div key={comment.id} className="comment mt-2 p-2 border border-secondary">
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold">{comment.user}</span>
                                            <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="mt-2">{comment.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No hay ningun comentario aun</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostList;

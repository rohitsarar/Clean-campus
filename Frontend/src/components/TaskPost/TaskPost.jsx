import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp } from "react-icons/fa";
import { useAuthContext } from '../../context/Authcontext';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

function TaskPost({ post, currentRole, onLike }) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Listen for 'postLiked' event from server
    socket.on("postLiked", ({ postId }) => {
      if (postId === post._id) {
        setIsLiked(true);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("postLiked");
    };
  }, [post._id]);

  const handleThumbClick = () => {
    if (authUser.role === "peon" && !isLiked) {
      setIsLiked(true);
      onLike(post._id); // Notify parent about the like action
      socket.emit("likePost", { postId: post._id }); // Emit like event to server
    }
  };

  const isValidPhoto = (photo) => {
    return photo && (photo.startsWith('data:image/') || photo.startsWith('http'));
  };

  return (
    <div className="flex flex-col gap-2 border border-slate-200 rounded-lg p-4 max-w-xs mx-auto">
      {/* Post Header */}
      <div className="flex flex-row justify-between items-center p-2 border-b border-slate-200">
        <div className="flex flex-row items-center gap-4">
          <img 
            src={post.usernameImage || 'https://via.placeholder.com/40'} 
            alt={`${post.username}'s profile`} 
            className="h-10 w-10 rounded-full object-cover" 
          />
          <span>{authUser.name}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-2">
        <img 
          src={isValidPhoto(post.photo) ? post.photo : 'https://via.placeholder.com/150'} 
          alt={post.caption || 'Post image'} 
          className="w-full rounded-md" 
        />
        <p className="mt-2">{post.caption}</p>
      </div>

      {/* Action Section */}
      <div className="flex justify-center mt-2">
        {authUser.role === "peon" ? (
          <button 
            onClick={handleThumbClick} 
            aria-label={`Like post by ${post.name}`} 
            disabled={isLiked}
          >
            <FaRegThumbsUp 
              className={`text-3xl cursor-pointer ${isLiked ? 'text-green-500' : 'text-gray-400'}`}
            />
          </button>
        ) : (
          <span 
      className={`text-center text-white p-2 rounded-md ${
        isLiked ? 'bg-green-600' : ''
      }`}
    >
      {isLiked ? "Completed" : "Pending"}
    </span>
         
        )}
      </div>
    </div>
  );
}

TaskPost.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    usernameImage: PropTypes.string, // Optional, could be a URL to the profile image
    photo: PropTypes.string, // Optional, can be a URL or base64 string
    caption: PropTypes.string.isRequired, // Caption for the post
    isLiked: PropTypes.bool, // Status of the post being liked
  }).isRequired,
  currentRole: PropTypes.string.isRequired, // Role of the current user
  onLike: PropTypes.func.isRequired, // Function to handle like action
};

export default TaskPost;

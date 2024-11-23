import React, { useEffect, useState, useRef } from 'react';
import TaskPost from '../TaskPost/TaskPost';
import { io } from 'socket.io-client';
import Button from '../../pages/navbar/buttonnavbar/Button';

function TaskList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io("http://localhost:5000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Socket error handling
    socket.current.on("connect_error", (err) => {
      setError(`Failed to connect to socket server: ${err.message}`);
    });

    socket.current.on("disconnect", () => {
      setError("Disconnected from server.");
    });

    // Fetch posts from API
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch posts");
        }
        const data = await response.json();
        // Sort posts by the newest first when fetching from API
        setPosts(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        setError(err.message.includes('Failed to fetch') ? 'Server unreachable' : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Handle new posts via socket
    socket.current.on("newPost", (newPost) => {
      if (!newPost || !newPost._id) {
        console.error("Invalid newPost object:", newPost);
        return;
      }
      // Add new post at the top
      setPosts((prevPosts) => {
        const isDuplicate = prevPosts.some((post) => post._id === newPost._id);
        if (isDuplicate) return prevPosts;
        return [newPost, ...prevPosts]; // Add new post to the top
      });
    });

    // Handle post like updates via socket
    socket.current.on("postLiked", ({ postId }) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, isLiked: true } : post
        )
      );
    });

    // Cleanup socket connection on unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Handle local like action
  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, isLiked: true } : post
      )
    );

    // Emit the like action to the server
    socket.current.emit("likePost", { postId });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500">Error: {error}</span>
        <button onClick={() => window.location.reload()} className="ml-4 p-2 bg-blue-500 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-2 p-4 section-padding">
      <header className="m-2 p-2">
        <span>Clean-Campus</span>
      </header>
      {posts.length > 0 ? (
        posts.map((post) => (
          <TaskPost
            key={post._id}
            post={post}
            onLike={handleLike} // Pass handleLike to TaskPost
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <img src="no-posts.png" alt="No Posts" className="w-32 h-32" />
          <p className="text-gray-500">No posts available. Be the first to report a task!</p>
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full">
        <Button />
      </div>
    </section>
  );
}

export default TaskList;

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Message from '../components/message/Message';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000'); // Socket initialization

function PhotoClick() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate function
  const [showCamera, setShowCamera] = useState(true);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    // Listen for new posts via socket
    socket.on('newPost', (newPost) => {
      setTaskList((prevTasks) => [newPost, ...prevTasks]); // Prepend new post to the task list
    });

    if (showCamera) {
      getUserCamera();
    } else {
      stopCamera();
    }

    return () => {
      socket.off('newPost'); // Clean up socket listener
      stopCamera(); // Stop camera on unmount
    };
  }, [showCamera]);

  // Fetch all posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/posts');
      if (response.ok) {
        const posts = await response.json();
        setTaskList(posts); // Update taskList state
      } else {
        alert('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.play();
        }
      })
      .catch((error) => console.error('Error accessing camera:', error));
  };

  const stopCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const stream = video.srcObject;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const takePicture = () => {
    const width = 500;
    const height = width / (16 / 9);
    const photo = photoRef.current;
    const video = videoRef.current;

    if (photo && video) {
      photo.width = width;
      photo.height = height;
      const ctx = photo.getContext('2d');
      ctx.drawImage(video, 0, 0, photo.width, photo.height);

      stopCamera();
      setShowCamera(false);
      setPhotoTaken(true);
    }
  };

  const handleSendPost = async () => {
    if (!photoRef.current) {
      alert('No photo taken!');
      return;
    }

    const photoBlob = await new Promise((resolve) =>
      photoRef.current.toBlob(resolve, 'image/png')
    );
    const formData = new FormData();
    formData.append('photo', photoBlob);
    formData.append('caption', inputMessage);
    formData.append('username', 'current'); // Set current username

    try {
      const response = await fetch('http://localhost:5000/api/post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setInputMessage('');
        setPhotoTaken(false);
        setShowCamera(true);
        alert('Post sent successfully!');
        fetchPosts(); // Re-fetch posts after sending
        navigate('/tasklist'); // Navigate to the tasklist page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to send post'}`);
      }
    } catch (error) {
      console.error('Error sending post:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {showCamera && (
        <video ref={videoRef} className="mb-4 w-full max-w-md max-h-64"></video>
      )}
      {!photoTaken && showCamera && (
        <button onClick={takePicture} className="bg-white rounded-full p-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-gray-900"></div>
        </button>
      )}
      <canvas
        ref={photoRef}
        className="w-full max-w-md max-h-64"
        style={{ display: photoTaken ? 'block' : 'none' }}
      ></canvas>
      {photoTaken && (
        <div className="flex flex-col items-center w-full">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Add a caption"
            className="p-2 border rounded mb-2"
          />
          <button onClick={handleSendPost} className="bg-blue-500 text-white px-4 py-2 rounded">
            Send Post
          </button>
        </div>
      )}
      <div className="w-full max-w-md mt-4">
        {taskList.map((task, index) => (
          <Message key={index} message={task.caption} photo={task.photo} />
        ))}
      </div>
    </div>
  );
}

export default PhotoClick;

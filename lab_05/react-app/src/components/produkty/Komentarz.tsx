import React, { useState } from 'react';

// Interfejsy dla propsów i użytkownika
interface User {
  id: number;
  username: string;
  fullName: string;
}

interface KomentarzProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarz: React.FC<KomentarzProps> = ({ id, body, postId, likes, user }) => {
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => setCurrentLikes((prev) => prev + 1);
  const handleDislike = () => setCurrentLikes((prev) => Math.max(prev - 1, 0));

  return (
    <div style={{ border: '1px solid #ddd', padding: '16px', margin: '8px', borderRadius: '8px' }}>
      <h4>{user.fullName} ({user.username})</h4>
      <p>{body}</p>
      <small>Post ID: {postId}, Komentarz ID: {id}</small>
      <div style={{ marginTop: '8px' }}>
        <button onClick={handleLike} style={{ marginRight: '8px' }}>👍</button>
        <button onClick={handleDislike}>👎</button>
        <span style={{ marginLeft: '16px' }}>Likes: {currentLikes}</span>
      </div>
    </div>
  );
};

export default Komentarz;
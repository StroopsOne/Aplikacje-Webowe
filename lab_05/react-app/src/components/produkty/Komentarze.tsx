import React, { useState, useEffect } from 'react';
import Komentarz from './Komentarz';

// Interfejsy dla komentarza i użytkownika
interface User {
  id: number;
  username: string;
  fullName: string;
}

interface Comment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarze: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Pobieranie danych z API
    fetch('https://dummyjson.com/comments')
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
  }, []);

  return (
    <div>
      <h2>Komentarze</h2>
      {isLoading ? (
        <p>Ładowanie komentarzy...</p>
      ) : (
        comments.map((comment) => (
          <Komentarz
            key={comment.id}
            id={comment.id}
            body={comment.body}
            postId={comment.postId}
            likes={comment.likes}
            user={{
              id: comment.user.id,
              username: comment.user.username,
              fullName: comment.user.fullName,
            }}
          />
        ))
      )}
    </div>
  );
};

export default Komentarze;
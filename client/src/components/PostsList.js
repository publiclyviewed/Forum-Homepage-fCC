import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/posts') // local fetch for now
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const users = data.users;
        const topics = data.topic_list.topics.map((topic) => {
          const posters = topic.posters.map((poster) => {
            const user = users.find((user) => user.id === poster.user_id);
            if (user) {
              const avatarUrl = user.avatar_template.replace('{size}', '45'); // Replace size with 45px
              console.log('Generated Avatar URL:', avatarUrl); // Log the avatar URL for verification

              return {
                username: user.username,
                avatar: avatarUrl,
              };
            }
            return null;
          }).filter(Boolean); // Remove any null values

          return { ...topic, posters };
        });
        console.log("Fetched posts: ", topics);
        setPosts(topics);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch posts.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading-message">Loading posts...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <h2>Recent Forum Posts</h2>
      <div className="posts-container">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostsList;

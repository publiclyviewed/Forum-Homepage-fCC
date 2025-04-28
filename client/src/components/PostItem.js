import React from 'react';

// Default avatar placeholder URL
const defaultAvatar = 'https://robohash.org/45';

// Base URL for the forum avatars
const forumBaseUrl = 'https://forum.freecodecamp.org';

const PostItem = ({ post }) => {
  // Function to handle clicking a username and redirecting to their profile
  const handleUserClick = (username) => {
    // Navigate to the user's profile page (assuming the profile URL pattern)
    window.open(`https://forum.freecodecamp.org/u/${username}`, '_blank');
  };

  // Dynamically generate the post URL based on post ID
  const postUrl = `https://forum.freecodecamp.org/t/${post.id}`;

  // Log fetched posts and check URL
  console.log("Fetched posts: ", post);
  console.log("Generated post URL: ", postUrl);

  // Function to normalize avatar URL
  const normalizeAvatarUrl = (avatarUrl) => {
    if (avatarUrl.startsWith('/')) {
      return `${forumBaseUrl}${avatarUrl}`;
    }
    return avatarUrl;
  };

  // Render the post
  return (
    <li className="post-card">
      <h3 className="post-title">
        <a href={postUrl} target="_blank" rel="noopener noreferrer" className="post-link">
          {post.title}
        </a>
      </h3>
      <div className="post-meta">
        <span>Replies: {post.reply_count}</span>
        <span>Views: {post.views}</span>
        <span>Last active: {new Date(post.last_posted_at).toLocaleString()}</span>
      </div>

      {/* List of users who posted in the thread */}
      <div className="post-posters">
        {post.posters && post.posters.length > 0 && post.posters.map((poster, index) => (
          <div key={index} className="poster-info">
            <a href={`https://forum.freecodecamp.org/u/${poster.username}`} target="_blank" rel="noopener noreferrer">
              <img 
                // Normalize avatar URL
                src={normalizeAvatarUrl(poster.avatar || defaultAvatar)} 
                alt={`Avatar of ${poster.username}`}
                className="poster-avatar" 
                onError={(e) => e.target.src = defaultAvatar}  // Fallback on error if the image doesn't load
              />
            </a>
            <span
              className="username"
              onClick={() => handleUserClick(poster.username)}  // Clicking username redirects to profile
            >
              {poster.username}
            </span>
          </div>
        ))}
      </div>
    </li>
  );
};

export default PostItem;

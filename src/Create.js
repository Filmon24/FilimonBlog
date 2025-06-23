import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const location = useLocation(); // Get access to the location object
  const [isEditMode, setIsEditMode] = useState(false);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    // Check if we have blogData in the location state (meaning we are in edit mode)
    if (location.state && location.state.blogData) {
      const { blogData } = location.state;
      setTitle(blogData.title);
      setBody(blogData.body);
      setAuthor(blogData.author);
      setIsEditMode(true);
      setBlogId(blogData.id);
    } else {
      // Reset state if we are not in edit mode (e.g., directly accessing /create)
      setTitle('');
      setBody('');
      setAuthor('');
      setIsEditMode(false);
      setBlogId(null);
    }
  }, [location.state]); // Re-run effect when location.state changes

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) {
      toast.warning("Please fill both the title and the body of the blog.");
      return;
    }

    const blog = { title, body, author };
    let apiUrl = '/api/blogs';
    let httpMethod = 'POST';

    if (isEditMode && blogId) {
      apiUrl = `/api/blogs${blogId}`;
      httpMethod = 'PUT'; // Use PUT for updating
    }

    setIsPending(true);
    fetch(apiUrl, {
      method: httpMethod,
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(blog)
    })
    .then(() => {
      console.log(`${isEditMode ? 'Blog updated' : 'New blog added'}`);
      setIsPending(false);
      toast.success(`Blog ${isEditMode ? 'updated' : 'added'} successfully!`);
      setTimeout(() => {
        history.push('/');
      }, 3000);
    })
    .catch(() => {
      toast.error(`Failed to ${isEditMode ? 'update' : 'add'} blog`);
      setIsPending(false);
    });
  }

  return (
    <div className="create">
      <h2>{isEditMode ? 'Edit Existing Blog' : 'Add a New Blog'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author :</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
          <option value="filmon">filmon</option>
        </select>
        {!isPending && <button type="submit">{isEditMode ? 'Update Blog' : 'Add Blog'}</button>}
        {isPending && <button disabled>{isEditMode ? 'Updating Blog...' : 'Adding Blog...'}</button>}
      </form>
      <ToastContainer />
    </div>
  );
}

export default Create;
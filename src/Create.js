import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.blogData) {
      const { blogData } = location.state;
      setTitle(blogData.title);
      setBody(blogData.body);
      setAuthor(blogData.author);
      setIsEditMode(true);
      setBlogId(blogData.id);
    } else {
      setTitle('');
      setBody('');
      setAuthor('');
      setIsEditMode(false);
      setBlogId(null);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      toast.warning("Please fill both the title and the body of the blog.");
      return;
    }

    const blog = { title, body, author };
    setIsPending(true);

    try {
      if (isEditMode && blogId) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update(blog)
          .eq('id', blogId);

        if (error) throw error;
        
        toast.success('Blog updated successfully!');
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert([blog]);

        if (error) throw error;
        
        toast.success('Blog added successfully!');
      }

      setTimeout(() => {
        history.push('/');
      }, 2000);
    } catch (err) {
      toast.error(`Failed to ${isEditMode ? 'update' : 'add'} blog: ${err.message}`);
    } finally {
      setIsPending(false);
    }
  };

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
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="">Select author</option>
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
};

export default Create;
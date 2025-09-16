import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchBlog = async () => {
      setIsPending(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
        setIsPending(false);
      } else {
        setBlog(data);
        setIsPending(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleClick = async () => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blog.id);

      if (error) {
        toast.error('Failed to delete blog');
      } else {
        toast.warning("You are deleting a blog");
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
    } catch (err) {
      toast.error('Failed to delete blog');
    }
  };

  const handleEdit = () => {
    history.push('/create', { blogData: blog });
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          {blog.image_url && (
            <img
              src={blog.image_url}
              alt={blog.title}
            />
          )}
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
          <button onClick={handleEdit}>Edit Blog</button>
        </article>
      )}
      <ToastContainer />
    </div>
  );
};

export default BlogDetails;
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('/api/blogs' + id);
  const history = useHistory();

  const handleClick = () => {
    fetch('/api/blogs' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      toast.warning("You are deleting a blog");
      setTimeout(() => {
        history.push('/');
      }, 3000);
    });
  };

  const handleEdit = () => {
    history.push('/create', { blogData: blog }); // Navigate to /create with blog data as state
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>Delete</button>
          <button onClick={handleEdit}>Edit Blog</button> {/* Changed onClick to handleEdit */}
        </article>
      )}
      <ToastContainer />
    </div>
  );
};

export default BlogDetails;
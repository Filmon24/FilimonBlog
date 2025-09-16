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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [imageRemoved, setImageRemoved] = useState(false);
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
      if (blogData.image_url) {
        setExistingImageUrl(blogData.image_url);
        setImagePreviewUrl(blogData.image_url);
      } else {
        setExistingImageUrl('');
        setImagePreviewUrl('');
      }
    } else {
      setTitle('');
      setBody('');
      setAuthor('');
      setIsEditMode(false);
      setBlogId(null);
      setExistingImageUrl('');
      setImagePreviewUrl('');
      setImageFile(null);
      setImageRemoved(false);
    }
  }, [location.state]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setImageFile(file);
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImagePreviewUrl(localUrl);
      setImageRemoved(false);
    } else {
      setImagePreviewUrl(existingImageUrl || '');
    }
  };

  const handleRemoveImage = () => {
    if (imagePreviewUrl && imagePreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImageFile(null);
    setImagePreviewUrl('');
    // If we had an existing image from DB, mark as removed to null it out on save
    setImageRemoved(true);
  };

  const getPathFromPublicUrl = (publicUrl) => {
    if (!publicUrl) return '';
    const marker = '/object/public/blog-images/';
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return '';
    return publicUrl.substring(idx + marker.length);
  };

  const uploadImageIfNeeded = async () => {
    // If user removed image and didn't select a new one, delete old and return null
    if (!imageFile) {
      if (imageRemoved && existingImageUrl) {
        const removePath = getPathFromPublicUrl(existingImageUrl);
        if (removePath) {
          await supabase.storage.from('blog-images').remove([removePath]);
        }
        return null;
      }
      return existingImageUrl || null;
    }
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
      const filePath = `blogs/${fileName}`;

      const { error: uploadError } = await supabase
        .storage
        .from('blog-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: imageFile.type || undefined
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase
        .storage
        .from('blog-images')
        .getPublicUrl(filePath);

      const publicUrl = data?.publicUrl || '';
      // If replacing an existing image, delete the old one after successful upload
      if (existingImageUrl) {
        const removePath = getPathFromPublicUrl(existingImageUrl);
        if (removePath) {
          await supabase.storage.from('blog-images').remove([removePath]);
        }
      }
      return publicUrl;
    } catch (err) {
      toast.error(`Image upload failed: ${err.message}`);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      toast.warning("Please fill both the title and the body of the blog.");
      return;
    }

    setIsPending(true);

    try {
      const image_url = await uploadImageIfNeeded();
      const blog = { title, body: body.toLowerCase(), author, image_url };
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
        <label>Blog image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {imagePreviewUrl && (
          <div className="image-preview" style={{ marginTop: '10px' }}>
            <img src={imagePreviewUrl} alt="Selected" />
            <button type="button" className="btn-remove" onClick={handleRemoveImage} style={{ marginTop: '10px' }}>
              Remove image
            </button>
          </div>
        )}
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="">Select author</option>
          <option value="Bemnet">Bemnet</option>
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
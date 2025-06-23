import BlogList from "./BlogList";
import useFetch from "./useFetch";
import homeImage from './images/home.jpg';

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('/api/blogs')
 

  return (
    <div className="home">
      <div className="background-image" style={{ backgroundImage: `url(${homeImage})` }}></div>
      <div className="content-wrapper">
        <h1>Welcome to The My Blog</h1>
        <p className="subtitle">Discover amazing stories and insights from our community</p>
        
        { error && <div className="error">{ error }</div> }
        { isPending && <div className="loading">Loading...</div> }
        { blogs && <BlogList blogs={blogs} title="All Blogs" /> }
      </div>
    </div>

  );
  
}
 
  export default Home;
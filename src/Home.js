import BlogList from "./BlogList";
import useFetch from "./useFetch";
import homeImage from './images/home.jpg';

const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:8001/blogs')
  

  return (
    <div className="home">
      <div style={{ backgroundImage: `url(${homeImage})` }}></div>
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <BlogList blogs={blogs} /> }
    </div>

  );
  
}
 
  export default Home;
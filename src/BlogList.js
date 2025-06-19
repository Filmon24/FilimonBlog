import { Link } from "react-router-dom";
const BlogList = ({blogs, title}) => {
    return ( 
        <>
            <h2 className="blog-list-title">{ title }</h2>
            <div className="blog-list" >
                {blogs.map((blog) => (
                    <div className="blog-preview" key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <h2>{ blog.title }</h2>
                            <p>Written by {blog.author}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BlogList;
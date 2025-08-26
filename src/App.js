import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Footer from './Footer';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // ✅ v2 way to get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // ✅ v2 way to listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // If user is not logged in, show Auth component
  if (!session) return <Auth />;

  // If logged in, show full app
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/blogs/:id" component={BlogDetails} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

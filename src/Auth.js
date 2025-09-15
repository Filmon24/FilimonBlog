import { useState } from "react";
import { supabase } from "./supabaseClient";
import "./index.css"; // make sure this is imported

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Sign up with email + password
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your inbox for a verification email!");
    }
    setLoading(false);
  };

  // 🔹 Sign in with email + password
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Welcome back!");
    }
    setLoading(false);
  };

  // 🔹 Continue with Google
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to My Personal Blog</h1>
        <p className="auth-subtitle">Sign in to continue</p>

        {/* Google Sign In */}
        <button onClick={handleGoogleSignIn} className="google-btn">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
          />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="auth-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading} className="btn primary-btn">
            {loading ? "Loading..." : "Sign In"}
          </button>
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="btn secondary-btn"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        {/* Feedback message */}
        {message && <p className="auth-message">{message}</p>}
      </div>
    </div>
  );
}

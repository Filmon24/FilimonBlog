import { useState } from "react";
import { supabase } from "./supabaseClient";

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

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

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

    const {  error } = await supabase.auth.signInWithPassword({
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
    <div style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}>
      <h2>Welcome to My Personal Blog</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />

        <button type="submit" disabled={loading} style={{ margin: "5px" }}>
          {loading ? "Loading..." : "Sign In"}
        </button>
        <button onClick={handleSignUp} disabled={loading} style={{ margin: "5px" }}>
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <hr />
      <button onClick={handleGoogleSignIn}>Continue with Google</button>

      {message && <p style={{ marginTop: "15px", color: "blue" }}>{message}</p>}
    </div>
  );
}

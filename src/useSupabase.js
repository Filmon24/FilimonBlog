import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const useSupabase = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsPending(true);
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false, nullsLast: true });

        if (error) {
          setError(error.message);
        } else {
          setData(data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchBlogs();
  }, []);

  return { data, isPending, error };
};

export default useSupabase;
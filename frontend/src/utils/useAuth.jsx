import { useEffect, useState } from "react";
import fetcher from "./fetcher";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetcher("/api/auth/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (res.success && res.data?.role) {
          setLoggedIn(true);
          setIsAdmin(res.data.role === "ADMIN");
        } else {
          setLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (err) {
        setLoggedIn(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { loggedIn, isAdmin, loading };
};

export default useAuth;

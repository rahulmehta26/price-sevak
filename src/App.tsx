import { Route, Routes } from "react-router-dom"
import Home from "./page/Home"
import MainLayout from "./layout/MainLayout"
import { useEffect } from "react"
import supabase from "./utils/supabase/supabase"
import { useAuthState } from "./store/useAuthStore"

function App() {

  const setAuth = useAuthState((s) => s.setAuth);

  useEffect(() => {

    const initAuth = async () => {

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        setAuth(data.session);

      } catch (error) {
        console.error("Auth init error:", error)

        setAuth(null);
      }
    }

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (Event, session) => {
        setAuth(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    }

  }, [setAuth])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App

import { Route, Routes } from "react-router-dom"
import Home from "./page/home/Home"
import MainLayout from "./layout/MainLayout"
import { useEffect } from "react"
import supabase from "./utils/supabase/supabase"
import { useAuthState } from "./store/useAuthStore"
import PageNotFound from "./page/error/PageNotFound"
import Overview from "./page/overview/Overview"
import Products from "./page/product/Products"
import Activity from "./page/activity/Activity"
import ProductDetail from "./page/product/ProductDetail"
import Alert from "./page/alert/Alert"

function App() {

  const setAuth = useAuthState((s) => s.setAuth);

  useEffect(() => {

    const initAuth = async () => {

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        setAuth(data.session);

      } catch (error) {

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

        <Route path="/overview" element={<Overview />} />
        <Route path="/products" element={<Products />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/alerts" element={<Alert />} />

        <Route path="*" element={<PageNotFound />} />

      </Route>
    </Routes>
  )
}

export default App

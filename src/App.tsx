import { Route, Routes } from "react-router-dom"
import Home from "./page/home/Home"
import MainLayout from "./layout/MainLayout"
import { lazy, Suspense, useEffect, useState } from "react"
import supabase from "./utils/supabase/supabase"
import { useAuthState } from "./store/useAuthStore"
import Loader from "./components/ui/Loader"
import { useToast } from "./store/useToast"

const Overview = lazy(() => import("./page/overview/Overview"));
const Products = lazy(() => import("./page/product/Products"));
const Activity = lazy(() => import("./page/activity/Activity"));
const ProductDetail = lazy(() => import("./page/product/product-details/ProductDetail"));
const Alert = lazy(() => import("./page/alert/Alert"));
const PageNotFound = lazy(() => import("./page/error/PageNotFound"));

function App() {

  const setAuth = useAuthState((s) => s.setAuth);

  const addToast = useToast((s) => s.addToast)

  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {

    const initAuth = async () => {

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        setAuth(data.session);

      } catch (error) {

        setAuth(null);

        addToast({
          title: "Failed to restore your session. Please sign in again.",
          type: "error"
        });
      } finally {
        setIsAuthReady(true);
      }
    }

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuth(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    }

  }, [setAuth])

  if (!isAuthReady) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader text="Initializing..." />
    </div>
  );

  return (
    <Routes>
      <Route element={<MainLayout />}>

        <Route index element={<Home />} />

        <Route
          path="/overview"
          element={
            <Suspense fallback={<Loader text="Loading page..." />}>
              <Overview />
            </Suspense>
          }
        />

        <Route
          path="/products"
          element={
            <Suspense fallback={<Loader text="Loading page..." />}>
              <Products />
            </Suspense>
          }
        />

        <Route
          path="/activity"
          element={
            <Suspense fallback={<Loader text="Loading page..." />}>
              <Activity />
            </Suspense>
          }
        />

        <Route
          path="/product-detail/:id"
          element={
            <Suspense fallback={<Loader text="Loading page..." />}>
              <ProductDetail />
            </Suspense>
          }
        />

        <Route
          path="/alerts"
          element={
            <Suspense fallback={<Loader text="Loading page..." />}>
              <Alert />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<Loader text="Loading page..." />}>
              <PageNotFound />
            </Suspense>
          }
        />

      </Route>
    </Routes>
  )
}

export default App

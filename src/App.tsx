import { Route, Routes } from "react-router-dom"
import Home from "./page/Home"
import MainLayout from "./layout/MainLayout"

function App() {

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App

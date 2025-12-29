import { Outlet } from 'react-router-dom'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import { cn } from '../utils/cn'


const MainLayout = () => {
    return (
        <main
            className={cn(
                "w-full min-h-screen relative "
            )}
        >

            <Header />

            <Outlet />

            <Footer />

        </main>
    )
}

export default MainLayout
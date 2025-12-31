import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { cn } from '../utils/cn'
import Authmodal from '../components/ui/Authmodal'
import { useAuthModal } from '../store/useAuthModal'


const MainLayout = () => {

    const isOpen = useAuthModal((state) => state.isOpen);

    return (
        <main
            className={cn(
                "w-full min-h-screen relative "
            )}
        >
            {
                isOpen && <Authmodal />
            }

            <Header />

            <Outlet />

            <Footer />

        </main>
    )
}

export default MainLayout
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { cn } from '../utils/cn'
import Authmodal from '../components/ui/Authmodal'
import { useAuthModal } from '../store/useAuthModal'
import { AnimatePresence } from 'motion/react'


const MainLayout = () => {

    const isOpen = useAuthModal((state) => state.isOpen);

    return (
        <main
            className={cn(
                "w-full min-h-screen relative "
            )}
        >
            <AnimatePresence mode="wait">
                {isOpen && <Authmodal />}
            </AnimatePresence>

            <Header />

            <Outlet />

            <Footer />

        </main>
    )
}

export default MainLayout
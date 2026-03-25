import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import InteractionTracker from './InteractionTracker';

/**
 * Layout - Wraps all pages with Navbar, Footer, and InteractionTracker.
 * Demonstrates: Component reusability, React Router Outlet, event monitoring.
 */
const Layout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
            <InteractionTracker />
        </>
    );
};

export default Layout;

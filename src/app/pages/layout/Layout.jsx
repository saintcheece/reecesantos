import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Hero from "../../components/layout/Hero";

export default function Layout({ children, currentPageName}){
    return (
        <>
            <nav>
                <Navbar currentPageName={currentPageName} />
            </nav>
            <Hero/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
}
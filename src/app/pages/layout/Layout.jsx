import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function Layout({ children, currentPageName}){
    return (
        <>
            <Navbar currentPageName={currentPageName} />
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
}
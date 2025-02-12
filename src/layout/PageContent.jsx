import Footer from "./Footer";
import Header from "./Header"

export default function PageContent( {children} ) {
    return(
        <div>
            <Header/>
            <main> {children} </main>
            <Footer/>
        </div>
    );
}
import Footer from "./Footer";
import Header from "./Header"

export default function PageContent( {children} ) {
    //Bu component header ve footer'ın her sayfada aynı şekilde görünmesini sağlıyor. 
    //Componentleri PageContent ile sarmalıyoruz.
    return(
        <div>
            <Header/>
            <main> {children} </main>
            <Footer/>
        </div>
    );
}
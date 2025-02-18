import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";

export default function PageContent({ children }) {
  //Bu component header ve footer'ın her sayfada aynı şekilde görünmesini sağlıyor.
  //Componentleri PageContent ile sarmalıyoruz.
  return (
    <>
      <Header />
      <main className="mx-auto font-montserrat"> {children} </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

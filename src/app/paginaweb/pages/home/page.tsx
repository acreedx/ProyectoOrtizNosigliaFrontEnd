"use client";
import "../../assets/css/animate.css";
import "../../assets/css/LineIcons.css";
import "../../assets/css/main.css";
import "../../assets/css/tiny-slider.css";
import Header from "@/app/paginaweb/components/Header";
import Footer from "@/app/paginaweb/components/Footer";
import Main from "@/app/paginaweb/components/Main";
export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <a
        href="#"
        className="fixed bottom-[30px] right-[30px] z-[9] h-[45px] w-[45px] cursor-pointer rounded-[5px] bg-orange-400 text-center text-[20px] leading-[45px] text-white transition-all duration-300 ease-out hover:bg-[#00adb5b3] hover:text-white"
      >
        <i className="lni lni-arrow-up"></i>
      </a>
    </>
  );
}

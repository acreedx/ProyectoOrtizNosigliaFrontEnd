import React from "react";
import NavBar from "./NavBar";
import Slider from "./Slider";

export default function Header() {
  const copiarTelefono = () => {
    const texto = "591 12345678";
    navigator.clipboard.writeText(texto);
  };
  const copiarCorreo = () => {
    const texto = "OrtizNosiglia@gmail.com";
    navigator.clipboard.writeText(texto);
  };
  return (
    <>
      <header id="home">
        <div className="header-wrapper">
          <div className="header-top bg-orange-500">
            <div className="mx-auto w-full px-[calc(1.5rem*0.5)] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
              <div className="-mx-[calc(1.5rem*0.5)] -mt-[0rem] flex flex-wrap">
                <div className="md:w-2/3">
                  <div className="header-top-left text-md-left text-center">
                    <ul className="mb-0">
                      <li>
                        <a
                          href="#"
                          className="no-underline"
                          onClick={copiarTelefono}
                        >
                          <i className="lni lni-phone"></i> +591 12345678
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="no-underline"
                          onClick={copiarCorreo}
                        >
                          <i className="lni lni-envelope"></i>
                          OrtizNosiglia@gmail.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="header-top-right d-none d-md-block">
                    <ul className="mb-0">
                      <li>
                        <a href="#" className="">
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-twitter-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-instagram-original"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <NavBar />
    </>
  );
}

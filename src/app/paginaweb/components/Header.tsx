import React from "react";
import PersoNavBar from "./PersoNavBar";
export default function Header() {
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
                        <a href="#" className="no-underline">
                          <i className="lni lni-phone"></i> +12345678
                        </a>
                      </li>
                      <li>
                        <a href="#" className="no-underline">
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
      <PersoNavBar />
      <div className="slider-wrapper">
        <section className="slider-section">
          <div className="slider-active slick-style">
            <div className="single-slider img-bg bg-orange-400">
              <div className="mx-auto w-full px-[calc(1.5rem*0.5)] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
                <div className="-mx-[calc(1.5rem*0.5)] -mt-[0rem] flex flex-wrap">
                  <div className="md:w-10/12 lg:w-2/3 xl:w-7/12">
                    <div className="slider-content">
                      <h1
                        className="mb-2 mt-0 text-[calc(1.375rem+1.5vw)] font-medium leading-tight text-[color:var(--bs-heading-color)] xl:text-[2.5rem]"
                        data-animation="fadeInDown"
                        data-duration="1.5s"
                        data-delay=".5s"
                      >
                        Cuida tu salud dental
                      </h1>
                      <p
                        data-animation="fadeInLeft"
                        data-duration="1.5s"
                        data-delay=".7s"
                      >
                        El centro odontológico Ortiz Nosilgia es un centro
                        dedicado a brindar servicios de odontología general a
                        toda la población
                      </p>
                      <a
                        href="#about"
                        className="inline-block  rounded-md border border-transparent  bg-slate-50 px-3 py-1.5 text-base font-normal leading-6 text-current text-orange-500 no-underline shadow-md transition-colors hover:text-orange-700 disabled:pointer-events-none disabled:opacity-65"
                        data-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay=".9s"
                      >
                        Aprender más
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="single-slider img-bg bg-orange-400">
              <div className="mx-auto w-full px-[calc(1.5rem*0.5)] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
                <div className="-mx-[calc(1.5rem*0.5)] -mt-[0rem] flex flex-wrap">
                  <div className="md:w-10/12 lg:w-2/3 xl:w-7/12">
                    <div className="slider-content">
                      <h1
                        className="mb-2 mt-0 text-[calc(1.375rem+1.5vw)] font-medium leading-tight text-[color:var(--bs-heading-color)] xl:text-[2.5rem]"
                        data-animation="fadeInDown"
                        data-duration="1.5s"
                        data-delay=".5s"
                      >
                        Los mejores dentistas de la ciudad
                      </h1>
                      <p
                        data-animation="fadeInLeft"
                        data-duration="1.5s"
                        data-delay=".7s"
                      >
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed dinonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr.
                      </p>
                      <a
                        href="#contact"
                        className="inline-block  rounded-md border border-transparent  bg-slate-50 px-3 py-1.5 text-base font-normal leading-6 text-current text-orange-500 no-underline shadow-md transition-colors hover:text-orange-700 disabled:pointer-events-none disabled:opacity-65"
                        data-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay=".9s"
                      >
                        Aprender más
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="single-slider img-bg bg-orange-400">
              <div className="mx-auto w-full px-[calc(1.5rem*0.5)] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
                <div className="-mx-[calc(1.5rem*0.5)] -mt-[0rem] flex flex-wrap">
                  <div className="md:w-10/12 lg:w-2/3 xl:w-7/12">
                    <div className="slider-content">
                      <h1
                        className="mb-2 mt-0 text-[calc(1.375rem+1.5vw)] font-medium leading-tight text-[color:var(--bs-heading-color)] xl:text-[2.5rem]"
                        data-animation="fadeInDown"
                        data-duration="1.5s"
                        data-delay=".5s"
                      >
                        Tu salud es nuestra prioridad
                      </h1>
                      <p
                        data-animation="fadeInLeft"
                        data-duration="1.5s"
                        data-delay=".7s"
                      >
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed dinonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr.
                      </p>
                      <a
                        href="#services"
                        className="inline-block  rounded-md border border-transparent  bg-slate-50  px-3 py-1.5 text-base font-normal leading-6 text-current text-orange-500 no-underline shadow-md transition-colors hover:text-orange-700 disabled:pointer-events-none disabled:opacity-65"
                        data-animation="fadeInUp"
                        data-duration="1.5s"
                        data-delay=".9s"
                      >
                        Aprender más
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

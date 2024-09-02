import Image from "next/image";
import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="team-section bg-white pb-150 pt-150">
      <div className="shape shape-5">
        <Image
          src="/images/paginaweb/shapes/shape-2.svg"
          alt=""
          width={400}
          height={400}
        />
      </div>
      <div className="shape shape-6">
        <Image
          src="/images/paginaweb/shapes/shape-5.svg"
          alt=""
          width={400}
          height={400}
        />
      </div>
      <div className="mx-auto w-full px-[calc(1.5rem*0.5)] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
        <div className="-mx-[calc(1.5rem*0.5)] -mt-[0rem] flex flex-wrap">
          <div className="mx-auto mt-[0rem] w-full max-w-full flex-shrink-0 px-[calc(1.5rem*0.5)] xl:w-2/3">
            <div className="section-title mb-55 text-center">
              <span
                className="wow fadeInDown font-raleway mb-[15px] block text-[25px] font-semibold text-orange-400"
                data-wow-delay=".2s"
              >
                Reservas
              </span>
              <h2
                className="wow fadeInUp mb-2 mt-0 text-[calc(1.325rem+0.9vw)] font-medium leading-[1.2] md:text-[2rem]"
                data-wow-delay=".4s"
              >
                Has una reserva ahora!
              </h2>
              <p className="wow fadeInUp" data-wow-delay=".6s">
                Puedes registrarte en línea y hacer una reserva en menos de 1
                minuto
                <br />
              </p>
              <br />
              <a
                href="https://rebrand.ly/medic-ud"
                rel="nofollow"
                className="inline-block  rounded-md border  border-transparent bg-transparent px-3 py-1.5 text-base font-normal leading-6 text-current text-orange-500 no-underline shadow-md transition-colors  hover:text-orange-700 disabled:pointer-events-none disabled:opacity-65"
              >
                Reserva tu cita ahora!
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

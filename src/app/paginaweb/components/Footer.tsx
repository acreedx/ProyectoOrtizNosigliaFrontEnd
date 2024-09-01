import Image from "next/image";
import "@/app/paginaweb/assets/css/footer.css";
export default function Footer() {
  return (
    <footer className="footer img-bg h-full pt-100">
      <div className="mx-auto w-full px-[calc(1.5rem*0.5)] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px]">
        <div className="footer-widget-wrapper">
          <div className="-mx-[calc(1.5rem*0.5)] -mt-[0rem] flex flex-wrap">
            <div className="mt-[0rem] w-full max-w-full flex-shrink-0 px-[calc(1.5rem*0.5)] md:w-1/2 lg:w-5/12 xl:w-1/3">
              <div className="footer-widget mb-30">
                <a href="index.html" className="logo">
                  <Image
                    src="/images/logo/logo.png"
                    alt=""
                    width={110}
                    height={110}
                  />
                </a>
                <p className="mb-4 mt-0">
                  El centro odontológico Ortiz Nosiglia es un centro dedicado a
                  brindar servicios de odontología a toda la población
                </p>
                <div className="footer-social-links">
                  <ul className="mb-4 mt-0 pl-8">
                    <li>
                      <a href="#">
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
            <div className="md:w-1/2 lg:w-1/4 xl:w-1/6">
              <div className="footer-widget mb-30">
                <h4>Links</h4>
                <ul className="footer-links mb-4 mt-0 pl-8">
                  <li>
                    <a className="no-underline" href="#">
                      Inicio
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-5/12 lg:w-1/4 xl:w-1/6">
              <div className="footer-widget mb-30">
                <h4>Reservas</h4>
                <ul className="footer-links mb-4 mt-0 pl-8">
                  <li>
                    <a className="no-underline" href="#">
                      Implantes
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Ortodoncia
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Tratamiento de caries
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-7/12 lg:w-full xl:w-1/3">
              <div className="footer-widget mb-30">
                <h4>Ubicación del centro</h4>
                <div className="map-canvas">
                  <iframe
                    className="map"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=Mission%20District%2C%20San%20Francisco%2C%20CA%2C%20USA&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

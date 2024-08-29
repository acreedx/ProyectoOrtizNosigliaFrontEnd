import Image from "next/image";
import "@/app/assets/css/footer.css";
export default function Footer() {
  return (
    <footer className="footer img-bg h-full pt-100">
      <div className="container">
        <div className="footer-widget-wrapper">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6">
              <div className="footer-widget mb-30">
                <a href="index.html" className="logo">
                  <Image
                    src="/paginawebimages/logo/logo.png"
                    alt=""
                    width={110}
                    height={110}
                  />
                </a>
                <p>
                  El centro odontológico Ortiz Nosiglia es un centro dedicado a
                  brindar servicios de odontología a toda la población
                </p>
                <div className="footer-social-links">
                  <ul>
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
            <div className="col-xl-2 col-lg-3 col-md-6">
              <div className="footer-widget mb-30">
                <h4>Links</h4>
                <ul className="footer-links">
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
            <div className="col-xl-2 col-lg-3 col-md-5">
              <div className="footer-widget mb-30">
                <h4>Reservas</h4>
                <ul className="footer-links">
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
            <div className="col-xl-4 col-lg-12 col-md-7">
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

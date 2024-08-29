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
                  Lorem ipsum dolor serit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore dolore magna
                  aliquyam erat diam voluptua.
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
                <h4>Quick Link</h4>
                <ul className="footer-links">
                  <li>
                    <a className="no-underline" href="#">
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Services
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Doctor
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-5">
              <div className="footer-widget mb-30">
                <h4>Quick Link</h4>
                <ul className="footer-links">
                  <li>
                    <a className="no-underline" href="#">
                      Cardiology
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Neurology
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Gastroenterology
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Routine Checkup
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Orthopedics
                    </a>
                  </li>
                  <li>
                    <a className="no-underline" href="#">
                      Dental Surgery
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-12 col-md-7">
              <div className="footer-widget mb-30">
                <h4>Medical Location</h4>
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

import React, { JSXElementConstructor } from "react";
import Neurology from "./Icons/Neurology";
interface ServiceCardProps {
  title: string;
  description: string;
  url: string;
  iconComponent: React.ReactNode;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  iconComponent,
  url,
}) => {
  return (
    <div className="md:w-1/2 lg:w-1/3">
      <div className="service-item mb-[30px]">
        <div className="service-icon mb-[50px]">{iconComponent}</div>
        <div className="service-content">
          <h4 className="m-0 font-raleway text-[25px] font-semibold text-[#393e46]">
            {title}
          </h4>
          <p className="m-0 text-[18px] font-normal leading-[28px] text-[#8c96a7]">
            {description}
          </p>
          <a
            href={url}
            className="read-more inline-block text-orange-500 no-underline transition-all duration-300 ease-out hover:text-orange-700  focus:shadow-none focus:outline-none"
          >
            Aprender más{" "}
            <i className="lni lni-arflex -mt-[0rem]-right -mx-[calc(1.5rem*0.5)] inline-block flex-wrap no-underline"></i>
          </a>
        </div>
        <div className="service-overlay img-bg"></div>
      </div>
    </div>
  );
};
export default ServiceCard;

import React from "react";
import Slider from "react-slick"; // Import React Slick
import { ArrowRightIcon } from "@heroicons/react/24/solid"; // Import Heroicons

const CarouselAndAboutUs: React.FC = () => {
  // React Slick settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container-xxl py-14">
      <div className="container mx-auto" style={{ maxWidth: "1500px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Carousel Section */}
          <div className="wow fadeInUp flex justify-center sm:ml-2">
            <Slider {...settings} className="w-full">
              {/* First Carousel Item */}
              <div className="relative">
                <img
                  className="img-fluid object-contain w-full max-h-[600px]" // Ensure full width and height
                  src="assets/img/seal_cameroon.jpg"
                  alt="Seal of Cameroon"
                />
              </div>
              {/* Second Carousel Item */}
              <div className="relative">
                <img
                  className="img-fluid object-cover w-full h-[600px]" // Ensure full width and height
                  src="assets/img/lccview1.jpg"
                  alt="Limbe City"
                />
              </div>
            </Slider>
          </div>

          {/* About Us Section */}
          <div className="wow fadeInUp lg:ml-5 sm:ml-6 sm-732:ml-5">
            <h6 className="bg-white text-start text-primary pe-3 mb-5" 
            style={{fontSize: "20px"}}>
              <span className="text-[#709ec9] text-lg font-bold">About Us</span>
            </h6>
            <h1 className="mb-4 font-bold text-2xl">Welcome to the LCIMS</h1>
            <p className="mb-4">
              The Limbe City Information Management System (LCIMS) centralizes
              data collection and streamlines tax and revenue management.
            </p>
            <p className="mb-4">
              LCIMS features modules for house numbering, tax identification, and a
              user-friendly dashboard for city revenue insights. LCIMS also offers APIs
              for integrating third-party solutions, enabling tailored applications to
              meet the city’s needs.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <ArrowRightIcon className="h-5 w-5 text-[#709ec9] mr-2" />
                <p className="mb-0">Register your House</p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="h-5 w-5 text-[#709ec9] mr-2" />
                <p className="mb-0">Register your Service</p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="h-5 w-5 text-[#709ec9] mr-2" />
                <p className="mb-0">Identify how much tax you will pay</p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="h-5 w-5 text-[#709ec9] mr-2" />
                <p className="mb-0">Navigate through Limbe City easily</p>
              </div>
            </div>
            <a className="btn btn-primary bg-[#709ec9] text-white hover:bg-[#575447] rounded py-3 px-5 mt-3 inline-block" href="#">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselAndAboutUs;

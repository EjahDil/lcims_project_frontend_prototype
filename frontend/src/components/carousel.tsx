import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
  };

  return (
    <div className="w-full mb-10">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="relative h-[500px] lg:h-[600px] sm-211:h-[800px]">
          <img
            className="w-full h-full object-cover"
            src="assets/img/lccview1.jpg"
            alt="Limbe City"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(24, 29, 56, 0.7)" }}
          >
            <div className="container mx-auto px-4 flex flex-col items-start">
              <div className="w-full lg:w-3/4">
                <h5 className="text-primary text-sm uppercase mb-3 animate-slideInDown">
                  <span className="text-[#709ec9]">Limbe City Council Tech</span>
                </h5>
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold animate-slideInDown">
                  Limbe City Information Management System
                </h1>
                <p className="text-lg md:text-xl text-white mb-4 mt-8">
                  The LCIMS is an innovative solution developed by the Limbe
                  City Council to enhance the daily lives of both Limbe's
                  residents and visitors.
                </p>
                <div className="flex space-x-4 mt-4 xs:space-x-0 sm-238:hidden">
                  <a href="#" className="bg-[#709ec9] hover:bg-[#575447] text-white py-3 px-6 rounded-md animate-slideInRight xs:hidden">
                    Read More
                  </a>
                  <a href="#" className="flex bg-[#709ec9] hover:bg-[#575447] text-white py-3 px-8 rounded-md animate-slideInRight xs:justify-start">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[500px] lg:h-[600px] sm-211:h-[800px]">
          <img
            className="w-full h-full object-cover"
            src="assets/img/welcomelimbe.jpg"
            alt="Welcome to Limbe"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(24, 29, 56, 0.7)" }}
          >
            <div className="container mx-auto px-4 flex flex-col items-start">
              <div className="w-full lg:w-3/4">
                <h5 className="text-primary text-sm uppercase mb-3 animate-slideInDown">
                  <span className="text-[#709ec9]">Limbe City Council Tech</span>
                </h5>
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold animate-slideInDown">
                  Navigate through the city of Limbe with ease.
                </h1>
                <p className="text-lg md:text-xl text-white mb-4 mt-8">
                  The LCIMS is an innovative solution developed by the Limbe
                  City Council to enhance the daily lives of both Limbe's
                  residents and visitors.
                </p>
                <div className="flex space-x-4 mt-4 xs:space-x-0 sm-238:hidden">
                  <a href="#" className="bg-[#709ec9] hover:bg-[#575447] text-white py-3 px-6 rounded-md animate-slideInRight xs:hidden">
                    Read More
                  </a>
                  <a href="#" className="bg-[#709ec9] hover:bg-[#575447] text-white py-3 px-8 rounded-md animate-slideInRight">
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;

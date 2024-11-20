import React from "react";

const ServiceDetail: React.FC = () => {
  return (
    <div className="main-container py-10">
      {/* Services Title */}
      <div className="text-center">
        <h6
          className="bg-white text-center px-3 mb-5"
          style={{ color: "#709ec9", fontSize: "20px", fontWeight: "bold" }}
        >
          Our Services
        </h6>
      </div>

      {/* Services Grid */}
      <div className="flex justify-center">
        <div className="max-w-7xl w-full">
          <div className="flex flex-wrap justify-center">
            {/* Service Box Common Styles */}
            {[
              {
                title: "Register Your House",
                description: "Easily register your house with our system and get accurate address allocation.",
                imageSrc: "assets/img/lccview1.jpg",
              },
              {
                title: "Register Your Service",
                description: "Register your service to enhance the efficiency of our city’s services management.",
                imageSrc: "assets/img/lccview1.jpg",
              },
              {
                title: "Identify How Much Tax You Will Pay",
                description: "Find out the tax amount for your property based on its address and type.",
                imageSrc: "assets/img/lccview1.jpg",
              },
              {
                title: "Navigate Through Limbe City Easily",
                description: "Utilize our system to find your way around Limbe City with ease and no stress.",
                imageSrc: "assets/img/lccview1.jpg",
              },
            ].map((service, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-4">
                <div className="shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h5 className="font-bold text-lg">{service.title}</h5>
                    <p className="text-sm mt-2 flex-grow">{service.description}</p>
                    <div className="mt-4 flex space-x-2">
                      <a
                        href="#"
                        className="bg-[#709ec9] text-white py-2 px-6 rounded hover:bg-[#575447] transition-colors"
                      >
                        Log in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;

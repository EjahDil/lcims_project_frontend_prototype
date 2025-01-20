import React, { useEffect, useState } from "react";

const UserServiceDetail: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if the token exists, otherwise false
  }, []);

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
            {[
              {
                title: "Register Your Infrastructure",
                description:
                  "Easily register your infrastructure with our system at LCC and get accurate address allocation.",
                imageSrc: "/assets/img/lccview1.jpg",
              },
              {
                title: "Register Your Property",
                description:
                  "Register your property at LCC to enhance the efficiency of our city’s services management.",
                imageSrc: "/assets/img/lccview1.jpg",
              },
              {
                title: "Identify How Much Tax You Will Pay",
                description:
                  "Find out the tax amount for your property based on its address and type.",
                imageSrc: "/assets/img/lccview1.jpg",
              },
              {
                title: "Pay your taxes using this platform",
                description:
                  "Utilize our platform to complete your tax payments with ease and convenience.",
                imageSrc: "/assets/img/lccview1.jpg",
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
                    <p className="text-sm mt-2 flex-grow">
                      {service.description}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      {!isLoggedIn ? (
                        <a
                          href="/login"
                          className="bg-[#709ec9] text-white py-2 px-6 rounded hover:bg-[#575447] transition-colors"
                        >
                          Log in
                        </a>
                      ) : (
                        <a
                          href="/service-details"
                          className="hidden bg-[#709ec9] text-white py-2 px-6 rounded hover:bg-[#575447] transition-colors"
                        >
                          Read More
                        </a>
                      )}
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

export default UserServiceDetail;

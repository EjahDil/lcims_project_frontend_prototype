import React from "react"
import Carousel from "../components/carousel";
import ServiceSection from "../components/serviceSection";
import CarouselAndAboutUs from "../components/aboutUs";
import ServiceDetail from "../components/serviceDetails";



const Home  = () => {

    return (
        <React.Fragment>
    <div className="overflow-x-hidden">
      <main>
        <Carousel />
        {/* Other sections/components can be added here */}
        <ServiceSection/>
        <CarouselAndAboutUs/>
        <ServiceDetail/>
      </main>
    </div>
        </React.Fragment>
    )
}

export default Home;
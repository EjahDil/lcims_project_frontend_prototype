import React from "react"
import useTitle from "../hooks/useTitle";
import UserCarousel from "../components/userCarousel";
import UserServiceDetail from "../components/userServiceDetails";
import UserFooter from "../components/userFooter";
import UserServiceSection from "../components/userServiceSection";
import UserCarouselAndAboutUs from "../components/userAboutUs";



const UserHome  = () => {
  useTitle('Home - LCIMS');
    return (
        <React.Fragment>
    <div className="overflow-x-hidden">
      <main>
        <UserCarousel />
        {/* Other sections/components can be added here */}
         <UserServiceSection/>
        <UserCarouselAndAboutUs/>
        <UserServiceDetail/>
         <UserFooter/> 
      </main>
    </div>
        </React.Fragment>
    )
}

export default UserHome;
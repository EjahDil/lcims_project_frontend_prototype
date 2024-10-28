import React from "react";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline"; // For non-social media icons
import { FaTwitter, FaFacebook, FaYoutube, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa"; // For social media icons

const Footer: React.FC = () => {
  return (
    <div className="bg-[#709ec9] text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto mb-10 px-4 flex flex-wrap justify-between gap-5">
        
        {/* Logo Section */}
        <div className="flex-1 max-w-xs ml-6 pt-20 pr-4 justify-center">
          <img src="assets/img/seal_new.png" alt="Seal" className="w-1/3 h-auto p-1" />
        </div>

        {/* Quick Links */}
        <div className="flex-1 max-w-xs pt-10 px-4 flex flex-col">
          <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
          <ul>
            <li><a href="/propertyform" className="block mb-2">Forms</a></li>
            <li><a href="/tax-identification" className="block mb-2">Tax Identification</a></li>
            <li><a href="#" className="block mb-2">Limbe GIS</a></li>
            <li><a href="#" className="block mb-2">Contact Us</a></li>
            <li><a href="#" className="block mb-2">Privacy Policy</a></li>
            <li><a href="#" className="block mb-2">Terms & Conditions</a></li>
            <li><a href="#" className="block mb-2">FAQs & Help</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex-1 max-w-xs pt-10 px-4 flex flex-col">
          <h4 className="mb-4 text-lg font-semibold">Contact</h4>
          <p className="flex items-center mb-2">
            <MapPinIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Gardens, Limbe, Cameroon
          </p>
          <p className="flex items-center mb-2">
            <PhoneIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            +237 6
          </p>
          <p className="flex items-center mb-2">
            <FaEnvelope className="h-5 w-5 mr-2" aria-hidden="true" />
            info@example.cm
          </p>
          <div className="flex gap-2 pt-4">
            <a href="#" className="border border-white rounded-full w-8 h-8 flex items-center justify-center">
              <FaTwitter className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#" className="border border-white rounded-full w-8 h-8 flex items-center justify-center">
              <FaFacebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#" className="border border-white rounded-full w-8 h-8 flex items-center justify-center">
              <FaYoutube className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#" className="border border-white rounded-full w-8 h-8 flex items-center justify-center">
              <FaLinkedin className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Logo Section 2 */}
        <div className="flex-1 max-w-xs ml-auto pr-4 pt-20 justify-center">
          <img src="assets/img/lcims_new.png" alt="LCIMS" className="w-1/3 h-auto p-1" />
        </div>
      </div>

      {/* White Line Divider */}
      <hr className="border-t border-white opacity-50 mx-4" />

      {/* Copyright Section */}
      <div className="bg-[#709ec9] py-4 text-center">
        <div className="max-w-7xl mx-auto flex justify-between px-4">
          <div className="text-left whitespace-nowrap">
            &copy;{" "}
            <a href="#" className="underline">Your Site Name</a>, All Rights Reserved.
            Designed By <a href="https://htmlcodex.com" className="underline">HTML Codex</a>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-white">Home</a>
            <a href="#" className="text-white">Cookies</a>
            <a href="#" className="text-white">Help</a>
            <a href="#" className="text-white">FAQs</a>
          </div>
        </div>
      </div>

    {/* Signatures Section */}
    <div className="max-w-7xl mx-auto px-4 pt-2">
      <h4 className="text-lg font-semibold">Developed By:</h4>
      <div className="flex items-center space-x-2 pt-2">
        <p className="mr-2">Dilan - Software Engineer / Data Scientist</p>
        <div className="flex space-x-2">
          <a
            href="https://www.linkedin.com/in/ejah-dilan-a1259b26b"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <FaLinkedin className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/EjahDil"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <FaGithub className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-2">
        <p className="mr-2">Michel - Data Scientist / Cybersecurity Engineer</p>
        <div className="flex space-x-2">
          <a
            href="https://www.linkedin.com/in/michel"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <FaLinkedin className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href="https://github.com/michel"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <FaGithub className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
</div>

    </div>
  );
};

export default Footer;

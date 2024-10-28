import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const FormNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const infrastructureSection = document.getElementById('infrastructure-form');
      const propertySection = document.getElementById('property-form');

      if (infrastructureSection && propertySection) {
        const infrastructureRect = infrastructureSection.getBoundingClientRect();
        const propertyRect = propertySection.getBoundingClientRect();

        if (infrastructureRect.top >= 0 && infrastructureRect.top <= window.innerHeight / 2) {
          setActiveSection('infrastructure-form');
        } else if (propertyRect.top >= 0 && propertyRect.top <= window.innerHeight / 2) {
          setActiveSection('property-form');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen pt-80 mt-60 ml-40">
      <nav className="p-4">
        <ul className="space-y-4">
          <li>
            <Link 
              to="infrastructure-form" 
              smooth={true} 
              duration={500} 
              className={`cursor-pointer ${activeSection === 'infrastructure-form' ? 'text-[#709ec9] font-bold' : 'text-black-800 font-bold'}`}
            >
              Infrastructure Form
            </Link>
          </li>
          <li>
            <Link 
              to="property-form" 
              smooth={true} 
              duration={500} 
              className={`cursor-pointer ${activeSection === 'property-form' ? 'text-[#709ec9] font-bold' : 'text-black-800 font-bold'}`}
            >
              Property Form
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FormNavigation;

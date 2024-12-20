import PropertiesTable from "../tables/propertiesTable";

const PropertyManagement = () => {
  return (
    <div className="p-5 flex flex-col items-center">
      {/* Centered Title */}
      <div className="relative overflow-hidden whitespace-nowrap border-gray-700 text-5xl font-bold text-black-700 w-[20ch] h-[53px] animate-typing text-center">
        Property Management
        <span className="absolute top-0 right-0 border-r-4 border-gray-700 animate-blink"></span>
      </div>

      <div className="mt-16 w-full">
        <PropertiesTable />
      </div>
    </div>
  );
};

export default PropertyManagement;

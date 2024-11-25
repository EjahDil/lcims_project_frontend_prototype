import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface PermissionsContextProps {
  permissions: string[]; // List of permissions the user has
  checkPermission: (permission: string) => boolean; // Method to check if the user has a specific permission
}

const PermissionsContext = createContext<PermissionsContextProps>({
  permissions: [],
  checkPermission: () => false,
});

export const usePermissions = () => useContext(PermissionsContext);

interface PermissionsProviderProps {
  children: ReactNode; // Define the children prop type
}

export const PermissionsProvider: React.FC<PermissionsProviderProps> = ({ children }) => {
  const [permissions, setPermissions] = useState<string[]>([]);

  // Load permissions from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setPermissions(user.permissions || []); // Retrieve permissions from the user object
    }
  }, []);

  const checkPermission = (permission: string): boolean => {
    return permissions.includes(permission);
  };

  return (
    <PermissionsContext.Provider value={{ permissions, checkPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
};

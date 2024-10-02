// UpdateContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context value
interface UpdateContextType {
  updateSetting: boolean;
  triggerUpdateSetting: () => void;
}

// Create the context with a default value
const UpdateContext = createContext<UpdateContextType | undefined>(undefined);

// Create the provider component
export const UpdateSettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [updateSetting, setUpdateSetting] = useState<boolean>(false);

  const triggerUpdateSetting = () => {
    setUpdateSetting(prev => !prev);
  };

  return (
    <UpdateContext.Provider value={{ updateSetting, triggerUpdateSetting }}>
      {children}
    </UpdateContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUpdateSetting = (): UpdateContextType => {
  const context = useContext(UpdateContext);
  if (context === undefined) {
    throw new Error('useUpdateSetting must be used within an UpdateProvider');
  }
  return context;
};
import { ReactNode, createContext, useContext, useState } from "react";

type ContextProps = {
    children: ReactNode;
};

type JobContextType = {
    selectedCompanies: any; 
    setSelectedCompanies: React.Dispatch<React.SetStateAction<any>>;
};


const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: ContextProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState(null);

  return (
    <JobContext.Provider value={{ selectedCompanies, setSelectedCompanies }}>
      {children}
    </JobContext.Provider>
  );
};

export const useCompaniesDescription = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useCompaniesDescription must be used within a JobProvider");
  }
  return context;
};

import { createContext, FC, useCallback, useContext, useState } from "react";

export enum DataNames {
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  phone = "phoneNumber",
  hasPhone = "hasPhone",
  files = "files"
}

export type IData = {
  [DataNames.firstName]: string;
  [DataNames.lastName]: string;
  [DataNames.email]: string;
  [DataNames.hasPhone]: boolean;
  [DataNames.phone]?: string | null;
  [DataNames.files]?: File[];
};

type IContext = {
  data: IData;
  setValues(values: Partial<IData>): void;
};

type IProvider = {
  children: React.ReactNode;
};

const DataContext = createContext({} as IContext);

export const DataProvider: FC<IProvider> = ({ children }) => {
  const [data, setData] = useState({} as IData);

  const setValues = useCallback((values: Partial<IData>) => {
    setData((prev) => ({
      ...prev,
      ...values,
    }));
  }, []);

  return (
    <DataContext.Provider value={{ data, setValues }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};

import { createContext, useState } from "react";

export const CityContext = createContext({
  location: "Sao Paulo",
  setLocation: () => {},
});

export const CityContextProvider = ({ children, initial = "Sao Paulo" }) => {
  const [location, setLocation] = useState(initial);

  return <CityContext.Provider value={{ location, setLocation }}>{children}</CityContext.Provider>;
};

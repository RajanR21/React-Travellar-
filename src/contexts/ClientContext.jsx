import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(function () {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);

        const data = await res.json();
        //console.log(data);
        setCities(data);
      } catch (err) {
        alert("error while fetching data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, loading }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  console.log(context);
  if (context === undefined)
    throw new Error("client is outside of the conte provider");

  return context;
}

export { CitiesProvider, useCities };

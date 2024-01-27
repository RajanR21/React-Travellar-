import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentcity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      const data = await res.json();
      //console.log(data);
      setCurrentCity(data);
    } catch (err) {
      alert("error while fetching data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, loading, currentcity, getCity }}>
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

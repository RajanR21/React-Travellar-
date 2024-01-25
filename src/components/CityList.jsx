import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/ClientContext";

const CityList = () => {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;

  if (cities.length == 0) return <Message />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;

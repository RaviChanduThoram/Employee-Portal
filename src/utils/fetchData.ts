import React from "react";
import axios from "axios";
interface Employee {
  id: number;
  name: string;
  path: string;
}


const fetchData = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get("/db.json");
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    const data: Employee[] = response.data;

    return data;
  } catch (error) {
    console.error("There was an error fetching data:", error);
    throw error;
  }
};

export default fetchData;


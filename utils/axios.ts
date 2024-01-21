import axios from "axios";

export const getData = async (fields: any) =>
  axios.post("/api/predict-using-data", fields);

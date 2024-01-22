import axios from "axios";

export const getData = async (fields: any) =>
  axios.post("api/routes/predict-using-data", fields);

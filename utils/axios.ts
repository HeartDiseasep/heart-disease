import axios from "axios";

export const getData = async (fields: any) =>
  axios.get("https://heartdiseaseprediction.pythonanywhere.com/getreport", {
    params: fields,
  });
// export const getData = async (fields: any) =>
//   axios.post("api/routes/predict-using-data", fields);

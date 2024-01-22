import { spawn } from "child_process";
/**
 * Run python script, pass in `-u` to not buffer console output
 * @return {ChildProcess}
 */

export async function runScript({
  blood_pressure,
  cholesterol,
  fasting_sugar,
  max_heart_rate,
  resting_ecg,
}: {
  cholesterol: any;
  fasting_sugar: any;
  resting_ecg: any;
  blood_pressure: any;
  max_heart_rate: any;
}) {
  const process: any = spawn("python", [
    "-u",
    // path.join(__dirname, "./scripts/Heart disease Prediction.py"),
    "./scripts/Heart disease Prediction.py",
    "--cholesterol",
    cholesterol,
    "--fasting_sugar",
    fasting_sugar,
    "--resting_ecg",
    resting_ecg,
    "--blood_pressure",
    blood_pressure,
    "--max_heart_rate",
    max_heart_rate,
  ]);
  let data = "";

  process.stdout.on("data", (indata) => {
    data = `${indata}`;
  });
  return new Promise((resolve) => {
    process.stdout.on("close", () => resolve(data));
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const process: any = await runScript(body);
  return Response.json(JSON.parse(process));
  // return Response.json({});
}

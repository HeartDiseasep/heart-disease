import { runScript } from "@/app/api/predict-using-data/process-spawner";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  const process: any = await runScript(body);
  return Response.json(JSON.parse(process));
}

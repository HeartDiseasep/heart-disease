"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Login from "@/components/login-screen";
import PatientInfo from "@/components/patient-Info";
import Dialogue from "@/components/ui/alert-dialogue";
import { createContext, useState } from "react";

export const FormDataContext = createContext({} as any);

export default function Home() {
  const [loginInfo, setLoginInfo] = useState<null | any>(null);

  const [response, setResponse] = useState<null | any>(null);

  const clearData = () => {
    setLoginInfo(null);
    setResponse(null);
  };

  return (
    <FormDataContext.Provider
      value={{ loginInfo, setLoginInfo, response, setResponse, clearData }}
    >
      <div className="flex min-h-screen  items-center gap-4  justify-center">
        {!!response ? (
          <Dialogue
            content={response}
            open={!!response}
            setOpen={() => {
              clearData();
            }}
          />
        ) : null}
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Health predictor</CardTitle>
            <CardDescription>Predict the health of patient.</CardDescription>
          </CardHeader>
          <CardContent>{loginInfo ? <PatientInfo /> : <Login />}</CardContent>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>General Limits</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>BP: (Low blood pressure) 90-140 (High blood pressure)</div>
            <div>Cholestorl: 125-200 Age above 20</div>
            <div>Heart rate: 100-200 age above 20</div>
          </CardContent>
        </Card>
      </div>
    </FormDataContext.Provider>
  );
}

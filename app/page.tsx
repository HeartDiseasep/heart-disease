"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getData } from "@/utils/axios";

import { Controller, useForm } from "react-hook-form";
import { FormSchema } from "@/utils/schema/form-schema";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Dialogue from "@/components/ui/alert-dialogue";
import Login from "@/components/login-screen";
import PatientInfo from "@/components/patient-Info";

export default function Home() {
  const [isLogin, setIslogin] = useState(false);
  const [isFetching, setIsfetching] = useState(false);
  const [response, setResponse] = useState<null | any>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blood_pressure: 100,
      cholesterol: 100,
      fasting_sugar: 0,
      max_heart_rate: 90,
      resting_ecg: 1,
    },
  });
  const postdata = async (values: any) => {
    try {
      setIsfetching(true);
      const { data } = await getData(values);
      setIsfetching(false);
      setResponse(data.data);
    } catch (error) {}
  };

  return (
    <>
      {
        <form
          onSubmit={handleSubmit(postdata, (d) => {
            console.log(d);
          })}
          className="flex min-h-screen flex-col items-center justify-center"
        >
          {!!response ? (
            <Dialogue
              content={response}
              open={!!response}
              setOpen={() => setResponse(null)}
            />
          ) : null}
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Health predictor</CardTitle>
              <CardDescription>Predict the health of patient.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLogin ? (
                <PatientInfo control={control} />
              ) : (
                <Login control={control} />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {isLogin ? (
                <>
                  <Button variant={"outline"} disabled={isFetching}>
                    {isFetching ? (
                      <div className="h-6 w-6 animate-spin border-2 border-r-transparent rounded-full"></div>
                    ) : (
                      "Cancel"
                    )}
                  </Button>
                  <Button disabled={isFetching}>
                    {isFetching ? (
                      <div className="h-6 w-6 animate-spin border-2 border-r-transparent rounded-full"></div>
                    ) : (
                      "Predict"
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  disabled={!!Object.keys(errors).length}
                  onClick={() => {
                    setIslogin(true);
                  }}
                >
                  Login
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      }
    </>
  );
}

"use client";
import React, { useContext, useState } from "react";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/utils/schema/form-schema";
import { FormDataContext } from "@/app/page";
import { Button } from "../ui/button";
import { getData } from "@/utils/axios";
import { supabase } from "@/utils/supabase";

type Props = {};

const PatientInfo = ({}: Props) => {
  const [isFetching, setIsfetching] = useState(false);
  const { loginInfo, setResponse, clearData } = useContext(FormDataContext);
  const { control, handleSubmit } = useForm({
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
    setIsfetching(true);
    const { data } = await getData(values);
    await supabase.from("prediction_log").insert({
      ...loginInfo,
      ...values,
      fasting_sugar: !!values.fasting_sugar,
      resting_ecg: !!values.resting_ecg,
      percentage: +(data.data.percentage * 100).toFixed(2),
    });
    setResponse(data);

    setIsfetching(false);
  };

  return (
    <form
      onSubmit={handleSubmit(postdata, (d) => {
        console.log(d);
      })}
    >
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="blood_pressure">Blood Pressure</Label>
          <Controller
            control={control}
            name="blood_pressure"
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  inputMode="numeric"
                  {...field}
                  onChange={(e) => {
                    field.onChange({
                      target: { value: +e.target.value || 0 },
                    });
                  }}
                />
                {error?.message ? (
                  <div className="text-rose-500 text-sm">{error.message}</div>
                ) : null}
              </>
            )}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="cholesterol">Cholesterol</Label>
          <Controller
            control={control}
            name="cholesterol"
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  inputMode="numeric"
                  {...field}
                  onChange={(e) => {
                    field.onChange({
                      target: { value: +e.target.value || 0 },
                    });
                  }}
                />
                {error?.message ? (
                  <div className="text-rose-500 text-sm">{error.message}</div>
                ) : null}
              </>
            )}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="max_heart_rate">Max heart rate</Label>
          <Controller
            control={control}
            name="max_heart_rate"
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  inputMode="numeric"
                  {...field}
                  onChange={(e) => {
                    field.onChange({
                      target: { value: +e.target.value || 0 },
                    });
                  }}
                />
                {error?.message ? (
                  <div className="text-rose-500 text-sm">{error.message}</div>
                ) : null}
              </>
            )}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Controller
            control={control}
            name="fasting_sugar"
            render={({ field }) => (
              <Switch
                {...field}
                checked={!!field.value}
                onCheckedChange={(change) => {
                  field.onChange({ target: { value: change ? 1 : 0 } });
                }}
              />
            )}
          />
          <Label htmlFor="fasting_sugar">Fasting Sugar</Label>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Controller
            control={control}
            name="resting_ecg"
            render={({ field }) => (
              <Switch
                {...field}
                checked={!!field.value}
                onCheckedChange={(change) => {
                  field.onChange({ target: { value: change ? 1 : 0 } });
                }}
              />
            )}
          />
          <Label htmlFor="resting_ecg">Resting Ecg</Label>
        </div>
      </div>
      <div>
        <Button variant={"ghost"} type="button" onClick={clearData}>
          Cancel
        </Button>
        <Button>
          {isFetching ? (
            <div className="h-6 w-6 rounded-full border-2 border-r-transparent animate-spin "></div>
          ) : (
            "Predict"
          )}
        </Button>
      </div>
    </form>
  );
};

export default PatientInfo;

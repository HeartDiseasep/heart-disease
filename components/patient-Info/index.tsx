import React from "react";
import { Input } from "../ui/input";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

type Props = { control: any };

const PatientInfo = ({ control }: Props) => {
  return (
    <div>
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
    </div>
  );
};

export default PatientInfo;

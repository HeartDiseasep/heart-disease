"use client";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/utils/schema/form-schema";
import { FormDataContext } from "@/app/page";

type Props = {};

const Login = ({}: Props) => {
  const { setLoginInfo } = useContext(FormDataContext);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      age: 45,
      user_name: "Username",
      gender: "male",
    },
  });
  const postdata = async (values: any) => {
    setLoginInfo(values);
  };

  return (
    <form
      onSubmit={handleSubmit(postdata, (d) => {
        console.log(d);
      })}
      className="flex flex-col space-y-4"
    >
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="user_name">User name</Label>
        <Controller
          control={control}
          name="user_name"
          render={({ field, fieldState: { error } }) => (
            <>
              <Input inputMode="numeric" {...field} />
              {error?.message ? (
                <div className="text-rose-500 text-sm">{error.message}</div>
              ) : null}
            </>
          )}
        />
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="user_name">Age</Label>
        <Controller
          control={control}
          name="age"
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
        <Label htmlFor="gender">Gender</Label>
        <div className="space-x-2">
          <span>Female</span>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Switch
                {...field}
                checked={!!(field.value === "male")}
                onCheckedChange={(change) => {
                  field.onChange({
                    target: { value: change ? "male" : "female" },
                  });
                }}
              />
            )}
          />
          <span>Male</span>
        </div>
      </div>
      <Button>Login</Button>
    </form>
  );
};

export default Login;

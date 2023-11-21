"use client";
import { Button, ControlledFieldText } from "@/components";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { TVSLogin, VSLogin } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";

export const AuthLoginModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<TVSLogin>({
    mode: "all",
    resolver: zodResolver(VSLogin),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = handleSubmit((data) => {
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  });

  return (
    <section className="flex w-full h-screen bg-gray-100 items-center justify-between">
      <div className="w-1/2 h-full bg-blue-400 items-center justify-center md:flex hidden">
        <div className="flex flex-col items-center gap-y-4"></div>
      </div>
      <form
        onSubmit={onSubmit}
        className="md:w-1/2 w-full border h-full gap-y-4 justify-center flex flex-col md:px-12 px-6 rounded-lg"
      >
        <div className="flex flex-col gap-y-2 mb-10">
          <h1 className="text-4xl text-blue-600 font-medium">Login</h1>
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea deleniti veniam commodi emo
            ullam modi animi cum, voluptate beatae doloremque id
          </p>
        </div>
        <ControlledFieldText
          required
          size="sm"
          type="email"
          control={control}
          name="email"
          label="Email"
          placeholder="Masukkan Email"
          status={errors.email ? "error" : "none"}
          message={errors.email?.message}
        />
        <ControlledFieldText
          required
          size="sm"
          type="password"
          control={control}
          name="password"
          label="Password"
          placeholder="Masukkan Password"
          status={errors.password ? "error" : "none"}
          message={errors.password?.message}
        />
        <Button disabled={!isValid} size="lg" type="submit">
          Login
        </Button>
        <div className="w-full flex justify-between">
          <p>
            New user?{" "}
            <Link className="text-blue-600" href="/register">
              Sign Up
            </Link>
          </p>
          <p>Forgot Password?</p>
        </div>
      </form>
    </section>
  );
};

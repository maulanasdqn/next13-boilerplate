"use client";
import { Button, ControlledTextField, ControlledCheckBoxField } from "@/components";
import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { TVSLogin, VSLogin } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
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
    <section className="flex w-full h-screen items-center justify-between">
      <div className="w-1/2 h-full bg-blue-400 items-center justify-center flex">
        <div className="flex flex-col items-center gap-y-4">
          <Image priority width={200} height={200} alt="logo" src="/logo.png" />
          <h1 className="text-3xl text-white font-bold">PSU Member Portal</h1>
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-1/2 border h-full gap-y-4 justify-center flex flex-col px-12 rounded-lg"
      >
        <div className="flex flex-col gap-y-2 mb-10">
          <h1 className="text-4xl text-blue-400 font-medium">Login</h1>
          <p className="text-gray-400">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea deleniti veniam commodi emo
            ullam modi animi cum, voluptate beatae doloremque id
          </p>
        </div>
        <ControlledTextField
          required
          variant="md"
          type="email"
          control={control}
          name="email"
          label="Email"
          status={errors.email ? "error" : "none"}
          message={errors.email?.message}
        />
        <ControlledTextField
          required
          variant="md"
          type="password"
          control={control}
          name="password"
          label="Password"
          status={errors.password ? "error" : "none"}
          message={errors.password?.message}
        />
        <ControlledCheckBoxField control={control} name="remember" label="Remember Me" />
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

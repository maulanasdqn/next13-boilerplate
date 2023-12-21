import { FC, ReactElement } from "react";
import { TFormTemplate } from "./type";

export const FormTemplate: FC<TFormTemplate> = (props): ReactElement => {
  return (
    <form
      {...props}
      className="flex flex-col gap-y-4 w-full h-fit items-start bg-white shadow-md rounded-lg p-6 overflow-hidden"
    >
      {props.children}
    </form>
  );
};

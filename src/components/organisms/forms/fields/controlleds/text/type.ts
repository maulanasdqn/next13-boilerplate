import { TFieldText } from "@/components/molecules/forms/fields/text/type";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledFieldText<T extends FieldValues> = UseControllerProps<T> & TFieldText;

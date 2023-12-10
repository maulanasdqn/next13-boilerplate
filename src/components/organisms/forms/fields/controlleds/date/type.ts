import { TFieldDate } from "@/components/molecules/forms/fields/date/type";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledFieldDate<T extends FieldValues> = UseControllerProps<T> & TFieldDate;

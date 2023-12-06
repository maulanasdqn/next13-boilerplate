import { TFieldSelect } from "@/components/molecules/forms/fields/select/type";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type TControlledFieldSelect<T extends FieldValues> = UseControllerProps<T> & TFieldSelect;

import { TextArea, Fieldset } from "@/components";
import { ReactElement, forwardRef } from "react";
import { TFieldTextArea } from "./type";

export const FieldTextArea = forwardRef<HTMLTextAreaElement, TFieldTextArea>(
  (props, ref): ReactElement => {
    return (
      <Fieldset {...props}>
        <TextArea {...props} ref={ref} />
      </Fieldset>
    );
  },
);

FieldTextArea.displayName = "FieldTextArea";

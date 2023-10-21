import type { Meta, StoryObj } from "@storybook/react";

import { RadioField } from "./index";

const meta: Meta<typeof RadioField> = {
  component: RadioField,
  tags: ["autodocs"],
  title: "Molecules/Inputs/RadioField",
  argTypes: {
    required: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    variant: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
      defaultValue: "sm",
    },
    status: {
      options: ["none", "success", "warning", "error"],
      control: { type: "radio" },
      defaultValue: "none",
    },
    disabled: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    options: {
      control: { type: "array" },
      defaultValue: [
        {
          label: "Option 1",
          value: "option-1",
        },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioField>;

export const Primary: Story = {
  args: {
    variant: "sm",
    required: false,
    label: "Gender",
    placeholder: "Masukkan Gender Anda",
    status: "none",
    options: [
      {
        label: "Lelaki",
        value: "lelaki",
      },
      {
        label: "Perempuan",
        value: "perempuan",
      },
    ],
  },
};

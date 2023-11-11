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

    onChange: {
      control: { type: "function" },
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
    status: "none",
    value: "lelaki",
    onChange: (value) => console.log(value),
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

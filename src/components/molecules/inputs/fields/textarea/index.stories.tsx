import type { Meta, StoryObj } from "@storybook/react";

import { TextAreaField } from "./index";

const meta: Meta<typeof TextAreaField> = {
  component: TextAreaField,
  tags: ["autodocs"],
  title: "Molecules/Inputs/TextAreaField",
  argTypes: {
    required: {
      control: { type: "boolean" },
    },
    variant: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    status: {
      options: ["none", "success", "warning", "error"],
      control: { type: "radio" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextAreaField>;

export const Primary: Story = {
  args: {
    variant: "sm",
    required: false,
    label: "Nama Lengkap",
    placeholder: "Masukkan Nama Lengkap",
    status: "none",
  },
};

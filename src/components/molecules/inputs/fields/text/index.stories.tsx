import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "./index";

const meta: Meta<typeof TextField> = {
  component: TextField,
  tags: ["autodocs"],
  title: "Molecules/Inputs/TextField",
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
    message: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  args: {
    variant: "sm",
    required: false,
    label: "Nama Lengkap",
    placeholder: "Masukkan Nama Lengkap",
    status: "none",
  },
};

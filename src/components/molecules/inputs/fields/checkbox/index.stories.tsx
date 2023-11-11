import type { Meta, StoryObj } from "@storybook/react";

import { CheckBoxField } from "./index";

const meta: Meta<typeof CheckBoxField> = {
  component: CheckBoxField,
  tags: ["autodocs"],
  title: "Molecules/Inputs/CheckBoxField",
  argTypes: {
    required: {
      control: { type: "boolean" },
    },

    text: {
      control: { type: "text" },
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
    name: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBoxField>;

export const Primary: Story = {
  args: {
    variant: "sm",
    required: false,
    text: "Nama Lengkap",
    status: "none",
    name: "nama",
  },
};

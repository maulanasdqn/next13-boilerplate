import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./index";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  title: "Components/Atoms/Forms/Button",
  argTypes: {
    variant: {
      options: ["primary", "secondary", "error", "cancel", "warning", "success"],
      control: { type: "radio" },
    },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "radio" },
    },
    isloading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Button",
    isloading: +false,
  },
};

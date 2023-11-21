import type { Meta, StoryObj } from "@storybook/react";

import { Message } from "./index";

const meta: Meta<typeof Message> = {
  component: Message,
  tags: ["autodocs"],
  title: "Components/Atoms/Documents/Message",
  argTypes: {
    status: {
      options: ["none", "error", "success", "warning"],
      control: { type: "radio" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Primary: Story = {
  args: {
    status: "error",
    children: "Waduh Error bang",
  },
};

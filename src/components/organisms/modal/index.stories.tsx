import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./index";

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ["autodocs"],
  title: "Organisms/Modal",

  argTypes: {
    isOpen: {
      control: {
        type: "boolean",
      },
    },

    onClose: {
      action: "onClose",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("close"),
    children: <h1>Angin Bawalah Jiwaku Melayang</h1>,
  },
};

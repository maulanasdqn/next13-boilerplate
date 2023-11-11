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

    width: {
      control: {
        type: "text",
      },
      defaultValue: "600",
    },

    height: {
      control: {
        type: "text",
      },
      defaultValue: "600",
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
    children: <div>Angin Bawalah Jiwaku Melayang</div>,
    width: "600",
    height: "600",
  },
};

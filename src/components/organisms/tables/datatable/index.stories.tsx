import type { Meta, StoryObj } from "@storybook/react";

import { DataTable } from "./index";

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  tags: ["autodocs"],
  title: "Components/Organisms/Tables/DataTable",
  argTypes: {
    columns: {
      control: {
        type: "array",
      },
    },
    data: {
      control: {
        type: "array",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Primary: Story = {
  args: {
    columns: [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email",
        accessorKey: "email",
      },
    ],
    data: [
      {
        name: "Row 1",
        email: "email@row.com",
      },
      {
        name: "Row 2",
        email: "email@row.com",
      },
    ],
  },
};

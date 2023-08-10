import { Meta, StoryObj } from "@storybook/react";
import Inbox from "./Inbox";
import { rest } from "msw";
import { MockedState } from "../../components/TaskList/TaskList.stories";
import { Provider } from "react-redux";
import store from "../../lib/store";

import { waitFor, fireEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof Inbox> = {
  title: "page/inbox",
  component: Inbox,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Waits for the component to be ready
    await canvas.findByTestId("task-list");
    // Waits for the component to be updated based on the store
    await waitFor(async () => {
      // Simulates pinning the first task
      fireEvent.click(canvas.getByLabelText("pinTask-1"));
      // Simulates pinning the third task
      fireEvent.click(canvas.getByLabelText("pinTask-3"));
    });
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          (req, res, ctx) => {
            return res(ctx.json(MockedState.tasks));
          }
        ),
      ],
    },
  },
};

export const Error: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Waits for the component to be ready and found an error
    await canvas.findByTestId("inbox-error");
    // Check if text is rendered
    await canvas.findByText("Something went wrong");
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(
          "https://jsonplaceholder.typicode.com/todos?userId=1",
          (req, res, ctx) => {
            return res(ctx.status(403));
          }
        ),
      ],
    },
  },
};

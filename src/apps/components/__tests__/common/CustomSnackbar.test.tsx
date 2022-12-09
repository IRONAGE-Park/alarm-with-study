import { render } from "@renderer/tests/test-utils";
// test utils

import CustomSnackbar from "@renderer/components/common/CustomSnackbar";
// components

const MESSAGE = "message";

describe("Custom Snackbar", () => {
  it("open이 true일 때 message가 있음을 확인한다.", () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <CustomSnackbar open message={MESSAGE} onClose={onClose} />
    );

    const text = getByText(MESSAGE);

    expect(text).toBeInTheDocument();
  });

  it("open이 false일 때 message가 없음을 확인한다.", () => {
    const onClose = jest.fn();
    const { queryByText } = render(
      <CustomSnackbar open={false} message={MESSAGE} onClose={onClose} />
    );

    const text = queryByText(MESSAGE);

    expect(text).toBeNull();
  });
});

import { render } from "@renderer/tests/test-utils";
// test utils

import CustomConfirm from "@renderer/components/dialogs/CustomConfirm";
// components

const TITLE = "title";
const SUBTITLE = [""];

describe("Custom Confirm", () => {
  it("open이 true일 때 title이 있음과 onConfirm, onClose의 호출을 확인한다.", () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    const { getByText, getAllByRole } = render(
      <CustomConfirm
        open
        title={TITLE}
        subtitle={SUBTITLE}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );

    const title = getByText(TITLE);
    const buttons = getAllByRole("button");
    buttons.forEach(button => button.click());

    expect(title).toBeInTheDocument();
    expect(onConfirm).toBeCalled();
    expect(onClose).toBeCalled();
  });

  it("open이 false일 때 title이 없음을 확인한다.", () => {
    const onConfirm = jest.fn();
    const onClose = jest.fn();

    const { queryByRole } = render(
      <CustomConfirm
        open={false}
        title={TITLE}
        subtitle={SUBTITLE}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );

    const h3 = queryByRole("h3");

    expect(h3).toBeNull();
  });
});

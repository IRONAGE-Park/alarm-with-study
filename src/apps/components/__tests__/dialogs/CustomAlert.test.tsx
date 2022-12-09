import { render } from "@renderer/tests/test-utils";
// test utils

import CustomAlert from "@renderer/components/dialogs/CustomAlert";
// components

const TITLE = "title";
const SUBTITLE = [""];

describe("Custom Alert", () => {
  it("open이 true일 때 title이 있음과 onClose의 클릭 시 호출을 확인한다.", () => {
    const onClose = jest.fn();

    const { getByText, getByRole } = render(
      <CustomAlert open title={TITLE} subtitle={SUBTITLE} onClose={onClose} />
    );

    const title = getByText(TITLE);
    const button = getByRole("button");
    button.click();

    expect(title).toBeInTheDocument();
    expect(onClose).toBeCalled();
  });

  it("open이 false일 때 title이 없음을 확인한다.", () => {
    const onClose = jest.fn();

    const { queryByRole } = render(
      <CustomAlert
        open={false}
        title={TITLE}
        subtitle={SUBTITLE}
        onClose={onClose}
      />
    );

    const h3 = queryByRole("h3");

    expect(h3).toBeNull();
  });
});

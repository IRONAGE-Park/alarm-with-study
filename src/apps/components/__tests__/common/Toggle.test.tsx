import { fireEvent, render } from "@renderer/tests/test-utils";
// test utils

import Toggle from "@renderer/components/common/Toggle";
// components

describe("Toggle", () => {
  const onToggle = jest.fn();

  it("label로 토글에 대한 설명을 붙인다.", () => {
    const LABEL = "label";
    const { getByText } = render(<Toggle label={LABEL} />);

    const label = getByText(LABEL);

    expect(label).toBeInTheDocument();
  });

  it("클릭시 onToggle의 호출과 함께 토글된다.", () => {
    const { getByRole } = render(<Toggle onChange={onToggle} />);

    const toggle = getByRole("checkbox");
    fireEvent.click(toggle);

    expect(onToggle).toBeCalledWith(true);
    expect(toggle).toBeChecked();

    fireEvent.click(toggle);

    expect(onToggle).toBeCalledWith(false);
    expect(toggle).not.toBeChecked();
  });
});

import { render, fireEvent } from "@renderer/common/tests/test-utils";
// test utils

import Checkbox from "@renderer/common/components/Checkbox";
// components

describe("Check Box", () => {
  it("체크박스 클릭 시 checked의 상태가 변경된다.", () => {
    let checked = false;
    const onChange = () => (checked = !checked);
    const { getByRole } = render(
      <Checkbox id="id" checked={checked} onChange={onChange} />
    );

    const checkbox = getByRole("checkbox", { hidden: true });
    fireEvent.click(checkbox);

    expect(checked).toBe(true);
  });
});

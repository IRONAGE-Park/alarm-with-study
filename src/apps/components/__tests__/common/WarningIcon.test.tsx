import { fireEvent, render, waitFor } from "@renderer/tests/test-utils";
// test utils

import WarningIcon from "@renderer/components/common/WarningIcon";
// components

describe("Warning Icon", () => {
  it("warning icon 렌더링과 마우스오버시 information 렌더링을 확인한다.", async () => {
    const { getByText } = render(<WarningIcon />);

    const warningIcon = getByText("Caution.svg");
    fireEvent.mouseOver(warningIcon);
    const information = await waitFor(() => getByText("경고"));

    expect(warningIcon).toBeInTheDocument();
    expect(information).toBeInTheDocument();
  });
});

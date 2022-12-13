import { fireEvent, render, waitFor } from "@renderer/common/tests/test-utils";
// test utils

import InfoTooltip from "@renderer/common/components/InfoTooltip";
// components

describe("Info Tooltip", () => {
  it("자식 노드에 마우스오버시 infomation이 렌더링을 확인한다.", async () => {
    const TEST_ID = "child";
    const INFOMATION = "infomation";
    const { getByText, getByTestId } = render(
      <InfoTooltip title={INFOMATION}>
        <div data-testid={TEST_ID}></div>
      </InfoTooltip>
    );

    const child = getByTestId(TEST_ID);
    fireEvent.mouseOver(child);
    const infomation = await waitFor(() => getByText(INFOMATION));

    expect(infomation).toBeInTheDocument();
  });
});

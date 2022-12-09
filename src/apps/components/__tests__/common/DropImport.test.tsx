import { fireEvent, render } from "@renderer/tests/test-utils";
// test utils

import DropImport from "@renderer/components/common/DropImport";
// components

describe("Drop Import", () => {
  const MESSAGE = "message";
  const onDragEnd = jest.fn();
  const callback = jest.fn();

  it("dragOver가 false일 때 message는 렌더링되지 않는다.", () => {
    const { queryByText } = render(
      <DropImport
        message={MESSAGE}
        dragOver={false}
        onDragEnd={onDragEnd}
        callback={callback}
      />
    );

    const label = queryByText(MESSAGE);

    expect(label).toBeNull();
  });

  it("dragOver가 true일 때 message 렌더링과 파일 drop시 onDragEnd 호출을 확인한다.", () => {
    const { getByText } = render(
      <DropImport
        message={MESSAGE}
        dragOver
        onDragEnd={onDragEnd}
        callback={callback}
      />
    );

    const label = getByText(MESSAGE);
    expect(label).toBeInTheDocument();

    fireEvent.drop(label, { dataTransfer: { files: [] } });
    expect(onDragEnd).toBeCalled();
  });
});

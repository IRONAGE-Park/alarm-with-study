import { render } from "@renderer/tests/test-utils";
// test utils

import ContextMenu from "@renderer/components/common/ContextMenu";
// components

const CONTEXT_MENU_NAME = "컨텍스트 메뉴 아이템";
describe("Context Menu", () => {
  it("name 프로퍼티를 렌더링한다.", () => {
    const { getByText } = render(<ContextMenu name={CONTEXT_MENU_NAME} />);
    const name = getByText(CONTEXT_MENU_NAME);
    expect(name).toBeInTheDocument();
  });

  it("onClick 함수가 명시되지 않았을 때 disabled 상태이다.", () => {
    const { getByRole } = render(<ContextMenu name={CONTEXT_MENU_NAME} />);
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("onClick 함수가 존재하더라도 disabled 상태를 가질 수 있다.", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ContextMenu name={CONTEXT_MENU_NAME} onClick={onClick} disabled />
    );
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("클릭하면 onClick 함수가 실행된다.", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ContextMenu name={CONTEXT_MENU_NAME} onClick={onClick} />
    );
    const contextItem = getByRole("button");
    contextItem.click();

    expect(onClick).toHaveBeenCalled();
  });

  it("disabled 상태에서 클릭하면 onClick 함수가 실행되지 않는다.", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ContextMenu name={CONTEXT_MENU_NAME} onClick={onClick} disabled />
    );
    const contextItem = getByRole("button");
    contextItem.click();

    expect(onClick).not.toHaveBeenCalled();
  });
});

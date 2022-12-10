import styled from "@emotion/styled";
// React module

/** `Checkbox` 감싸는 스타일 컴포넌트 */
export const StyleCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

/** `Checkbox` 설명하는 텍스트 스타일 컴포넌트 */
export const StyleCheckboxLabel = styled.span`
  white-space: nowrap;
  margin-right: 8px;
  font-size: 12px;
  color: #999;
`;

/** `Checkbox` input 상태 체크하는 스타일 컴포넌트 */
export const StyleCheckboxInput = styled.input`
  display: none;
`;

/** `Checkbox` 내 스위치 감싸는 스타일 컴포넌트 */
export const StyleCheckbox = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  border: solid 1px ${({ theme }) => theme.color.grayScale.basic.black};
  border-radius: 5px;
  cursor: pointer;

  &:hover::before {
    // Checkbox 호버 시 보일 뒤쪽의 원 형태의 음영
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200%;
    height: 200%;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.hover.basic};
  }
`;

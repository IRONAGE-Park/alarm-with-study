import styled from "@emotion/styled";
// React module

/** `Toggle` 감싸는 스타일 컴포넌트 */
export const StyleToggleBox = styled.div`
  display: flex;
  align-items: center;
`;

/** `Toggle` 설명하는 텍스트 스타일 컴포넌트 */
export const StyleToggleLabel = styled.span`
  white-space: nowrap;
  margin-right: 8px;
  font-size: 12px;
  color: #999;
`;

export const StyleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  input:checked + span {
    background: ${({ theme }) => theme.color.primary.blue500};
  }
  input:checked + span:before {
    transform: translateX(24px);
  }
`;

export const StyleInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;

export const StyleSpan = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.color.grayScale.coolGray200};
  border-radius: 12px;
  transition: background 0.15s;
  &:before {
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    top: 2px;
    left: 2px;
    background: #fff;
    border-radius: 100%;
    transition: transform 0.15s;
  }
`;

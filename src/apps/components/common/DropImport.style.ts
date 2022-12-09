import styled from "@emotion/styled";
// React module

interface StyleDropImportProps {
  dragOver: boolean;
}

export const StyleDropImport = styled.label<StyleDropImportProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background 0.3s ease-in-out;
  z-index: ${({ dragOver }) => (dragOver ? 9999 : -1)};
  background: ${({ dragOver }) =>
    dragOver ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)"};

  & > input {
    display: none;
  }

  & > p {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.color.grayScale.basic.white};
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ dragOver }) => (dragOver ? 1 : 0)};
  }
`;

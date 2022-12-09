import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { ButtonBase } from "@mui/material";
// React module

export const StyleContextMenuListBox = styled.div`
  position: fixed;
  z-index: 1500;
`;

export const StyleContextMenuList = styled.ul`
  border-radius: 5px;

  box-shadow: 1.5px 3px 10px #0009;

  overflow: hidden;
`;

interface StyleContextMenuProps {
  disabled?: boolean;
}

export const StyleContextMenu = styled.li<StyleContextMenuProps>`
  height: 24px;

  background: #93a2ba;
  // no-palette

  &:hover {
    background: ${({ theme }) => theme.color.primary.blue500};
  }
  ${props => {
    return (
      props.disabled &&
      css`
        background: #8291a9;
        &:hover {
          background: #8291a9;
        }

        ${StyleContextMenuButton} {
          opacity: 0.5;
        }
      `
    );
  }}
`;

export const StyleContextMenuButton = styled(ButtonBase)`
  display: flex;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.color.grayScale.basic.white};

  padding: 0 10px;
`;

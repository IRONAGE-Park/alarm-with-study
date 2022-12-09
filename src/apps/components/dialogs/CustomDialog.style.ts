import styled from "@emotion/styled";
import { ButtonBase, Dialog, IconButton } from "@mui/material";
// React module

export const StyleCustomDialog = styled(Dialog)``;

export const StyleCustomDialogWrapper = styled.div``;

export const StyleCustomDialogHeaderArea = styled.div`
  position: relative;

  width: 100%;

  padding: 14px 50px;

  background: ${({ theme }) => theme.color.grayScale.gray100};
`;

export const StyleCustomDialogHeader = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.color.primary.blue500};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  text-align: center;
`;

export const StyleCustomDialogCloseButton = styled(IconButton)`
  position: absolute;

  top: 50%;
  right: 4px;

  transform: translateY(-50%);
`;

export const StyleCustomDialogContent = styled.div`
  width: 100%;

  padding: 14px 50px;

  background: ${({ theme }) => theme.color.grayScale.gray200};

  @media (max-width: 500px) {
    padding: 12px 24px;
  }
`;

export const StyleCustomDialogSubtitleArea = styled.div`
  text-align: center;

  padding: 8px 0;
`;

export const StyleCustomDialogSubtitle = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.color.grayScale.basic.black};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

export const StyleCustomDialogActionArea = styled.div`
  text-align: center;

  margin-top: 14px;

  @media (max-width: 500px) {
    display: flex;
    flex-flow: column-reverse;
    align-items: center;
  }
`;

export const StyleCustomDialogActionButton = styled(ButtonBase)`
  width: 150px;
  height: 40px;

  font-size: 14px;
  color: ${({ theme }) => theme.color.grayScale.basic.black};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  background: ${({ theme }) => theme.color.grayScale.basic.mediumLight};

  border: 1px solid ${({ theme }) => theme.color.grayScale.coolGray500};
  border-radius: 5px;

  &:not(:first-of-type) {
    margin-left: 10px;
  }

  @media (max-width: 500px) {
    width: 100%;
    &:not(:first-of-type) {
      margin-left: 0;
      margin-bottom: 10px;
    }
  }
`;

export const StyleCustomDialogConfirmButton = styled(
  StyleCustomDialogActionButton
)`
  background: ${({ theme }) => theme.color.primary.blue500};
  border: none;
  color: ${({ theme }) => theme.color.grayScale.basic.white};
`;

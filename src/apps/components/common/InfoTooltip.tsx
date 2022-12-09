import type { ReactElement } from "react";
// types

import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
// React module

import {
  StyleInfoTooltipTitleSpan,
  StyleInfoTooltipTitleWrapper,
} from "@renderer/components/common/InfoTooltip.style";
import normalColor from "@renderer/styles/colors/normal-color";
// styles

interface InfoTooltipProps extends TooltipProps {
  children: ReactElement;
  isNoWrapper?: boolean;
}

export const StyleTooltip = styled(
  ({ title, children, isNoWrapper, className }: InfoTooltipProps) => (
    <Tooltip
      arrow
      disableInteractive
      classes={{ popper: className }}
      title={
        <StyleInfoTooltipTitleWrapper>{title}</StyleInfoTooltipTitleWrapper>
      }
    >
      {isNoWrapper ? (
        children
      ) : (
        <StyleInfoTooltipTitleSpan>{children}</StyleInfoTooltipTitleSpan>
      )}
    </Tooltip>
  )
)(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 400,
    backgroundColor: `${normalColor.grayScale.coolGray800}e6`,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: `${normalColor.grayScale.coolGray800}e6`,
  },
}));

const InfoTooltip = ({ title, children, isNoWrapper }: InfoTooltipProps) => {
  return (
    <StyleTooltip title={title} children={children} isNoWrapper={isNoWrapper} />
  );
};

export default InfoTooltip;

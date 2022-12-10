import styled from "@emotion/styled";
import { css } from "@emotion/react";
// React module

const SCROLL_ACTIVE_WIDTH = 10 as const;
const SCROLL_NORMAL_WIDTH = 5 as const;

const scrollScaleUp = css`
  right: 0;

  width: ${SCROLL_ACTIVE_WIDTH}px;

  border-width: 1px;
  & > div {
    border-radius: 5px;
  }
`;

export const StyleScrollWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface StyleScrollAreaProps {
  paddingRight: number;
  paddingLeft: number;
  active: boolean;
}

export const StyleScrollArea = styled.div<StyleScrollAreaProps>`
  position: relative;
  width: 100%;
  height: 100%;

  padding-right: ${({ paddingRight }) => paddingRight}px;
  padding-left: ${({ paddingLeft }) => paddingLeft}px;

  overflow-y: ${({ active }) => (active ? "overlay" : "hidden")};
`;

export const StyleScrollBarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;

  overflow: hidden;

  &:hover > div {
    ${scrollScaleUp}
  }
`;

interface StyleScrollBarLineProps {
  scrollBarAppear: boolean;
  coverActive: boolean;
}

export const StyleScrollBarLine = styled.div<StyleScrollBarLineProps>`
  position: absolute;
  top: 0;
  right: -1px;
  width: ${SCROLL_NORMAL_WIDTH}px;
  height: 100%;

  opacity: ${({ scrollBarAppear }) => (scrollBarAppear ? 1 : 0)};

  transition-property: right, opacity, width, background, border;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;

  border-radius: 5px;

  ${({ coverActive }) => coverActive && scrollScaleUp}
`;

interface StyleScrollBarProps {
  scrollBarHeight: number;
  scrollBarOffset: number;
}

export const StyleScrollBar = styled.div<StyleScrollBarProps>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: ${({ scrollBarHeight }) => scrollBarHeight}px;

  transition-property: background, border-radius;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;

  transform: ${({ scrollBarOffset }) => `translateY(${scrollBarOffset}px)`};

  background: ${({ theme }) => theme.color.grayScale.coolGray500};

  &:hover {
    background: ${({ theme }) => theme.color.grayScale.coolGray300};
  }
`;

export const StyleCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: #0000;
  z-index: 9999;
`;

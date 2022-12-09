import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// React module
import ScrollCalculator from "@libs/ScrollCalculator";
// common libraries
import {
  StyleCover,
  StyleScrollArea,
  StyleScrollBar,
  StyleScrollBarLine,
  StyleScrollBarWrapper,
  StyleScrollWrapper,
} from "@renderer/components/common/ScrollWrapper.style";

// styles

/**
 * 스크롤 드래그 이동 시 시작 상태
 */
interface StartPoint {
  /** 시작 스크롤 바 위치 */
  startBarPos: number;
  /** 시작 마우스 포인터 위치 */
  startClientY: number;
}

/** ScrollWrapper props */
interface ScrollWrapperProps {
  /** ScrollWrapper 양쪽 padding */
  paddingHorizontal?: number;
  /** ScrollWrapper 왼쪽 padding */
  paddingLeft?: number;
  /** ScrollWrapper 오른쪽 padding */
  paddingRight?: number;
  /** scroll 활성화 변수(default: true) */
  active?: boolean;
  /** 내용의 변화가 있을 때 스크롤 바를 재 위치시키는 의존 배열 */
  scrollReplaceDeps?: unknown[];
  /** scrollDeps 기준으로 스크롤 위치를 변경 시킬 때 scrollTop 여부 */
  scrollTop?: boolean;
  children: ReactNode;
}

const SCROLL_DURATION = 3 as const;
const SECOND = 1000 as const;

/**
 * {children}에 커스텀 스크롤을 씌우는 컴포넌트
 * @param paddingHorizontal 양쪽 padding
 * @param paddingLeft 왼쪽 padding
 * @param paddingRight 오른쪽 padding
 * @param active scroll 활성화 변수(default: true)
 * @param scrollDeps 내용의 변화가 있을 때 스크롤 바를 재 위치시키는 의존 배열
 * @param scrollTop scrollDeps 기준으로 스크롤 위치를 변경 시킬 때 scrollTop 여부
 *
 * @returns 커스텀 스크롤 바
 */
const ScrollWrapper = ({
  paddingHorizontal = 0,
  paddingRight = paddingHorizontal ?? 0,
  paddingLeft = paddingHorizontal ?? 0,
  active = true,
  scrollReplaceDeps = [],
  scrollTop = false,
  children,
}: ScrollWrapperProps) => {
  const [scrollBarHeight, setScrollBarHeight] = useState(0);
  const [scrollBarOffset, setScrollBarOffset] = useState(0);
  const [scrollBarAppear, setScrollBarAppear] = useState(false);

  const [startPoint, setStartPoint] = useState<StartPoint | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const throttle = useRef(false);
  const throttleTimer = useRef<NodeJS.Timeout | null>(null);
  const disappearTimer = useRef<NodeJS.Timeout | null>(null);

  const coverActive = useMemo(() => startPoint !== null, [startPoint]);

  const scrollThrottleTimer = useCallback(() => {
    throttleTimer.current = setTimeout(
      () => (throttle.current = false),
      SCROLL_DURATION * SECOND - 100
    );
  }, []);

  const scrollThrottleClear = useCallback(() => {
    if (throttleTimer.current) {
      clearTimeout(throttleTimer.current);
    }
  }, []);

  const scrollAppear = useCallback(() => {
    setScrollBarAppear(true);
  }, []);

  const scrollDisappearTimer = useCallback(() => {
    disappearTimer.current = setTimeout(
      () => setScrollBarAppear(false),
      SCROLL_DURATION * SECOND
    );
  }, []);

  const scrollDisappearClear = useCallback(() => {
    if (disappearTimer.current) {
      clearTimeout(disappearTimer.current);
    }
  }, []);

  const onMouseDown = useCallback(
    (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      if (containerRef.current) {
        setStartPoint({
          startBarPos: containerRef.current.scrollTop,
          startClientY: e.clientY,
        });
      }
    },
    []
  );

  const onMouseUp = useCallback(() => {
    setStartPoint(null);
  }, []);

  const onScroll = useCallback(() => {
    setScrollBarOffset(ScrollCalculator.top(containerRef.current));

    if (throttle.current) return;
    throttle.current = true;
    scrollThrottleTimer();

    scrollAppear();
    scrollDisappearClear();
    scrollDisappearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrag = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
    if (startPoint !== null) {
      ScrollCalculator.offset(
        containerRef.current,
        startPoint.startBarPos,
        e.clientY - startPoint.startClientY
      );
    }
  };

  useEffect(() => {
    setScrollBarHeight(ScrollCalculator.height(containerRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current?.scrollHeight, containerRef.current?.clientHeight]);

  useEffect(() => {
    containerRef.current?.scrollTo(
      0,
      scrollTop ? 0 : containerRef.current.scrollTop
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, scrollReplaceDeps);

  useEffect(() => {
    return () => {
      scrollDisappearClear();
      scrollThrottleClear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyleScrollWrapper>
      <StyleScrollArea
        ref={containerRef}
        paddingRight={paddingRight}
        paddingLeft={paddingLeft}
        active={active}
        onScroll={onScroll}
        onMouseMove={onDrag}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {children}
        {coverActive && <StyleCover />}
      </StyleScrollArea>
      {scrollBarHeight !== 0 && (
        <StyleScrollBarWrapper onMouseOver={onScroll}>
          <StyleScrollBarLine
            scrollBarAppear={scrollBarAppear}
            coverActive={coverActive}
          >
            <StyleScrollBar
              scrollBarHeight={scrollBarHeight}
              scrollBarOffset={scrollBarOffset}
              onMouseDown={onMouseDown}
            />
          </StyleScrollBarLine>
        </StyleScrollBarWrapper>
      )}
    </StyleScrollWrapper>
  );
};

export default ScrollWrapper;

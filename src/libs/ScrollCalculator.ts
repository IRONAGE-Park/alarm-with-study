/**
 * `Renderer-process` Library
 *
 * `Renderer-process`에서 Scroll 을 관리하기 위한 기능 모음
 */
namespace ScrollCalculator {
  /**
   * 스크롤 바 높이 계산식
   *
   * @param element 스크롤 바가 위치하는 스크롤 영역 Element
   */
  export const height = (element: Element | null): number => {
    if (element) {
      const { clientHeight, scrollHeight } = element;
      if (scrollHeight > clientHeight) {
        return Math.pow(clientHeight, 2) / scrollHeight;
      }
    }
    return 0;
  };

  /**
   * 스크롤 바 위치 계산식
   *
   * @param element 스크롤 바가 위치하는 스크롤 영역 Element
   */
  export const top = (element: Element | null): number => {
    if (element) {
      const { clientHeight, scrollHeight, scrollTop } = element;
      return Math.floor(scrollTop * (clientHeight / scrollHeight));
    }
    return 0;
  };

  /**
   * 스크롤 드래그 이동 시 스크롤 위치 계산식
   *
   * @param element 스크롤 바가 위치하는 스크롤 영역 Element
   * @param startTop 스크롤 바 드래그 시작 위치
   * @param delta 스크롤 바 이동 거리
   */
  export const offset = (
    element: Element | null,
    startTop: number,
    delta: number
  ) => {
    if (element) {
      const { clientHeight, scrollHeight } = element;
      const result = startTop + delta * (scrollHeight / clientHeight);
      element.scrollTo(0, result);
    }
  };
}

export default ScrollCalculator;

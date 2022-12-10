import {
  StyleToggleBox,
  StyleToggleLabel,
  StyleLabel,
  StyleInput,
  StyleSpan,
} from "@renderer/common/components/Toggle.style";
import { useRef } from "react";
// styles

/** '`Toggle` 컴포넌트에서 사용할 props' */
interface ToggleProps {
  /** `Toggle` 옆에 해당 `Toggle`을 설명하는 텍스트 */
  label?: string;
  /** `Toggle` on / off 상태 */
  checked?: boolean;
  /** 토글 기능 */
  onChange?: (checked: boolean) => void;
}

/**
 * '`Toggle` 컴포넌트'
 *
 * 특정 기능을 on / off 시키는 기능 수행
 *
 * @param label `Toggle` 옆에 해당 `Toggle`을 설명하는 텍스트
 * @param checked `Toggle`의 on / off 상태
 * @param onChange 토글 기능
 *
 * @returns `Toggle` 컴포넌트
 */
const Toggle = ({ label, checked, onChange }: ToggleProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <StyleToggleBox>
      {label && <StyleToggleLabel>{label}</StyleToggleLabel>}
      <StyleLabel>
        <StyleInput
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={e => onChange?.(e.target.checked)}
        />
        <StyleSpan />
      </StyleLabel>
    </StyleToggleBox>
  );
};

export default Toggle;

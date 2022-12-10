import type { InputHTMLAttributes } from "react";
// types

import SvgIcon from "@renderer/common/components/SvgIcon";
// components

import {
  StyleCheckbox,
  StyleCheckboxInput,
  StyleCheckboxLabel,
  StyleCheckboxWrapper,
} from "@renderer/common/components/Checkbox.style";
// styles

/** '`Checkbox` 컴포넌트에서 사용할 props' */
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /** `Checkbox`의 id */
  id: string;
  /** `Checkbox` 옆에 해당 `Checkbox`를 설명하는 텍스트 */
  label?: string;
  /** `Checkbox`의 on / off 상태 */
  checked: boolean;
}

/**
 * '`Checkbox` 컴포넌트'
 *
 * 특정 기능을 on / off 시키는 기능 수행
 *
 * @param id `Checkbox`의 id
 * @param label `Checkbox` 옆에 해당 `Checkbox`을 설명하는 텍스트
 * @param checked `Checkbox`의 on / off 상태
 * @param restProps `HTML Input Element`에서 사용하는 나머지 props
 *
 * @returns `Checkbox` 컴포넌트
 */
const Checkbox = ({ id, label, checked, ...restProps }: CheckboxProps) => {
  return (
    <StyleCheckboxWrapper>
      {label && <StyleCheckboxLabel>{label}</StyleCheckboxLabel>}
      <StyleCheckboxInput
        id={id}
        type="checkbox"
        checked={checked}
        {...restProps}
      />
      <label htmlFor={id}>
        <StyleCheckbox>{checked && <SvgIcon icon="Check" />}</StyleCheckbox>
      </label>
    </StyleCheckboxWrapper>
  );
};

export default Checkbox;

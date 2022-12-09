import type { CustomDialogButtonLabel } from "@renderer/contexts/CustomDialogContext";
// types

import SvgIcon from "@renderer/components/SvgIcon";
// components

import {
  StyleCustomDialog,
  StyleCustomDialogCloseButton,
  StyleCustomDialogContent,
  StyleCustomDialogHeader,
  StyleCustomDialogHeaderArea,
  StyleCustomDialogSubtitle,
  StyleCustomDialogSubtitleArea,
  StyleCustomDialogWrapper,
  StyleCustomDialogActionArea,
  StyleCustomDialogActionButton,
  StyleCustomDialogConfirmButton,
} from "@renderer/components/dialogs/CustomDialog.style";
// styles

interface CustomConfirmProps {
  /** `Confirm` 창의 열림 상태 */
  open: boolean;
  /** `Confirm` 창의 제목 */
  title: string;
  /** `Confirm` 창에서 추가로 전달할 텍스트 */
  subtitle: string[];
  /** 확인 버튼을 눌렀을 때 발생하는 이벤트 리스너 */
  onConfirm: () => void;
  /** 취소 버튼을 눌렀을 때 발생하는 이벤트 리스너 */
  onClose: () => void;
  /** 확인 / 취소 버튼의 이름을 재설정하는 이름 객체 */
  buttonLabel?: CustomDialogButtonLabel;
}

const CustomConfirm = ({
  open,
  title,
  subtitle,
  onConfirm,
  onClose,
  buttonLabel,
}: CustomConfirmProps) => {
  const label = buttonLabel
    ? buttonLabel
    : {
        confirm: "확인",
        cancel: "취소",
      };

  return (
    <StyleCustomDialog open={open} onClose={onClose}>
      <StyleCustomDialogWrapper>
        <StyleCustomDialogHeaderArea>
          <StyleCustomDialogHeader>{title}</StyleCustomDialogHeader>
          <StyleCustomDialogCloseButton onClick={onClose}>
            <SvgIcon icon="Close" />
          </StyleCustomDialogCloseButton>
        </StyleCustomDialogHeaderArea>
        <StyleCustomDialogContent>
          {subtitle.length !== 0 && (
            <StyleCustomDialogSubtitleArea>
              {subtitle.map((sub, index) => (
                <StyleCustomDialogSubtitle key={index}>
                  {sub}
                </StyleCustomDialogSubtitle>
              ))}
            </StyleCustomDialogSubtitleArea>
          )}
          <StyleCustomDialogActionArea>
            <StyleCustomDialogActionButton onClick={onClose}>
              {label.cancel}
            </StyleCustomDialogActionButton>
            <StyleCustomDialogConfirmButton onClick={onConfirm}>
              {label.confirm}
            </StyleCustomDialogConfirmButton>
          </StyleCustomDialogActionArea>
        </StyleCustomDialogContent>
      </StyleCustomDialogWrapper>
    </StyleCustomDialog>
  );
};

export default CustomConfirm;

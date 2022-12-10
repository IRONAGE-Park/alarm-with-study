import SvgIcon from "@renderer/common/components/SvgIcon";
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
} from "@renderer/setting/components/dialogs/CustomDialog.style";
// styles

interface CustomAlertProps {
  open: boolean;
  title: string;
  subtitle: string[];
  onClose: () => void;
}

const CustomAlert = ({ open, title, subtitle, onClose }: CustomAlertProps) => (
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
      </StyleCustomDialogContent>
    </StyleCustomDialogWrapper>
  </StyleCustomDialog>
);

export default CustomAlert;

import type { ReactNode } from "react";
// types

import { createContext, useCallback, useContext, useState } from "react";
// React module

import CustomAlert from "@renderer/components/dialogs/CustomAlert";
import CustomConfirm from "@renderer/components/dialogs/CustomConfirm";
// components

export type CustomDialogOpenType = "alert" | "confirm" | null;

export interface CustomDialogButtonLabel {
  /** 취소 버튼의 이름 */
  cancel: string;
  /** 확인 버튼의 이름 */
  confirm: string;
}

export interface CustomDialogState {
  /**
   * `Confirm` 창의 상태
   * `null`일 경우 close
   */
  openType: CustomDialogOpenType;
  /** `Confirm` 창의 제목 */
  title: string;
  /** `Confirm` 창에서 추가로 전달할 텍스트 */
  subtitle: string[];
  /** 확인 버튼을 눌렀을 때 발생하는 이벤트 리스너 */
  onConfirm: () => void;
  /** 취소 버튼을 눌렀을 때 발생하는 이벤트 리스너 */
  onClose?: () => void;
  /** 확인 / 취소 버튼의 이름을 재설정하는 이름 객체 */
  buttonLabel?: CustomDialogButtonLabel;
}

export type CustomDialogContextType = (
  customDialogState: CustomDialogState
) => void;

const CustomDialogContext = createContext<CustomDialogContextType>(() => {});

export const useCustomAlert = () => {
  const onOpenCustomDialog = useContext(CustomDialogContext);

  return useCallback(
    (
      title: string,
      subtitle: string[],
      onConfirm?: () => void,
      onClose?: () => void
    ) => {
      onOpenCustomDialog({
        openType: "alert",
        title: title,
        subtitle: subtitle,
        onConfirm: onConfirm ?? (() => {}),
        onClose,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export const useCustomConfirm = () => {
  const onOpenCustomDialog = useContext(CustomDialogContext);

  return useCallback(
    (
      title: string,
      subtitle: string[],
      onConfirm: () => void,
      onClose?: () => void,
      buttonLabel?: CustomDialogButtonLabel
    ) => {
      onOpenCustomDialog({
        openType: "confirm",
        title: title,
        subtitle: subtitle,
        onConfirm,
        onClose,
        buttonLabel,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

interface CustomDialogProviderProps {
  children: ReactNode;
}

export const CustomDialogProvider = ({
  children,
}: CustomDialogProviderProps) => {
  const [customDialogState, setCustomDialogState] = useState<CustomDialogState>(
    {
      openType: null,
      title: "",
      subtitle: [],
      onConfirm: () => {},
    }
  );

  const onOpenCustomDialog = useCallback(
    (customDialogState: CustomDialogState) => {
      setCustomDialogState(prev => ({
        ...prev,
        ...customDialogState,
      }));
    },
    []
  );

  const closeDialog = useCallback(
    () => setCustomDialogState(prev => ({ ...prev, openType: null })),
    []
  );

  const onConfirmCustomDialog = useCallback(() => {
    customDialogState.onConfirm();
    closeDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customDialogState]);

  const onCloseCustomDialog = useCallback(() => {
    if (customDialogState.onClose) {
      customDialogState.onClose();
    }
    closeDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customDialogState]);

  return (
    <CustomDialogContext.Provider value={onOpenCustomDialog}>
      {children}
      <CustomAlert
        open={customDialogState.openType === "alert"}
        title={customDialogState.title}
        subtitle={customDialogState.subtitle}
        onClose={onCloseCustomDialog}
      />
      <CustomConfirm
        open={customDialogState.openType === "confirm"}
        title={customDialogState.title}
        subtitle={customDialogState.subtitle}
        onConfirm={onConfirmCustomDialog}
        onClose={onCloseCustomDialog}
        buttonLabel={customDialogState.buttonLabel}
      />
    </CustomDialogContext.Provider>
  );
};

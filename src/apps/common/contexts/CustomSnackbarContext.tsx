import type { ReactNode, SyntheticEvent } from "react";
import type { SnackbarCloseReason } from "@mui/material";
// types

import { createContext, useCallback, useContext, useState } from "react";
// React module

import CustomSnackbar from "@renderer/common/components/CustomSnackbar";
// components

export interface CustomSnackbarState {
  open: boolean;
  message: string;
}

export type CustomSnackbarContextType = (message: string) => void;

const CustomSnackbarContext = createContext<CustomSnackbarContextType>(
  () => {}
);

export const useCustomSnackbar = () => {
  const onOpenCustomSnackbar = useContext(CustomSnackbarContext);

  return useCallback(
    (message: string) => {
      onOpenCustomSnackbar(message);
    },
    [onOpenCustomSnackbar]
  );
};

interface CustomSnackbarProviderProps {
  /** Provider에서 렌더할 children */
  children: ReactNode;
}

export const CustomSnackbarProvider = ({
  children,
}: CustomSnackbarProviderProps) => {
  const [customSnackbarState, setCustomSnackbarState] =
    useState<CustomSnackbarState>({
      open: false,
      message: "",
    });

  const onOpenCustomSnackbar = useCallback((message: string) => {
    setCustomSnackbarState(prev => ({
      ...prev,
      open: true,
      message,
    }));
  }, []);

  const onCloseCustomSnackbar = useCallback(
    (
      event: Event | SyntheticEvent<any, Event>,
      reason: SnackbarCloseReason
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setCustomSnackbarState(prev => ({
        ...prev,
        open: false,
      }));
    },
    []
  );

  return (
    <CustomSnackbarContext.Provider value={onOpenCustomSnackbar}>
      {children}
      <CustomSnackbar
        {...customSnackbarState}
        onClose={onCloseCustomSnackbar}
      />
    </CustomSnackbarContext.Provider>
  );
};

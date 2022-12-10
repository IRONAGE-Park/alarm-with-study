import { ContextMenuProvider } from "@renderer/common/contexts/ContextMenuContext";
import { CustomDialogProvider } from "@renderer/common/contexts/CustomDialogContext";
import { CustomSnackbarProvider } from "@renderer/common/contexts/CustomSnackbarContext";
// contexts

import MainSettingPage from "@renderer/setting/pages/MainSettingPage";
// pages

import GlobalThemeProvider from "@renderer/common/styles/GlobalThemeProvider";
// styles

const App = () => {
  return (
    <GlobalThemeProvider>
      <ContextMenuProvider>
        <CustomDialogProvider>
          <CustomSnackbarProvider>
            <MainSettingPage />
          </CustomSnackbarProvider>
        </CustomDialogProvider>
      </ContextMenuProvider>
    </GlobalThemeProvider>
  );
};

export default App;

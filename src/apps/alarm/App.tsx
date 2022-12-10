import { ContextMenuProvider } from "@renderer/common/contexts/ContextMenuContext";
import { CustomDialogProvider } from "@renderer/common/contexts/CustomDialogContext";
import { CustomSnackbarProvider } from "@renderer/common/contexts/CustomSnackbarContext";
// contexts

import GlobalThemeProvider from "@renderer/common/styles/GlobalThemeProvider";
// styles

const App = () => {
  return (
    <GlobalThemeProvider>
      <ContextMenuProvider>
        <CustomDialogProvider>
          <CustomSnackbarProvider>dfdjs</CustomSnackbarProvider>
        </CustomDialogProvider>
      </ContextMenuProvider>
    </GlobalThemeProvider>
  );
};

export default App;

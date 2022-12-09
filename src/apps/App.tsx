import { ContextMenuProvider } from "@renderer/contexts/ContextMenuContext";
import { CustomDialogProvider } from "@renderer/contexts/CustomDialogContext";
import { CustomSnackbarProvider } from "@renderer/contexts/CustomSnackbarContext";
// contexts

import GlobalThemeProvider from "@renderer/styles/GlobalThemeProvider";
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

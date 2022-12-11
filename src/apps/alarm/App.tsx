import { ContextMenuProvider } from "@renderer/common/contexts/ContextMenuContext";
import { CustomDialogProvider } from "@renderer/common/contexts/CustomDialogContext";
import { CustomSnackbarProvider } from "@renderer/common/contexts/CustomSnackbarContext";
// contexts

import GlobalThemeProvider from "@renderer/common/styles/GlobalThemeProvider";
import { useLocation } from "react-router-dom";
import Routes from "@renderer/alarm/Routes";
// styles

const App = () => {
  const location = useLocation();

  return (
    <GlobalThemeProvider>
      <ContextMenuProvider>
        <CustomDialogProvider>
          <CustomSnackbarProvider>
            <Routes location={location} />
          </CustomSnackbarProvider>
        </CustomDialogProvider>
      </ContextMenuProvider>
    </GlobalThemeProvider>
  );
};

export default App;

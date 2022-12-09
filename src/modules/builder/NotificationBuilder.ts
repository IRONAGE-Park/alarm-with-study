import { Notification, nativeImage } from "electron";
import isDev from "electron-is-dev";
// Electron Main-process module

import AppIcon from "@assets/icons/app.ico";
// assets

namespace NotificationBuilder {
  const icon = nativeImage.createFromDataURL(AppIcon);

  export const build = (title: string, body: string, onClick?: () => void) => {
    if (!isDev) {
      // [PRODUCTION MODE]
      const notification = new Notification({
        title,
        body,
        icon,
      });
      if (onClick) {
        notification.on("click", onClick);
      }
      notification.show();
    }
  };
}

export default NotificationBuilder;

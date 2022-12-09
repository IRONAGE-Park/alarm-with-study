import { webContents } from "electron";
// Electron Main-process module

/**
 * `Main-process` Library
 *
 * `Main-process`에서 작업을 수행 후,
 * `Renderer-process`로 전달하기 위한 기능 모음
 */
namespace RendererSender {
  /**
   * '모든 `Renderer-process`로 action을 매개변수와 함께 보내는 Function'
   *
   * @param actionName 보낼 Action 이름
   * @param args 함께 첨부할 매개변수
   */
  export const sendAll = (actionName: string, ...args: any[]) => {
    const allContents = webContents.getAllWebContents();
    allContents.forEach(webContent => webContent.send(actionName, ...args));
  };
}

export default RendererSender;

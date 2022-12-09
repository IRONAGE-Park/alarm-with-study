import fs from "fs";
import path from "path";
// Node.js module

/**
 * `Main-process` Library
 *
 * 프로그램에서 외부 파일을 읽거나, 쓰기 편하게 지원하는 기능 모음
 */
namespace FileController {
  /**
   * 해당 경로의 파일을 읽어들이고
   * 매개변수<T>로 넘어 온 타입으로 포맷팅 하는 Function
   *
   * @param formatFunc 포맷팅 방식 제공 함수
   * @param filePath 읽을 파일의 경로 순서(path.join 함)
   *
   * @returns 포맷팅 된 데이터
   */
  export const readFile = <T>(
    formatFunc: (str: string) => T,
    ...filePath: string[]
  ): T | null => {
    const pathName = path.join(...filePath); // 경로를 가져옴
    try {
      const readData = fs.readFileSync(pathName).toString(); // 해당 경로의 파일을 읽음
      // 파일을 포맷팅 함수를 통해 파싱
      return formatFunc(readData) as T;
    } catch (e) {
      // 에러 처리
      console.error("File Read Error!", pathName);
      return null;
    }
  };

  /**
   * JSON 파일을 읽어들이고 포맷팅하여 반환하는 Function
   *
   * @param filePath 읽을 파일의 경로 순서(path.join 함)
   *
   * @returns 읽은 JSON 데이터
   */
  export const readJSONFile = <T>(...filePath: string[]): T => {
    return FileController.readFile(JSON.parse, ...filePath) as T;
  };

  /**
   * 파일을 해당 경로에 쓰는 Function
   *
   * @param content 쓸 내용
   * @param filePath 쓸 파일의 경로 순서(path.join 함)
   */
  export const writeFile = (content: string, ...filePath: string[]): void => {
    const pathName = path.join(...filePath); // 경로를 가져옴
    try {
      const dirName = path.dirname(pathName); // 해당 경로의 디렉토리 명 가져옴
      fs.mkdirSync(dirName, { recursive: true }); // 해당 디렉토리까지 자식 디렉토리 모두 생성
      fs.writeFileSync(pathName, content); // 해당 경로의 파일을 씀
    } catch (e) {
      // 에러 처리
      console.error("File Write Error!", pathName);
    }
  };

  /**
   * JSON 파일을 string으로 변경하고 쓰는 Function
   *
   * @param json JSON 내용
   * @param filePath 쓸 파일의 경로 순서(path.join 함)
   */
  export const writeJSONFile = (json: any, ...filePath: string[]): void => {
    FileController.writeFile(JSON.stringify(json), ...filePath);
  };

  /**
   * Directory를 생성하고, 만약 하위 폴더도 없다면 함께 생성하는 Function
   *
   * @param filePath 생성할 Directory 경로 순서(path.join 함)
   */
  export const dirExistAndMake = (...filePath: string[]): void => {
    const pathName = path.join(...filePath);
    try {
      fs.mkdirSync(pathName, {
        recursive: true,
      }); // 해당 디렉토리까지 자식 디렉토리 모두 생성
    } catch (e) {
      // 에러 처리
      console.error("Dir Make Error!", pathName);
    }
  };

  /**
   * 해당 경로에 파일이 존재하는지 확인하는 Function
   * @param filePath 확인할 경로 순서(path.join 함)
   */
  export const existPath = (...filePath: string[]): boolean => {
    const pathName = path.join(...filePath);
    try {
      return fs.existsSync(pathName);
    } catch (e) {
      // 에러 처리
      console.error("Exist Path Error!", pathName);
      return false;
    }
  };

  /**
   * 해당 경로에 있는 Directory 혹은 File을 삭제하는 Function
   *
   * @param filePath 삭제할 경로 순서(path.join 함)
   */
  export const deletePath = (...filePath: string[]): void => {
    const pathName = path.join(...filePath);
    try {
      fs.unlinkSync(pathName);
    } catch (e) {
      try {
        fs.rmdirSync(pathName, { recursive: true });
      } catch (e) {
        console.error("Delete Path Error!", pathName);
      }
    }
  };

  /**
   * 중복된 파일의 이름을 생성하는 Function
   *
   * @param fileName 파일의 이름
   * @param extensions 파일의 확장자
   * @param overlapCount 파일 중복 카운트
   */
  const getOverlappingFileName = (
    fileName: string,
    extensions: string,
    overlapCount: number
  ) => `${fileName}${overlapCount ? ` (${overlapCount})` : ""}.${extensions}`;

  /**
   * 파일의 이름을 중복되지 않게 Local에 쓰는 Function
   *
   * @param content 파알의 내용
   * @param fileName 파일의 이름
   * @param extensions 파일의 확장자
   * @param filePath 파일이 위치한/쓸 경로(path.join 함)
   */
  export const writeOverlappingFile = (
    content: string,
    fileName: string,
    extensions: string,
    ...filePath: string[]
  ): void => {
    const pathName = path.join(...filePath);
    let overlapCount = 0;
    while (
      FileController.existPath(
        pathName,
        getOverlappingFileName(fileName, extensions, overlapCount)
      )
    ) {
      overlapCount++;
    }

    FileController.writeFile(
      content,
      pathName,
      getOverlappingFileName(fileName, extensions, overlapCount)
    );
  };

  /**
   * 파일 확장자 필터 Function
   *
   * @param file 파일경로 | 이름
   * @param filter 확장자
   * @returns true / false
   */
  export const extentionFilter = (file: string, filter: string) => {
    const split = file.split(".");
    const length = split.length - 1;

    return split[length] === filter;
  };
}

export default FileController;

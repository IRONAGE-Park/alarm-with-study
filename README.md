# Serial Number Generator

This project is **`Serial Number Generator`** for `Grid` Device.

🖥 `Serial Number Generator`를 🛠개발하여 ⚙빌드하고, 💾배포 파일까지 만들 수 있는 프로젝트입니다.  
`Electron`, `React`, `TypeScript`를 사용한 데스크탑 애플리케이션입니다.  
`Vite`를 사용하여 번들링합니다.

## 프로젝트 환경 요구 사항

- `Windows`

  - `node`: `16.x.x`
  - `npm`: `6.14.x`
  - `yarn`: `1.22.x` 이상
  - `Python`: `3.x.x`
  - `Visual Studio`

- `macOS`

  - `node`: `16.x.x`
  - `npm`: `6.14.x`
  - `yarn`: `1.22.x` 이상
  - `Python`: `3.x.x`
  - `Xcode`

- `.env` 파일 및 내용

> 패키지 파일을 만들기 위해서는 코드 사인에 필요한 파일이 추가로 요구됩니다.

## Available Scripts

- ### `yarn start`

  `Main-process`와 `preloads`, `Renderer-process`의 `development` 환경을 동시에 구성 및 실행합니다.  
  `/src/**/*` 내의 파일 수정 시 해당 소스가 자동으로 `rebuild` 됩니다.

- ### `yarn build`

  project 소스를 `/build` 폴더 내에 `production` 환경으로 빌드합니다.  
  쓰레기 파일 삭제를 위해 기존에 있던 `/build` 폴더를 제거 후에 실행됩니다.

- ### `yarn package`

  `/build` 폴더 내의 빌드된 파일들을 `/dist` 폴더 내에 `production` 환경으로 패키징합니다.  
  쓰레기 파일 삭제를 위해 `/dist`, `/build` 폴더를 제거 후에 실행됩니다.  
  `electron-is-dev` 등의 `development` 환경을 가져오는 소스가 `false`로 평가되어 동작합니다.  
  패키지 파일은 `asar` 처리되며, 패키징이 실행되는 `os` 환경에 맞춰 패키징 파일 및 설치 파일이 만들어집니다.

  > 패키징 환경 설정 변수가 있는 `package.json`에 코드 서명 정보가 입력되어 있기 때문에 코드 서명 환경이 설정되어 있지 않을 경우 오류가 발생합니다.

  > 코드 서명하지 않고 패키징하기 위해서는 `yarn package:no-sign` 명령어를 실행합니다.

  > `asar`를 사용하지 않고 패키징하기 위해서는 `yarn package:no-asar` 명령어를 실행합니다.

- ### `yarn setting`

  `Node.js`의 `node-gyp` 네이티브 모듈을 `electron` 환경에서 실행시킬 수 있도록 `rebuild` 합니다.  
  `Node.js` 버전이 `v16.*.*`이고, `Python`이 설치되어 있으며, `Windows`의 경우 `Visual Studio`가, `macOS`의 경우 `Xcode`가 설치되어 있어야 정상적으로 동작합니다.

  > 일반적인 경우에는 `yarn` 명령어 실행 시 `postinstall script`에 의해 네이티브 모듈 폴더 구성 이동을 직접할 필요 없이 실행됩니다.

"use strict";

const electronBuilder = require("electron-builder");
require("dotenv").config();

const { name, productName, appId } = require("../package.json");

process.env.NODE_ENV = "production";

const PACKAGE_NAME = productName.replace(/ /g, "-");
const PUBLISHER_NAME = "IRONAGE-Park";
const __PATH_LICENSE = "./package/LICENSE.txt";
const __PATH_LICENSE_EUC_KR = "./package/LICENSE-EUC-KR.txt";

const findArgv = flag => process.argv.findIndex(argv => argv === flag) !== -1;

const isNoSign = findArgv("--no-sign");
const isNoAsar = findArgv("--no-asar");

electronBuilder.build({
  x64: true,
  config: {
    // Application Information
    productName: productName,
    appId: appId,
    asar: !isNoAsar,
    compression: "maximum",
    copyright: "Copyright © 2022 IRONAGE-Park",
    publish: {
      provider: "github",
      owner: "IRONAGE-Park",
      repo: name,
    },
    // Files & Directories
    files: ["node_modules/", "build/", "package/", "package.json"],
    directories: {
      buildResources: "./",
      output: "./dist/",
      app: "./",
    },

    // Codesign
    ...(isNoSign
      ? {}
      : {
          afterSign: "./package/afterSignHook.js",
          afterAllArtifactBuild: "./package/afterAllArtifactBuildHook.js",
        }),

    // Windows
    win: {
      artifactName: `${PACKAGE_NAME}-Setup-\${version}.\${ext}`,
      publisherName: PUBLISHER_NAME,
      ...(isNoSign
        ? {}
        : {
            certificateSubjectName: PUBLISHER_NAME,
            signingHashAlgorithms: ["sha256"],
            target: ["zip", "nsis"],
            signAndEditExecutable: true,
          }),
    },
    nsis: {
      shortcutName: productName,
      language: "1042",
      include: "./package/win/installer.nsh",
      license: __PATH_LICENSE_EUC_KR,
      oneClick: false,
      perMachine: true,
      allowToChangeInstallationDirectory: true,
    },
    // macOS
    mac: {
      artifactName: `${PACKAGE_NAME}-\${version}.\${ext}`,
      category: "public.app-category.utilities",
      target: "dmg",
      type: "distribution",
      entitlements: "./package/mac/entitlements.mac.plist",
      entitlementsInherit: "./package/mac/entitlements.mac.plist",
      darkModeSupport: true,
      ...(isNoSign
        ? {}
        : {
            hardenedRuntime: true,
            gatekeeperAssess: true,
            provisioningProfile: process.env.PROVISIONING_PROFILE,
          }),
    },
    dmg: {
      contents: [
        {
          x: 10,
          y: 10,
          type: "file",
          name: "LICENSE.txt",
          path: __PATH_LICENSE,
        },
      ],
      backgroundColor: "#06f",
      sign: true,
    },
  },
});

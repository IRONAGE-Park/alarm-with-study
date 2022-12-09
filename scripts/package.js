"use strict";

const electronBuilder = require("electron-builder");
require("dotenv").config();

const { productName, appId } = require("../package.json");

process.env.NODE_ENV = "production";

const PACKAGE_NAME = productName.replace(/ /g, "-");
const PUBLISHER_NAME = "IRONAGE-Park";
const __PATH_LICENSE = "./package/LICENSE.txt";
const __PATH_LICENSE_EUC_KR = "./package/LICENSE-EUC-KR.txt";

const isNoSign = !!process.env.NO_SIGN;
const isNoAsar = !!process.env.NO_ASAR;

electronBuilder.build({
  x64: true,
  config: {
    // Application Information
    productName: productName,
    appId: appId,
    asar: !isNoAsar,
    compression: "maximum",
    copyright: "Copyright © 2022 IRONAGE-Park",
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
      target: "pkg",
      type: "distribution",
      entitlements: "./package/mac/entitlements.mac.plist",
      entitlementsInherit: "./package/mac/entitlements.mac.plist",
      darkModeSupport: true,
      ...(isNoSign
        ? {}
        : {
            hardenedRuntime: true,
            gatekeeperAssess: false,
            provisioningProfile: process.env.PROVISIONING_PROFILE,
          }),
    },
    pkg: {
      license: __PATH_LICENSE,
      scripts: "./package/mac",
      welcome: "./package/mac/welcome.html",
      conclusion: "./package/mac/conclusion.html",
      mustClose: [appId],
    },
  },
});

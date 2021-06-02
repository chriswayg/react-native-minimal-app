# Manual Install of Minimal Project

- Create a project directory: `mkdir MinimalReactNativeApp`
- Go to the root directory for your project and create a new `package.json` file with the following contents:

```json
{
  "name": "MinimalReactNativeApp",
  "version": "0.0.1",
  "private": true
}
```

- Make sure you have installed all prerequisites like _node_ and _react-native_ as well as the _yarn_ package manager.
- Install the `react-native` and `react` packages. Open a terminal, then navigate to the directory with your `package.json` file and run:

```bash
yarn add react-native
```

(or `yarn add react-native@0.63.4` on macOS Mojave)

- This will print a message similar to the following (scroll up in the yarn output to see it):

```bash
react-native@0.63.4 has unmet peer dependency "react@16.13.1"
```

- This is OK, it means we also need to install React with the shown VERSION:

```bash
yarn add react@16.13.1
yarn add react@17.0.1

yarn add react@VERSION
```

- The installation process has created a new `/node_modules` folder. This folder stores all the JavaScript dependencies required to build your project.
- Add an `app.json` config file:

```json
{
  "name": "MinimalReactNativeApp",
  "displayName": "MinimalReactNativeApp"
}
```

- Create the required iOS and Android projects by using the `eject` command:

```bash
yarn add react-native-eject
yarn react-native eject
yarn remove react-native-eject
```

### Add the main App javascript files

- Add a standard`index.js` file:

```jsx
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
```

- Add a Hello World `App.js` file:

```jsx
import React from "react";
import { Text } from "react-native";

export default function App() {
  return <Text style={{ fontSize: 32 }}>Hello, world!</Text>;
}
```

- Alternatively include the `App.js` code in `index.js`

```jsx
import React from "react";
import { AppRegistry, Text } from "react-native";
import { name as appName } from "./app.json";

const App = function () {
  return <Text style={{ fontSize: 32 }}>Hello, world!</Text>;
};

AppRegistry.registerComponent(appName, () => App);
```

- Start in Android Emulator to check that it works

```bash
yarn react-native run-android
```

### Prepare ios build

- In `ios/Podfile` add `inhibit_all_warnings!` near the top and disable Flipper by commenting out near the bottom: `#use_flipper`...

```jsx
platform :ios, '10.0'
inhibit_all_warnings!
...
...
# use_flipper!
  # post_install do |installer|
  #   flipper_post_install(installer)
  # end
```

- Install Pods and open project in Xcode to check

```bash
npx pod-install ios
xed -b ios
```

- Run it in iOS Simulator by starting it in Xcode or via Terminal:

```bash
yarn react-native run-ios
```

- Add `.gitignore` file:

```bash
# macOS
.DS_Store

# Xcode
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate

# Android/IntelliJ
build/
.idea
.gradle
local.properties
*.iml

# node.js
node_modules/
npm-debug.log
yarn-error.log

# BUCK
buck-out/
\.buckd/
*.keystore
!debug.keystore

# Bundle artifact
*.jsbundle

# CocoaPods
/ios/Pods/
```

### Cleanup and reinstall

- Remove just the **_Pods_** (for example after editing Podfile) and reinstall

```bash
cd ios && rm -Rf Pods && cd ..
npx pod-install ios
```

- Remove the **_ios_** and **_android_** projects and reinstall

```bash
cp -v ios/Podfile .
rm -Rf ios android
yarn react-native eject
mv -v Podfile ios/
npx pod-install ios
```

- Remove **_node_modules_** and reinstall

```bash
rm -Rf node_modules
yarn install
```

### Completely Remove Flipper

- [Question: How do i remove Flipper from React Native? · Issue #1326 · facebook/flipper · GitHub](https://github.com/facebook/flipper/issues/1326) (see Diff for complete removal)

  - [Manually set up your React Native Android App | Flipper](https://fbflipper.com/docs/getting-started/react-native-android)
  - [Manually set up your React Native iOS App | Flipper](https://fbflipper.com/docs/getting-started/react-native-ios)
  - To completely comment out or remove Flipper look in:

  ```bash
  android/gradle.properties
  android/app/build.gradle
  android/app/src/debug/java/com/minimalreactnativeapp/ReactNativeFlipper.java
  android/app/src/main/java/com/minimalreactnativeapp/MainApplication.java

  ios/MinimalReactNativeApp/AppDelegate.m
  ios/Podfile
  ```

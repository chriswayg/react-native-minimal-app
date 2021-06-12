# Manual Install of a Minimal React Native Project

The purpose of this experimental manual install of a minimal app is to understand the essential files that go into a React Native project, to learn how to recreate parts if necessary and how to create a template. It's also intended to check how to completely remove Flipper from the iOS and Android projects. The manually created app will work without _tests_ and the configs for buck, eslint, flow, git, prettier, watchman, babel, metro which are included in the standard template. These have been added to this minimal template.

- Create a project directory: `mkdir MinimalReactNativeApp`
- Go to the root directory for your project and create a new `package.json` file with the following contents:

```json
{
  "name": "MinimalReactNativeApp",
  "version": "0.0.1",
  "private": true
}
```

- Make sure that all prerequisites like _node_ as well as the _yarn_ package manager have been installed as described in [Setting up the development environment · React Native](https://reactnative.dev/docs/environment-setup).
- Install the `react-native` and `react` packages. Open a terminal, then navigate to the directory with your `package.json` file and run:

```bash
yarn add react-native
```

- (or `yarn add react-native@0.63.4` on macOS Mojave)

- This will print a message similar to the following (scroll up in the yarn output to see it):

```bash
react-native@0.63.4 has unmet peer dependency "react@16.13.1"
```

- This is OK, it means we also need to install React with the shown VERSION:

```bash
yarn add react@VERSION
```

- (currently `yarn add react@16.13.1` on macOS Mojave or `yarn add react@17.0.1` on macOS Catalina)

- The installation process has created a new `/node_modules` folder. This folder stores all the JavaScript dependencies required to build your project.
- Add an `app.json` config file, which will be used by react-native-eject:

```json
{
  "name": "MinimalReactNativeApp",
  "displayName": "Minimal React Native App"
}
```

- Only the `displayName` may contain spaces, not the `name`

- Create the required iOS and Android projects by using the `eject` command:

```bash
yarn add react-native-eject
yarn react-native eject
```

### Add the main App file

- Create an `index.js` file with 'Hellow World':

```js
import React from 'react';
import { AppRegistry, Text } from 'react-native';
import { name as appName } from './app.json';

const App = function () {
  return <Text style={{ fontSize: 32 }}>Hello, world!</Text>;
};

AppRegistry.registerComponent(appName, () => App);
```

- Start the App in Android Emulator to check that it works

```bash
yarn react-native run-android
```

### Prepare iOS build

- In `ios/Podfile` add `inhibit_all_warnings!` near the top to minimize warning messages and disable Flipper to speed up builds by commenting out near the bottom: `#use_flipper`...

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

- Install the Pods and open the project in Xcode to check

```bash
npx pod-install ios
xed -b ios
```

- Run the App in iOS Simulator by starting it in Xcode or via Terminal:

```bash
yarn react-native run-ios
```

- Remove the command, if everything is working:

```
yarn remove react-native-eject
```

That's it!

---

### Completely Remove Flipper (optional)

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

---

### Cleanup and reinstall

Only as needed

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

- React Native Clean Project provides additional options

[GitHub - pmadruga/react-native-clean-project: Automating the clean up of a React Native project](https://github.com/pmadruga/react-native-clean-project)

### How to use the template

```bash
npx react-native init MyMinimalApp --template https://github.com/chriswayg/react-native-minimal-app.git
```

### References

- [Integration with Existing Apps · React Native](https://reactnative.dev/docs/integration-with-existing-apps)
- [GitHub - ramyareye/react-native-eject: Single command to eject a React Native app](https://github.com/ramyareye/react-native-eject)
- [How To Make Your Own Custom React Native Templates (2021) - DEV Community](https://dev.to/roycechua/how-to-make-your-own-custom-react-native-templates-2021-20l5)

belainna package

- "react-native-vector-icons": "^6.6.0"
  Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following: - apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

* sometimes need to do this one in the `android/app/build.gradle file`,

```gradle
android {
    defaultConfig {
        ...
        targetSdkVersion 28
        multiDexEnabled true
    }
    ...
}
```

- to kill all running things `killall node`

### To increase version

- first commit current changes (otherwise during postversion command it will ammend to last commit)
- change the version in `package.json` manually
- then run `npm run postversion`

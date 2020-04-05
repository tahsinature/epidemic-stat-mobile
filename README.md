belainna package

- "react-native-vector-icons": "^6.6.0"
  Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following: - apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"


sometimes need to do this one:
In the android/app/build.gradle file,
```
android {
    defaultConfig {
        ...
        targetSdkVersion 28
        multiDexEnabled true
    }
    ...
}
```


- `killall node`
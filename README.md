### Packages that need to be configured

- `react-native-vector-icons`: "^6.6.0"
  <br/>
  Edit android/app/build.gradle ( NOT android/build.gradle ) and add the following: - apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

- sometimes need to do this one in the `android/app/build.gradle file`,

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

- `react-native-tooltips`
  <br/>
  need to configure for ios => https://github.com/prscX/react-native-tooltips

<br/>
<br/>
<br/>

### To increase version

- first commit current changes (otherwise during postversion command it will ammend to last commit)
- change the version in `package.json` manually
- then run `npm run postversion`
  <br/>
  <br/>
  <br/>

### Tips

- to kill all running things `killall node`

### Environment

```json
{
  "node": "v12.13.0",
  "npm": "6.14.2",
  "react-native-cli": "2.0.1",
  "react-native": "0.62.0"
}
```

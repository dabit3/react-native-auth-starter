# React Native Auth Starter

Easy authentication for your next React Native app.

![](https://i.imgur.com/4PMkScx.jpg)

### 🎧 Powered by [Amplify](https://github.com/aws/aws-amplify)

## Features   

✅ React Navigation   

✅ Redux   

✅ Opinionated yet configurable   

✅ Themeable   


## Getting Started   

1. Clone project   

git clone https://github.com/dabit3/react-native-auth-starter.git

2. Change into react-native-auth-starter directory   

cd react-native-auth-starter

3. Install dependencies   

yarn || npm install

4. Configure AWS Amplify settings or hook up your own auth provider (index.js).   

```
import Amplify from 'aws-amplify-react-native'

Amplify.configure({
  Auth: {
      identityPoolId: <IDENTITY_POOL_ID>, //REQUIRED - Amazon Cognito Identity Pool ID
      region: '<REGION>', // REQUIRED - Amazon Cognito Region
      userPoolId: '<USER_POOL_ID>', //OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: '<USER_POOL_WEB_CLIENT>',
  }
});
```


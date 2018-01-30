# React Native Auth Starter

Easy authentication for your next React Native app.

![](https://i.imgur.com/4PMkScx.jpg)

### 🎧 Powered by [Amplify](https://github.com/aws/aws-amplify)

## Features   

✅ Preconfigured, production tested authentication flow  

✅ React Navigation   

✅ Redux   

✅ Amplify React Native     

✅ Opinionated yet configurable   

✅ Themeable   

✅ Cross-Platform   


## Roadmap    

⬜️ Social Logins / Federated Identities

⬜️ Optional intro / onboarding flow    


## Getting Started   

1. Clone project   

```
git clone https://github.com/dabit3/react-native-auth-starter.git
```

2. Change into react-native-auth-starter directory   

```
cd react-native-auth-starter
```

3. Install dependencies   

```
yarn || npm install
react-native link amazon-cognito-identity-js
```

4. Configure AWS Amplify settings or hook up your own auth provider (index.js).   

## Automated Configuration

Using the [awsmobile-cli](https://github.com/aws/awsmobile-cli):
```
$ npm install -g awsmobile-cli
$ cd ./react-native-auth-starter
$ awsmobile init
 > You can choose defaults for all question answers
$ awsmobile enable user-signin
```

Then within index.js:

```
import Amplify from 'aws-amplify';
import AWS from 'aws-exports';
Amplify.configure(AWS);
```

Run it!

## Manual Configuration
```
import Amplify from 'aws-amplify'

Amplify.configure({
  Auth: {
      identityPoolId: <IDENTITY_POOL_ID>, //REQUIRED - Amazon Cognito Identity Pool ID
      region: '<REGION>', // REQUIRED - Amazon Cognito Region
      userPoolId: '<USER_POOL_ID>', //OPTIONAL - Amazon Cognito User Pool ID
      userPoolWebClientId: '<USER_POOL_WEB_CLIENT>',
  }
});
```


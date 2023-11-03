## Tutorials
* Node 18X
* [CDK and NestJs app](https://medium.com/nextfaze/deploying-serverless-api-with-nestjs-and-aws-cdk-3d41063543e0) and [Git link](https://github.com/NextFaze/awesome-serverless-api)
* [Nest and Serverless](https://blog.logrocket.com/nest-js-serverless-application-aws-dynamodb/)
* [APGW with hosted Cognito Zone](https://medium.com/@michael.leigh.stewart/securing-an-api-with-aws-cdk-api-gateway-and-cognito-cee9158a2ddb)
* [CDK Api gateway Lambda Dynamo](https://conermurphy.com/blog/build-rest-api-aws-cdk-api-gateway-lambda-dynamodb-api-key-authentication) and [Git link](https://github.com/conermurphy/cdk-tutorials/tree/main/rest-api-with-api-key-auth)

## Initialize steps
* `npx cdk init --language typescript`
* `npx npm-check-updates -u`
* `nest new api --skip-git`
* Adding your credentials to environment variables through `aws configure`
* Or `ada credentials update --account=954139009987 --provider=conduit --role=IibsAdminAccess-DO-NOT-DELETE --once`

## CDK Commands
* The `cdk.json` file tells the CDK Toolkit how to execute your app.
* Run `npm run build` to clean up /dist, compile to Js files and synth cdk
* Run `cdk synth` to emits the synthesized CloudFormation template
* CDK will use ts-node to synthesize TS codes directly into cdk.out templates. See cdk.json
```
  "app": "npx ts-node --prefer-ts-exts bin/nest-giftcard.ts",
```
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk bootstrap`   bootstrapping your aws account for first time using cdk deployment
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk deploy --hotswap <STACK_NAME>` to quick deploy with hot swapping
* `cdk list` to list all available cdk stacks


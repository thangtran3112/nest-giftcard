## Tutorials
* Node 18X
* [CDK and NestJs app](https://medium.com/nextfaze/deploying-serverless-api-with-nestjs-and-aws-cdk-3d41063543e0) and [Git link](https://github.com/NextFaze/awesome-serverless-api)
* [CDK Api gateway Lambda Dynamo](https://conermurphy.com/blog/build-rest-api-aws-cdk-api-gateway-lambda-dynamodb-api-key-authentication) and [Git link](https://github.com/conermurphy/cdk-tutorials/tree/main/rest-api-with-api-key-auth)

## Initialize steps
* `npx cdk init --language typescript`
* `npx npm-check-updates -u`
* `nest new api --skip-git`
* Adding your credentials to environment variables through `aws configure`
* Or `ada credentials update --account=954139009987 --provider=conduit --role=IibsAdminAccess-DO-NOT-DELETE --once`

## CDK Useful commands
* The `cdk.json` file tells the CDK Toolkit how to execute your app.
* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


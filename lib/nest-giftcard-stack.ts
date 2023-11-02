import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiConstruct } from './api.construct';
import { Cognito } from './cognito-construct';

export default class NestGiftcardStack extends cdk.Stack {
  // Apply default config here
  config = { hostedAuthDomainPrefix: `my-auth-1591780305` };

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cognitoResources = new Cognito(this, 'Cognito', {
      hostedAuthDomainPrefix: this.config.hostedAuthDomainPrefix,
    });
    new ApiConstruct(this, 'ApiConstruct', {
      userPool: cognitoResources.userPool,
    });
  }
}

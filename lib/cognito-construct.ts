import { IUserPool, OAuthScope, UserPool, UserPoolClient, UserPoolClientIdentityProvider, UserPoolDomain } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

// this will be used to create unique auth domain hosted on `auth.ap-southeast-2.amazoncognito.com` for example.
interface CognitoProps {
  hostedAuthDomainPrefix: string;
}

/**
 * @description This Construct creates all the resources required to enable
 * oauth based authentication
 * see more details here: https://medium.com/nextfaze/deploying-serverless-api-with-nestjs-and-aws-cdk-3d41063543e0
 */
export class Cognito extends Construct {
  readonly userPool: IUserPool;
  constructor(
    scope: Construct,
    id: string,
    { hostedAuthDomainPrefix }: CognitoProps,
  ) {
    super(scope, id);

    // configure user directory to store user and their sessions
    this.userPool = new UserPool(this, 'UserPool', {
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
        },
      },
      signInAliases: {
        email: true,
        username: true,
        preferredUsername: true,
      },
      selfSignUpEnabled: true,
    });

    // configure userPoolClient for our api
    const userPoolClient = new UserPoolClient(this, 'UserPoolClient', {
      userPool: this.userPool,
      userPoolClientName: 'My Awesome App Client',
      authFlows: {
        userSrp: true,
        // refreshToken: true, //option is no longer available
      },
      oAuth: {
        flows: {
          // it is recommended to not use implicitCodeGrant flow in general
          // see more https://oauth.net/2/grant-types/implicit/#:~:text=It%20is%20not%20recommended%20to,been%20received%20by%20the%20client.
          implicitCodeGrant: true,
        },
        scopes: [ 
          OAuthScope.PROFILE, 
          OAuthScope.COGNITO_ADMIN 
        ],
        callbackUrls: [ 'https://www.google.com' ],
      },
      supportedIdentityProviders: [
        UserPoolClientIdentityProvider.COGNITO
      ],
      preventUserExistenceErrors: true,
    });

    // configure cognito hosted OAuth 2.0 server
    //https://medium.com/nextfaze/deploying-serverless-api-with-nestjs-and-aws-cdk-3d41063543e0
    const userPoolDomain = new UserPoolDomain(this, 'UserPoolDomain', {
      userPool: this.userPool,
      cognitoDomain: {
        domainPrefix: hostedAuthDomainPrefix,
      },
    });
  }
}
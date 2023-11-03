import {
  AuthorizationType,
  CfnAuthorizer,
  CfnMethod,
  Cors,
  LambdaIntegration,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { resolve } from 'path';
import { TABLE_NAME } from '../bin/stage';

export interface ApiConstructProps {
  userPool: IUserPool;
}

export class ApiConstruct extends Construct {
  constructor(scope: Construct, id: string, { userPool }: ApiConstructProps) {
    super(scope, id);

    // add dynamo db table to store our todo
    const table = new Table(this, 'Table', {
      tableName: TABLE_NAME,
      partitionKey: { name: 'PK', type: AttributeType.STRING },
      sortKey: { name: 'SK', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    // pack all external deps in layer
    const lambdaLayer = new LayerVersion(this, 'HandlerLayer', {
      code: Code.fromAsset(resolve(__dirname, '../api/node_modules')),
      compatibleRuntimes: [Runtime.NODEJS_18_X, Runtime.NODEJS_18_X],
      description: 'Api Handler Dependencies',
    });

    // add handler to respond to all our api requests
    const handler = new Function(this, 'Handler', {
      code: Code.fromAsset(resolve(__dirname, '../api/dist'), {
        exclude: ['node_modules'],
      }),
      handler: 'main.api',
      logRetention: RetentionDays.ONE_YEAR,
      runtime: Runtime.NODEJS_18_X,
      layers: [lambdaLayer],
      environment: {
        NODE_PATH: '$NODE_PATH:/opt',
        tableName: table.tableName,
      },
    });
    table.grantReadWriteData(handler);

    // add api resource to handle all http traffic and pass it to our handler
    const restApi = new RestApi(this, 'Api', {
      deploy: true,
      defaultMethodOptions: {
        apiKeyRequired: true,
      },
      deployOptions: {
        stageName: 'v1',
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'Access-Control-Allow-Credentials',
          'Access-Control-Allow-Headers',
          'Impersonating-User-Sub',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: Cors.ALL_ORIGINS,
      },
    });

    // add proxy resource to handle all api requests
    const apiResource = restApi.root.addProxy({
      defaultIntegration: new LambdaIntegration(handler),
      defaultMethodOptions: {
        authorizationType: AuthorizationType.COGNITO,
      },
    });

    // add api key to enable monitoring
    const apiKey = restApi.addApiKey('ApiKey');
    const usagePlan = restApi.addUsagePlan('UsagePlan', {
      name: 'Standard',
    });

    usagePlan.addApiStage({
      stage: restApi.deploymentStage,
    });
    usagePlan.addApiKey(apiKey);

    // add cognito authorizer
    const anyMethod = apiResource.anyMethod?.node.defaultChild as CfnMethod;
    const authorizer = new CfnAuthorizer(this, 'CognitoAuthorizer', {
      name: 'Test_Cognito_Authorizer',
      identitySource: 'method.request.header.Authorization',
      providerArns: [userPool.userPoolArn],
      restApiId: restApi.restApiId,
      type: 'COGNITO_USER_POOLS',
    });
    anyMethod.node.addDependency(authorizer);
    anyMethod.addOverride('Properties.AuthorizerId', authorizer.ref);
  }
}

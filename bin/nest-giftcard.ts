#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import NestGiftcardStack from '../lib/nest-giftcard-stack';
import { AWS_ACCOUNT, AWS_REGION } from './stage';

const app = new cdk.App();

// nano ~/.zshrc or supply .env files
new NestGiftcardStack(app, 'NestGiftcardStack', {
  env: { account: AWS_ACCOUNT, region: AWS_REGION }
  
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
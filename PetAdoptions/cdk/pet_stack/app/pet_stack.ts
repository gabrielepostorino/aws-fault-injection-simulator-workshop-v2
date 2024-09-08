#!/usr/bin/env node
import 'source-map-support/register';
import { Services } from '../lib/services';
import { Applications } from '../lib/applications';
//import { EKSPetsite } from '../lib/ekspetsite'
import { App, Tags, Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { FisServerless } from '../lib/fis_serverless';
import { Observability } from '../lib/observability'
import { LoadTesting } from '../lib/load_testing';
import { REGION,ServiceStackProps } from '../lib/common/shared-properties';



if (!process.env.CDK_DEFAULT_REGION) {
  throw Error('Could not resolve region. Please pass it with the AWS_REGION environment variable.');
  const MAIN_REGION: REGION = 'us-east-1' as REGION;
}

const MAIN_REGION: REGION = process.env.CDK_DEFAULT_REGION as REGION;
// I need to get this updated before the release to capture the actual enabled region in the WS.
const SECONDARY_REGION: REGION = 'us-west-2' as REGION;

const stackName = "Services";
const app = new App();

const stack = new Services(app, stackName, { 
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
},
MainRegion: MAIN_REGION,
SecondaryRegion: SECONDARY_REGION,
});

const applications = new Applications(app, "Applications", {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
}});

const fis_serverless = new FisServerless(app, "FisServerless", {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
}});

const observability = new Observability(app, "Observability", {
  env: {
      account: process.env.CDK_DEFAULT_ACCOUNT, 
      region: process.env.CDK_DEFAULT_REGION 
}});

const load_testing = new LoadTesting(app, "LoadTesting", {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION 
}});

Tags.of(app).add("Workshop","true")
Tags.of(app).add("AzImpairmentPower","Ready")
//Aspects.of(stack).add(new AwsSolutionsChecks({verbose: true}));
//Aspects.of(applications).add(new AwsSolutionsChecks({verbose: true}));

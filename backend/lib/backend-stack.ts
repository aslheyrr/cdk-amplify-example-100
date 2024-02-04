import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  AmplifyGraphqlApi,
  AmplifyGraphqlDefinition,
} from "@aws-amplify/graphql-api-construct";
import * as path from "path";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Code, FunctionRuntime } from "aws-cdk-lib/aws-appsync";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, "MyNewUserPool");
    new UserPoolClient(this, "MyNewUserPoolClient", { userPool: userPool });

    const amplifyApi = new AmplifyGraphqlApi(this, "MyNewApi", {
      definition: AmplifyGraphqlDefinition.fromFiles(
        path.join(__dirname, "schema.graphql")
      ),
      authorizationModes: {
        defaultAuthorizationMode: "API_KEY",
        apiKeyConfig: {
          expires: cdk.Duration.days(30),
        },
        userPoolConfig: { userPool: userPool },
      },
    });

    const broadCastDataSource = amplifyApi.addNoneDataSource("BroadcastNone")
    amplifyApi.addResolver("BroadcastResolver", {
      dataSource: broadCastDataSource,
      typeName: "Mutation",
      fieldName: "broadcastLiveMessage",
      code: Code.fromAsset(path.join(__dirname, "resolvers", "broadcastLiveMessage.js")),
      runtime: FunctionRuntime.JS_1_0_0
    })
  }
}

# Connect a React app to GraphQL and DynamoDB with AWS CDK and Amplify

by Rene Brandel on 04 OCT 2023
Today, we're excited to announce the official AWS Cloud
Development Kit (CDK) construct for Amplify's GraphQL APIs capabilities.
 With Amplify's GraphQL API CDK construct, you can create a real-time [GraphQL API](https://aws.amazon.com/graphql/) backed by data sources such as [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) tables or [AWS Lambda](https://aws.amazon.com/lambda/) functions using a single GraphQL schema definition. ([View on Construct Hub](http://constructs.dev/packages/@aws-amplify/graphql-api-construct/))

![Diagram illustrating the new Amplify GraphQL API feature](Connect%20a%20React%20app%20to%20GraphQL%20and%20DynamoDB%20with%20AWS%20CDK%20and%20Amplify%20Front-End%20Web%20&%20Mobile_files/Screenshot-2023-10-02-at-9.52.35-AM-1024x411.png)Launching
 an API for application frontends requires developers to author
thousands of lines of repetitive, undifferentiated code to build and
wire together API endpoints, custom business logic, and data sources. [AWS Amplify](https://aws.amazon.com/amplify/)
removes this heavy-lifting by allowing developers to define their
application data model in a single definition file and automatically
generate the required AWS cloud resources to support common API
operations like create, update, list, read, subscribe, and delete for
their data sources. Today, we're extending this capability, previously
only available using the Amplify CLI to AWS CDK.

Check out the Amplify session at CDK Day 2023, where we gave everyone a sneak peek into the new Amplify GraphQL API construct:

Let's take an in-depth tour into the new GraphQL API
construct! This blog post will focus on 6 new features available to CDK
customers who need a backend for their frontend:

1. Seamlessly integrated with your existing CDK apps and resources
2. Single source of truth for your app's real-time API and data stack
3. Authorization rules that are both easy to start and easy to extend
4. Extensible custom query, mutation, or subscription APIs
5. Remain in full control of generated resources. Escape hatch to L2 and L1 constructs
6. First-class client library support for real-time capabilities

## 1. Seamlessly integrated with your existing CDK apps and resources

You can use the new Amplify GraphQL API CDK construct as a
drop-in component within your existing CDK applications. It will
seamlessly integrate with your existing resources like Lambda functions.
 Building on CDK's composable architecture, you can use your handcrafted
 or imported resources as data sources for your GraphQL API while still
benefiting from Amplify's automated CRUD operations, authorization
rules, and real-time subscriptions powered by AWS AppSync. With the new
Amplify GraphQL API construct, you start with CDK, iterate with CDK, and
 deploy with CDK.

To get started, you can use your existing CDK app or create a new one:

```bash
mkdir amplify-cdk-demo
cd amplify-cdk-demo
mkdir backend
cd backend
cdk init app --language=typescript
```

Bash

Then install the new Amplify GraphQL API CDK construct dependency, with the following command:

```bash
npm install @aws-amplify/graphql-api-construct
```

Bash

In your CDK app's `lib/backend-stack.ts` file, import and initialize the new Amplify GraphQL API construct:

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AmplifyGraphqlApi, AmplifyGraphqlDefinition } from '@aws-amplify/graphql-api-construct';
import * as path from 'path'

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyApi = new AmplifyGraphqlApi(this, "MyNewApi", {
      definition: AmplifyGraphqlDefinition.fromFiles(path.join(__dirname, "schema.graphql")),
      authorizationModes: {
        defaultAuthorizationMode: 'API_KEY',
        apiKeyConfig: {
          expires: cdk.Duration.days(30)
        }
      }
    })
  }
}
```

TypeScript

The code snippet above instantiates a new API based on a schema definition stored in `lib/schema.graphql`
and uses the API Key as the default authorizationMode with with the
API. The API Key expires in 30 days from the time of deployment.

Next, let's create a new file in your `lib/` folder called `schema.graphql` to that'll serve as the single source of truth of our application data model and APIs.

## 2. Single source-of-truth for your app's real-time API and data stack

With the new Amplify GraphQL API construct, CDK developers can
 simply define their data model in the GraphQL Schema Definition
Language and enhance them with "directives" to generate accompanying
data sources, such as DynamoDB tables ("@model"), Lambda functions
("@function"), or OpenSearch clusters ("@searchable"). The CDK construct
 has full feature parity with the existing GraphQL Transformer
capabilities in the Amplify CLI. Developers can also secure their API
and data using the "@auth" directive that provides deny-by-default
authorization, as well as the ability to configure global, model-level,
and field-level authorization rules. The new CDK construct is fully
extensible as well with capabilities to access and customize all
resources generated by Amplify from within their CDK code.

The schema below describes a Blog application. Copy paste the following GraphQL schema in your application:

```graphql
type Blog @model @auth(rules: [{ allow: public }]) {
  title: String
  content: String
  authors: [String]
}
```

GraphQL

Now, let's deploy your application with CDK and answer "y" when prompted:

```bash
cdk deploy
```

Bash

After deployment is complete, we can go to the [AWS AppSync console](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/apis), select the API and run some test queries. Try to run a create and list query to see the results:

![GIF showing how to run queries on AppSync console](Connect%20a%20React%20app%20to%20GraphQL%20and%20DynamoDB%20with%20AWS%20CDK%20and%20Amplify%20Front-End%20Web%20&%20Mobile_files/AppSync-console-demo-compressed.gif)

## 3. Authorization rules that are both easy to start and easy to extend

The new Amplify GraphQL API CDK construct makes it simple to
get started with authorization by providing deny-by-default rules out of
 the box. You can further customize access control by adding granular
auth rules at the API level, per data model, or even individual fields.
Amplify provides common authorization rule, such as per-user,
multi-user, per-group, or multi-group access to specific records. These
rules work with Amazon Cognito or any OpenID Connect (OIDC) provider. To
 achieve custom authorization patterns, you can leverage a Lambda
function for authorization as well. With this declarative auth model,
you get robust access control that scales as your application grows.

Let's lock down our API to users in the public can read every
blog but a signed in users can create, read, update, delete blogs.
First, let's update the GraphQL schema to scope down the "public" access
 rule and add a new "owner" authorization rule. "Owner" authorization
rule allows you to specify per-user authorizations. When a signed in
user create a new record, the record is automatically designates the
signed in user as the owner.

```graphql
type Blog @model @auth(rules: [
  { allow: public, operations: [ read ] },
  { allow: owner }
]) {
  title: String
  content: String
  authors: [String]
}
```

GraphQL

The authorization rules are defined as:

* Public (users using the API key) can read any blog
* Owner (users signed in via Cognito) can create, read, update, and delete their own blogs

**Note**: you can add even more advanced
authorization like group-based authorization or field-level
authorization. This allows you to expand to use cases such as: "Only
allow members of _Admins_ group delete blogs" or "Add a new _privateNotes_ field that's only visible to signed in authors". Review the full scope of authorization capabilities in [our documentation](https://docs.amplify.aws/cli/graphql/authorization-rules/).

Update the CDK construct properties in `lib/backend-stack.ts` to use either a new user pool or an existing user pool for user sign-in and sign-up management:

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AmplifyGraphqlApi, AmplifyGraphqlDefinition } from '@aws-amplify/graphql-api-construct';
import * as path from 'path'
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new UserPool(this, "MyNewUserPool")
    new UserPoolClient(this, "MyNewUserPoolClient", { userPool: userPool })

    const amplifyApi = new AmplifyGraphqlApi(this, "MyNewApi", {
      definition: AmplifyGraphqlDefinition.fromFiles(path.join(__dirname, "schema.graphql")),
      authorizationModes: {
        defaultAuthorizationMode: 'API_KEY',
        apiKeyConfig: {
          expires: cdk.Duration.days(30)
        },
        userPoolConfig: {
          userPool: userPool
        }
      }
    })
  }
}
```

TypeScript

Deploy your latest again with the following command:

```bash
cdk deploy
```

Bash

After deployment, create a test user in the [Amazon Cognito user pool console](https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-east-1):

![GIF showing how to create a test user in Cognito console](Connect%20a%20React%20app%20to%20GraphQL%20and%20DynamoDB%20with%20AWS%20CDK%20and%20Amplify%20Front-End%20Web%20&%20Mobile_files/Cognito-console.gif)

Then you can go back to [your AppSync console](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/apis) and run some GraphQL queries to test with both API key as the authentication method and as a signed in user:

![GIF showing how authorization rules affected the queries](Connect%20a%20React%20app%20to%20GraphQL%20and%20DynamoDB%20with%20AWS%20CDK%20and%20Amplify%20Front-End%20Web%20&%20Mobile_files/Authorized-AppSync-console-compressed.gif)

## 4. Extensible custom query, mutation, or subscription APIs

Need to implement custom business logic beyond basic CRUD
operations? The Amplify GraphQL API CDK construct makes it easy to
define custom GraphQL resolvers that trigger your own Lambda functions.
Add custom queries, mutations, or subscriptions to implement specialized
 APIs like search, analytics, or messaging. Define custom data types to
structure the response formats. Access data from any source like RDS or
third-party APIs. Amplify handles wiring everything together, generating
 the GraphQL schema, and building client SDKs – while you focus on
authoring the custom logic. Extend your API capabilities with the
flexibility of GraphQL and AWS Lambda.

For example, we'll build a simple PubSub API capability to our
 blogging application for "live blogging events". Readers can show up on
 the blog site and live broadcast messages with each other.

First, we need to edit our GraphQL schema to add a mutation
that allows signedIn users to send a message and a subscription to
receive the message:

```graphql
type Blog @model @auth(rules: [
  { allow: public, operations: [ read ] },
  { allow: owner }
]) {
  title: String
  content: String
  authors: [String]
}

type Mutation {
  broadcastLiveMessage(message: String): String
}

type Subscription {
  subscribeToLiveMessages: String @aws_subscribe(mutations: ["broadcastLiveMessage"])
}
```

GraphQL

The `@aws_subscribe` directive sets up a real-time subscription for all the mutations designated in the `mutations` argument.

Next, let's go back to our CDK code in `lib/backend-stack.ts` to add a JavaScript resolver to pass the message from the `broadcastLiveMessage` mutation to the `subscribeToLiveMessages` subscription.

First, import some dependencies from AppSync to reference the
JavaScript resolver code assets and to configure the resolver runtime.
Go to the top of your file and add the following import statements:

```typescript
import { Code, FunctionRuntime } from 'aws-cdk-lib/aws-appsync';
```

TypeScript

Then, add the following content after you've instantiated the Amplify GraphQL API:

```typescript
    const broadcastDataSource = amplifyApi.addNoneDataSource("BroadcastNone")
    amplifyApi.addResolver("BroadcastResolver", {
      dataSource: broadcastDataSource,
      typeName: 'Mutation',
      fieldName: 'broadcastLiveMessage',
      code: Code.fromAsset(path.join(__dirname, 'resolvers', 'broadcastLiveMessage.js')),
      runtime: FunctionRuntime.JS_1_0_0
    })
```

TypeScript

In the code above, we first create a "NONE" data source and add a new resolver to the API to handle the `broadcastLiveMessage`
mutation. This type of data source is used when you want the action to
be resolved locally within AppSync, without reaching out to another AWS
service.

To handle the `broadcastLiveMessage` mutation, create a new file `broadcastLiveMessage.js` in a new resolvers folder. The `resolvers/broadcastLiveMessage.js` uses the message argument from the mutation and passes it as the result forward to the subscription:

```javascript
export function request(ctx) {
  return {
    payload: {
      message: ctx.arguments.message
    }
  }
}

export function response(ctx) {
  return ctx.result.message
}
```

JavaScript

Let's deploy our changes again:

```bash
cdk deploy
```

Bash

Now, let's validate our changes by opening two AppSync console
 windows. One with a public-facing subscription and another one that
we'll use to send the mutation:

![GIF showing custom mutation and subscription working](Connect%20a%20React%20app%20to%20GraphQL%20and%20DynamoDB%20with%20AWS%20CDK%20and%20Amplify%20Front-End%20Web%20&%20Mobile_files/AppSync-custom-mutation.gif)

## 5. Remain in full control of generated resources. Escape hatch to L2 and L1 constructs

While Amplify handles provisioning of base resources like
DynamoDB tables and Lambda functions, we know developers need deeper
access as applications mature. The CDK construct provides an escape
hatch to directly access underlying resources through L2 and L1 CDK
constructs. Tweak the DynamoDB billing mode, add VPC interfaces to
Lambdas, or customize OpenSearch indexes with the full power of CDK.
Amplify lifts the initial heavy lifting while getting out of your way
when you need more control.

All generated resources, such as the AppSync API or DynamoDB tables are available under the `.resources`
parameter as L2 constructs. You can drop down even further to the L1
constructs of the generated resources by accessing them via `.resources.cfnResources`.
 For example, to enable X-Ray tracing on the underlying AppSync API, you
 can "drop down" to the L1 level and set the necessary X-Ray tracing:

```typescript
    amplifyApi.resources.cfnResources.cfnGraphqlApi.xrayEnabled = true
```

TypeScript

Once set, you can redeploy your changes again:

`cdk deploy`

## 6. First-class client library support for real-time capabilities

Along with streamlining backend implementation, Amplify
provides autogeneration of strongly-typed client SDKs for your GraphQL
API. Get out-of-the-box support for real-time data and powerful GraphQL
query capabilities on your client apps. For web apps, we generate a
React-based JavaScript client. For cross-platform or mobile apps, we
support Android, iOS, and React Native; review how to generate
corresponding client code for those platforms on [our documentation](https://docs.amplify.aws/cli/graphql/client-code-generation). With Amplify client libraries, you can build engaging user experiences without having to hand-code complex networking logic.

In this example, I'll use a React application to showcase this
 live blog. First, create a new React application by running the
following commands from your Terminal:

```bash
cd ..
npx create-react-app frontend
cd frontend
```

Bash

Your overall folder structure should look something like this:

```bash
amplify-cdk-demo
|-backend
|-frontend
```

Bash

Next, install the Amplify library, which we'll use to connect our application to the backend API:

```bash
npm install aws-amplify
```

Bash

Then we need to configure the Amplify library to be "aware" of
 our backend API. Go to your app's entry point (i.e. index.js) and
configure the Amplify library with the API endpoint information printed
from your Terminal when you ran cdk deploy. You should see something
like this printed in your last `cdk deploy`:

```bash
✨  Deployment time: 62.86s

Outputs:
BackendStack.amplifyApiModelSchemaS3Uri = s3://backendstack-mynewapiamplifycodegenassetsamplifyc-1u3xykyhe309m/model-schema.graphql
BackendStack.awsAppsyncApiEndpoint = https://wy5mtp7jzfctxc5w5pzkcoktbi.appsync-api.us-east-1.amazonaws.com/graphql
BackendStack.awsAppsyncApiId = eci46vifpvbvhno55uo2ovtoqm
BackendStack.awsAppsyncApiKey = da2-XXXX
BackendStack.awsAppsyncAuthenticationType = API_KEY
BackendStack.awsAppsyncRegion = us-east-1
```

Bash

In your frontend code's `index.js` file, import the Amplify Library and configure them with the corresponding information:

```javascript

import { Amplify } from 'aws-amplify'

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: 'https://wy5mtp7jzfctxc5w5pzkcoktbi.appsync-api.us-east-1.amazonaws.com/graphql',
      defaultAuthMode: 'apiKey',
      apiKey: 'da2-XXXX',
      region: 'us-east-1',
    }
  }
})
```

JavaScript

While we can use the `API` category APIs from the
Amplify library to write raw GraphQL requests, we could also let Amplify
 generate the majority of common requests for us using the following `npx` script:

```bash
npx @aws-amplify/cli codegen add --apiId eci46vifpvbvhno55uo2ovtoqm --region us-east-1
npx @aws-amplify/cli codegen
```

Bash

**Note:** every time you deploy a schema change on your backend, you'd need to rerun `npx @aws-amplify/cli codegen` to regenerated the corresponding client helper code.

We should see a new set of files in the `src/graphql/` folder. These are client code helpers for GraphQL queries, mutations, and subscriptions.

```bash
src/graphql/
├── mutations.js
├── queries.js
└── subscriptions.js
```

Bash

Let's make the necessary frontend UI changes to display the blogs and the live message capability. Go to your `App.js` file and replace it with the following content:

```javascript
import "./App.css";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listBlogs } from "./graphql/queries";
import { subscribeToLiveMessages } from "./graphql/subscriptions";
import { broadcastLiveMessage } from "./graphql/mutations";

const client = generateClient();

function App() {
  const [blogs, setBlogs] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // fetches all blog posts
    async function fetchBlogs() {
      const response = await client.graphql({
        query: listBlogs,
      });
      setBlogs(response.data.listBlogs.items);
    }
    fetchBlogs();

    // setup subscriptions for live chat messages
    const subscription = client.graphql({
      query: subscribeToLiveMessages
    }).subscribe(next => {
      setMessages(messages => [...messages, next.data.subscribeToLiveMessages])
    })

    return () => subscription.unsubscribe()
  }, []);

  // sends the live chat message to users
  function handleMessageSend(event) {
    if (event.key === 'Enter') {
      client.graphql({
        query: broadcastLiveMessage,
        variables: {
          message: event.target.value
        }
      })
    }
  }

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div>
        <h1>Articles</h1>
        {blogs.map((blog) => (
          <div style={{ border: '1px solid black', padding: 10, borderRadius: 10}}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
      <div>
        <h1>Live chat</h1>
        <input type="text" placeholder="Hit enter to send message" onKeyDown={handleMessageSend} />
        <hr></hr>
        <ul>
          {messages.map(message => <li>{message}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
```

JavaScript

In less than 70 lines of code, we built a blog post frontend
with a live chat functionality. To run the app locally, run the
following command in your Terminal:

```bash
npm run start
```

Bash

Your app should look something like this and try opening it up in another window to test the live chat feature:

![Demo of the live chat feature](Connect%20a%20React%20app%20to%20GraphQL%20and%20DynamoDB%20with%20AWS%20CDK%20and%20Amplify%20Front-End%20Web%20&%20Mobile_files/Live-chat.gif)

## 🥳 Success

Your real-time API and data stack deployed using CDK
integrated into an React app! This is just a small glimpse at the
capabilities that the Amplify GraphQL CDK construct enables. Be sure to
check out these resources as well to help you dive deeper:

* [Amplify GraphQL API construct on Construct Hub](http://constructs.dev/packages/@aws-amplify/graphql-api-construct/)
* [Authorization rules for Amplify's GraphQL API capabilities](https://docs.amplify.aws/cli/graphql/authorization-rules/)
* [Custom business logic (Lambda function, HTTP, and JS/VTL resolvers)](https://docs.amplify.aws/cli/graphql/custom-business-logic/)
* [Generate GraphQL client helper code for JavaScript, Android, Swift, and Flutter](https://docs.amplify.aws/cli/graphql/client-code-generation)

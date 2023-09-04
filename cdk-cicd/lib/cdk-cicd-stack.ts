import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, "MyPipeline", {
      pipelineName: "MyPipeline",
      synth: new ShellStep("Synth", {
        // input: CodePipelineSource.gitHub('kimjinho1/cdk-cicd-practice', 'cdk-cicd-practice'),
        input: CodePipelineSource.gitHub("kimjinho1/cdk-cicd-practice", "main"),
        commands: ["cd cdk-cicd", "npm ci", "npx cdk synth"],
        primaryOutputDirectory: "cdk-cicd/cdk.out",
      }),
    });
  }
}

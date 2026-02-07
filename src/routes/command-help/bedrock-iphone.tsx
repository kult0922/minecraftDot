import { createFileRoute } from "@tanstack/react-router";
import CommandHelpBedrockIphoneComponent from "src/Feature/CommandHelp/CommandHelpBedrockIphone";

export const Route = createFileRoute("/command-help/bedrock-iphone")({
  component: CommandHelpBedrockIphoneComponent,
});

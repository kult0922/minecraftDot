import { createFileRoute } from "@tanstack/react-router";
import CommandHelpBedrockComponent from "src/Feature/CommandHelp/CommandHelpBedrock";

export const Route = createFileRoute("/command-help/bedrock")({
  component: CommandHelpBedrockComponent,
});

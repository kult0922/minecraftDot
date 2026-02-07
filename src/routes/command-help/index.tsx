import { createFileRoute } from "@tanstack/react-router";
import CommandHelpComponent from "src/Feature/CommandHelp";

export const Route = createFileRoute("/command-help/")({
  component: CommandHelpComponent,
});

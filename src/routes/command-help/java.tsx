import { createFileRoute } from "@tanstack/react-router";
import CommandHelpJavaComponent from "src/Feature/CommandHelp/CommandHelpJava";

export const Route = createFileRoute("/command-help/java")({
  component: CommandHelpJavaComponent,
});

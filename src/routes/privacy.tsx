import { createFileRoute } from "@tanstack/react-router";
import PrivacyComponent from "src/Feature/Privacy";

export const Route = createFileRoute("/privacy")({
  component: PrivacyComponent,
});

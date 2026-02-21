import { createFileRoute } from "@tanstack/react-router";
import HomeComponent from "src/Feature/Home";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

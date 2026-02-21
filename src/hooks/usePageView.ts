import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { existsGaId, pageview } from "src/functions/gtag";

export default function usePageView() {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const unsubscribe = router.subscribe("onResolved", (event) => {
      pageview(event.toLocation.pathname);
    });

    return unsubscribe;
  }, [router]);
}

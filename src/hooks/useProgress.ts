"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useProgress() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }
    fetch("/api/progress")
      .then((r) => r.json())
      .then(setProgress)
      .finally(() => setLoading(false));
  }, [session]);

  return { progress, loading };
}

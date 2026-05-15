"use client";

import { useEffect } from "react";
import { storeLeadTrackingData } from "@/lib/leadTracking";

export default function LeadSourceTracker() {
  useEffect(() => {
    storeLeadTrackingData();
  }, []);

  return null;
}
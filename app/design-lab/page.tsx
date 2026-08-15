import { Metadata } from "next";
import DesignLabClient from "@/components/designlab/DesignLabClient";

// Local design tool. Never indexed, never linked from the site.
export const metadata: Metadata = {
  title: "Design Lab — internal",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignLabClient />;
}

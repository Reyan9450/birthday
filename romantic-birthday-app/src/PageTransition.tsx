import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  sectionKey: number;
}

// Inner component re-mounts on each sectionKey change via the key prop
function FadeIn({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={visible ? "page-fade-in" : "page-fade-init"}>
      {children}
    </div>
  );
}

export default function PageTransition({ children, sectionKey }: PageTransitionProps) {
  // Using key on FadeIn forces a full re-mount whenever sectionKey changes,
  // which restarts the fade-in animation for each new section.
  return <FadeIn key={sectionKey}>{children}</FadeIn>;
}

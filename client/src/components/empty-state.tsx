import type { ReactNode } from "react";
import emptyStateIllustration from "@assets/1238dd33-a759-49c6-a408-97180f73076e_1791104304351.png";
import "./empty-state.css";

interface EmptyStateProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "compact";
}

export default function EmptyState({
  children,
  className = "",
  size = "default",
}: EmptyStateProps) {
  return (
    <div className={`shared-empty-state shared-empty-state-${size} ${className}`.trim()}>
      <img
        className="shared-empty-state-image"
        src={emptyStateIllustration}
        alt=""
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
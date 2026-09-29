import type { ReactNode } from "react";
import emptyStateIllustration from "@assets/20260731_184420_1790710016752.png";
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
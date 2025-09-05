import { ReactNode } from "react";
import { GridWrapper, SwipeWrapper } from "./styles";

interface PostGridProps {
  variant: "all" | "recommended";
  children: ReactNode;
}

export default function PostGrid({ variant, children }: PostGridProps) {
  if (variant === "recommended") {
    return <SwipeWrapper>{children}</SwipeWrapper>;
  }
  return <GridWrapper>{children}</GridWrapper>;
}

export const theme = {
  color: {
    primary: "#FF4D3D",
    text: "#111",
    sub: "#6B7280",
    border: "#E5E7EB",
    bg: "#FAFAFA",
    success: "#16a34a",
    danger: "#dc2626",
  },
  radius: { xl: "16px", lg: "12px", md: "8px", sm: "6px" },
  shadow: { card: "0 8px 24px rgba(0,0,0,.06)" },
  space: (n: number) => `${n * 4}px`,
} as const;

export type AppTheme = typeof theme;

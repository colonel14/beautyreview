export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/dashboard", "/product/:path*", "/new-password"],
};

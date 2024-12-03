import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";
import { KindePermissions, KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export default withAuth(
  async function middleware(req: { kindeAuth: { user: KindeUser; permissions: KindePermissions; }; }) {
    console.log("Middleware", req.kindeAuth);
  },
  {
    isReturnToCurrentPage: true,
    // loginPage: "/login",
    publicPaths: ["/", '/jobs', '/jobs/[id]'],
    // isAuthorized: ({ token }) => {
    //   // The user will be considered authorized if they have the permission 'eat:chips'
    //   return token.permissions.includes("eat:chips");
    // }
  }
);

export const config = {
  matcher: ["/admin"]
};
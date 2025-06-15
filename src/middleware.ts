import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// This matcher protects everything except the public routes above
export const config = {
  matcher: [
    // Protect all routes except:
    // - /
    // - /login and all subroutes
    // - /register and all subroutes
    // - /api/webhooks and all subroutes
    "/((?!_next|.*\\..*|login(?:.*)|register(?:.*)|api/webhooks(?:.*)).*)",
  ],
};

import { WebflowClient } from "webflow-api";

export async function GET(request: Request) {
  const authorizeUrl = WebflowClient.authorizeURL({
    scope: [
      "sites:read",
      "sites:write",
      "users:read",
      "pages:read",
      "pages:write",
      "cms:read",
      "cms:write",
      "authorized_user:read",
    ],
    clientId: process.env.WEBFLOW_CLIENT_ID || "",
  });
  return Response.redirect(authorizeUrl);
}

import { WebflowClient } from "webflow-api";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accessToken = WebflowClient.getAccessToken({
    clientId: process.env.WEBFLOW_CLIENT_ID || "",
    clientSecret: process.env.WEBFLOW_CLIENT_SECRET || "",
    code: searchParams.get("code") || "",
  });
  const token = await accessToken;
  console.log(token);
  const cookie = cookies().set("wf_token", token);
  console.log(cookies().get("wf_token"));
  return Response.redirect("/success");
}

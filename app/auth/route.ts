import { WebflowClient } from "webflow-api";
import { cookies } from "next/headers";

interface DenoGlobal {
  version: {
    deno: string;
  };
}

interface BunGlobal {
  version: string;
}

declare const Deno: DenoGlobal;
declare const Bun: BunGlobal;

export async function GET(request: Request) {
  /**
   * A constant that indicates whether the environment the code is running is Deno.
   */
  const isDeno =
    typeof Deno !== "undefined" &&
    typeof Deno.version !== "undefined" &&
    typeof Deno.version.deno !== "undefined";

  /**
   * A constant that indicates whether the environment the code is running is Bun.sh.
   */
  const isBun =
    typeof Bun !== "undefined" && typeof Bun.version !== "undefined";

  const { searchParams } = new URL(request.url);
  console.log("CODE", searchParams.get("code"));
  const accessToken = WebflowClient.getAccessToken({
    clientId: process.env.WEBFLOW_CLIENT_ID || "",
    clientSecret: process.env.WEBFLOW_CLIENT_SECRET || "",
    code: searchParams.get("code") || "",
  });
  const token = await accessToken;
  const cookie = cookies().set("wf_token", token);
  console.log(cookies().get("wf_token"));
  return Response.redirect("https://6cqc4w-3000.csb.app/success");
}

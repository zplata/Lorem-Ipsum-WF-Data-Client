import { WebflowClient } from "webflow-api";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const retCookies = cookies();
  const token = retCookies.get("wf_token")?.value || "";
  const res = await request.json();

  const WFClient = new WebflowClient({ accessToken: token });
  const newPage = await WFClient.pages.updatePageSettings(res.pageId, {
    body: {
      title: `${res.translation} IPSUM LOREM`,
    },
  });
  return Response.json({page: newPage});
}

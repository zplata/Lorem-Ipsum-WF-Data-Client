import { cookies, headers } from "next/headers";
import { WebflowClient } from "webflow-api";
import MainBody from "./components/mainbody";

export default async function Success() {
  const accessToken = cookies().get("wf_token")?.value || "";
  const wfClient = new WebflowClient({
    accessToken,
  });
  const sites = await wfClient.sites.list();
  const pages = await wfClient.pages.list(sites?.sites?.[0]?.id || "");
  const pagesArr = pages?.pages || [];
  return (
    <div style={{ height: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Turn a Page Title to Lorem Ipsum</h1>
      <MainBody options={pagesArr} />
    </div>
  );
}

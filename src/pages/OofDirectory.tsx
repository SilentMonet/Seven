import { useInfiniteQuery } from "@tanstack/react-query";
import Page from "../components/Page";
import { useParams } from "react-router";
import { OofAPI } from "../api";
import { useSearchParam } from "../hooks";
import { StatusContainer } from "../components/StatusContainer";
import { OofNode } from "../components/OofNode";

export function OofDirectory() {
  const params = useParams();
  const path = params["*"]?.startsWith("/")
    ? params["*"]
    : `/${params["*"] ?? ""}`;
  const title = decodeURIComponent(path).split("/").reverse()[0];
  const [cid] = useSearchParam("cid", "0");
  const query = useInfiniteQuery({
    queryKey: ["oof", cid],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const blockedFolders = localStorage.getItem("BLOCKED_FOLDERS") || "";
      const blockedFileTypes = localStorage.getItem("BLOCKED_FILE_TYPES") || "";
      const blockedFileNames = localStorage.getItem("BLOCKED_FILE_NAMES") || "";
      return OofAPI.list(cid, pageParam, 200).then((resp) => resp?.data || []).then((list) =>
        list.filter((item) => {
          if (item.n.startsWith('_')) {
            return false;
          }
          if (item.sha) {
            if (blockedFileNames && blockedFileNames.split(",").some(name => item.n.includes(name))) {
              return false;
            }
            return (blockedFileTypes && blockedFileTypes.split(",").some(fileType => item.n.endsWith(fileType))) ? false : true; // 忽略被屏蔽的文件
          } else {
            return blockedFolders && blockedFolders.split(",").some(name => item.n.includes(name)) ? false : true;
          }
        })
      );
    },
    getNextPageParam(lastPage, pages) {
      if (lastPage.length < 180) return;
      return pages.length * 200;
    },
  });
  // const nodeList = useMemo(
  //   () => query.data?.pages.flat() || [],
  //   [query.data?.pages]
  // );
  return (
    <Page title={title || 'OOF'} showBack={false}>
      <StatusContainer query={query} >
        {
          ((data) => {
            return data.pages.flat().map((item) => <OofNode meta={item} />)
          })
        }
      </StatusContainer>
    </Page>
  );
}
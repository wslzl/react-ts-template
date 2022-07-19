import { http } from "@/utils";

export function getIpDetails(p = {}) {
  return http
    .get({
      url: "/api/test",
      params: {
        ...p,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}

import { request } from "../axios";

export const articleCategoryQuery  = userId => request({
  method:"get",
  url:`blog/category/query?user_id=${userId}`,
})
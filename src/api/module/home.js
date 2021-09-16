import { request } from "../axios";

export const articleCategoryQuery  = userId => request({
  method:"get",
  url:`/blog/category/query?user_id=${userId}`,
})

export const login = oData => request({
  method:"post",
  url:`/login`,
  data:oData
})




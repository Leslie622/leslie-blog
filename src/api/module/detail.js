import { request } from "../axios";

export const articleDetailQuery = articleID => request({
  method:"get",
  url:`blog/detail?id=${articleID}`
})
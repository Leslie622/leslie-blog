import { request } from "@/api/axios.js";

export const articleDetailQuery = articleID => request({
  method:"get",
  url:`blog/detail?id=${articleID}`
})
import { request } from "@/api/axios.js";

export const articleCategoryQuery  = userId => request({
  method:"get",
  url:`blog/category/query?user_id=${userId}`,
})

export const articleListQuery = (cateId,pageNum=1,pageSize=10) => request({
  method:"get",
  url:`blog/query/withcategory?cate_id=${cateId}&pageNum=${pageNum}&pageSize=${pageSize}`
})
import { get } from "@/api/axios.js";


// 全部分类
export const articleCategoryQuery = userId => get(`blog/category/query?user_id=${userId}`);

// 文章列表
export const articleListQuery = (cateId,pageNum,pageSize) => get(`blog/query/withcategory?cate_id=${cateId}&pageNum=${pageNum}&pageSize=${pageSize}`);

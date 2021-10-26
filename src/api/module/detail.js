import { get } from "@/api/axios.js";

export const articleDetailQuery = articleID => get(`blog/detail?id=${articleID}`)
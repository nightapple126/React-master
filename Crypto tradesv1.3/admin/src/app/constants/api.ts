export const API = {
    base_url: "http://localhost:3000",
    user_login: "/user/login",
    user_list: "/user/adminlist",
    user_create: "/user/createuser",
    user_profile: "/user/profile",
    user_update: "/user/updateuser",
    activity_list: "/item/history", // activity list api
    item_list: "/item/list", // item list api
    category_list : "/category/fulllist", // category list api
    category_detail : "/category/detail", // category detail list api
    category_create : "/category/add", // category add api
    category_update : "/category/edit", // category edit api
    category_delete : "/category/delete", // category delete api
    offer_list: "/item/offers",
    option_set: "/settings/setoptions",
    option_get: "/settings/getoptions",
    collection_list:"/collection/fulllist",
    collection_view:"/collection/detail"
}

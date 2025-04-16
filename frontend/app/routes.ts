import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // index("routes/home.tsx"),
    index("routes/auth/login.tsx"),
    route("forgot-password","routes/auth/forgotpassword.tsx"),
    route("verify-otp","routes/auth/verifyotp.tsx"),
    route("reset-password","routes/auth/resetpassword.tsx"),
    route("adminDashboard", "routes/admin/adminDashboard.tsx"),
    route("staffDashboard", "routes/staff/staffDashboard.tsx"),
    route("salesDashboard", "routes/sales/salesDashboard.tsx"),
    route("home", "routes/home.tsx"),
    route("page-not-found", "routes/notfound.tsx"),
] satisfies RouteConfig;

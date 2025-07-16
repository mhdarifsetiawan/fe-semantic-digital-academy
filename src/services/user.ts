import API_ROUTES from "@/constants/apiRoutes";
import api from "@/lib/api";

/**
 * Service untuk data pengguna
 */

// Fungsi untuk mengambil data pengguna yang sedang login
export const getMe = async () => {
    const res = await api.get(API_ROUTES.ME);
    return res.data;
};
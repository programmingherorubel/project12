
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log("isAdmin response", res);
      return res.data.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;

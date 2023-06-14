import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useInstructors = () => {
  const {user}= useContext(AuthContext)
  
  const [axiosSecure] = useAxiosSecure();
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["instractor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
      console.log("isInstructor response", res);
      return res.data.instractor;
    },
  });
  return [isInstructor, isInstructorLoading];
};
export default useInstructors;

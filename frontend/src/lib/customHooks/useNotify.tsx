import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { lsToken } from "@/common/constant/variables";

const useNotify = () => {
  const router = useRouter();

  const verifyStatus = (
    response: any,
    notification?: boolean,
    successRedirectPath?: string
  ) => {
    if (response?.type?.includes("fulfilled")) {
      const { data: firstData } = response.payload;
      const { message } = firstData.data;
      if (successRedirectPath) {
        router.push(successRedirectPath);
      }
      if (message && notification) {
        toast.success(message);
      }
      return;
    }

    if (response.type.includes("rejected")) {
      const { message, status } = response.payload.data;

      if (status === 401) {
        toast.error(message);
        router.push("/auth/signin");
        localStorage.removeItem(lsToken);
        return;
      }

      if (message) {
        toast.error(message);
        return;
      }
    }
  };

  return { verifyStatus };
};

export default useNotify;

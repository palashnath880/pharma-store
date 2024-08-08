import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface UseSearchQuery {
  set: (args: object | any) => void;
  get: (name: string) => string | null;
}

function useSearchQuery(): UseSearchQuery {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state: UseSearchQuery = {
    get: (name) => {
      const value = searchParams.get(name);
      return value;
    },
    set: (args) => {
      const params = new URLSearchParams(searchParams.toString());
      const keys = Object.keys(args);
      for (const key of keys) {
        params.set(key, args[key]);
      }

      router.push(`${pathname}?${params.toString()}`);
    },
  };
  return state;
}

export default useSearchQuery;

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useUser() {
  const { data, error } = useSWR(`/api/user/`, fetcher);

  return {
    user: data,
    userError: error,
  };
}

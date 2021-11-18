import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then(async (res) => {
    console.log({ res });
    if (!res.ok) {
      const error = new Error("An error occured");
      error.status = res.status;

      throw error;
    }
    return await res.json();
  });

export default function useUser() {
  const { data, error } = useSWR(`/api/user/`, fetcher, {
    // onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    //   if (error.status >= 400 && error.status < 500) return;
    //   if (retryCount >= 5) return;
    //   setTimeout(() => revalidate({ retryCount }), 5000);
    // },
  });

  return {
    user: data,
    userError: error,
  };
}

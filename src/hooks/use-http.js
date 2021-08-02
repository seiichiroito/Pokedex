import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({ url, method = "get", body, headers = {} }) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const data = await response.json();

        setIsLoading(true);
        return data;
      } catch (err) {
        setIsLoading(true);
        console.log(err);
        setError(err.message || "There is something wrong. Try it later.");
      }
    },
    []
  );

  return { isLoading, error, sendRequest };
};

export default useHttp;

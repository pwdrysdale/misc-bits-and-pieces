import axios from "axios";
import { useEffect, useState, useCallback } from "react";

interface useGetDataOptions {
    onCompleted?: (data: unknown) => void;
    onError?: (error: any) => void;
}

const useGetData = (
    url: string,
    opts?: useGetDataOptions
): {
    loading: boolean;
    error: string;
    data: unknown;
} => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const getData = useCallback(
        async (url: string) => {
            try {
                if (data === null) {
                    setError("");
                    setLoading(true);
                    const { data } = await axios.get(url);
                    if (opts?.onCompleted) {
                        opts.onCompleted(data);
                    }
                    setData(data);
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
                if (opts?.onError) {
                    opts.onError(err);
                }
            }
        },
        [setLoading, setError, setData, data, opts]
    );

    useEffect(() => {
        getData(url);
    }, [getData, url]);

    return { loading, error, data };
};

export default useGetData;

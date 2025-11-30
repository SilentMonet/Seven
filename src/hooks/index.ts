import React from "react";
import * as ReactRouter from "react-router";

export function useSearchParams() {
    const [searchParams, setSearchParams] = ReactRouter.useSearchParams();
    const setSearchParam = React.useCallback((searchParamsInit: ReactRouter.URLSearchParamsInit, options?: ReactRouter.NavigateOptions) => {
        const newSearchParams = ReactRouter.createSearchParams(searchParamsInit);
        // merge newSearchParams into searchParams
        for (const [key, value] of newSearchParams.entries()) {
            if (value === null) {
                searchParams.delete(key);
            } else {
                searchParams.set(key, value);
            }
        }
        setSearchParams(searchParams, options);
    }, [searchParams, setSearchParams]);
    return [searchParams, setSearchParam] as const;
}

export function useSearchParam<T extends string | undefined>(key: string, defaultValue?: T) {
    const [searchParams, setSearchParams] = useSearchParams();
    return [
        searchParams.get(key) ?? defaultValue as T,
        (value?: string | null, options?: ReactRouter.NavigateOptions) => {
            if (value === undefined || value === null) {
                searchParams.delete(key);
            } else {
                searchParams.set(key, value);
            }
            setSearchParams(searchParams, options);
        }
    ] as const;
}
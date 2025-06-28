import { QueryClient } from "@tanstack/react-query";
import { get, set, del } from 'idb-keyval'
import type {
    PersistedClient,
    Persister,
} from '@tanstack/react-query-persist-client';

export function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery') {
    return {
        persistClient: async (client: PersistedClient) => {
            await set(idbValidKey, client)
        },
        restoreClient: async () => {
            return await get<PersistedClient>(idbValidKey)
        },
        removeClient: async () => {
            await del(idbValidKey)
        },
    } as Persister
}

export const persister = createIDBPersister();
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            gcTime: Infinity
        },
    }
});
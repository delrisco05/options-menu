import { DataInterface } from "./data.interface";

export interface DataStoreInterface {
    id?: number,
    name: string,
    description?: string | null,
    level: number,
    url?: string | null,
    items?: DataInterface[]
}
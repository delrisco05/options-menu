import { ProfileInterface } from "./profiles.interface";

export interface DataInterface {
    id?: number;
    name: string;
    description: string | null | undefined;
    url: string | null | undefined;
    level: number;
    orderItem: number;
    collapsible: boolean;
    status: string;
    idParent: number | null | undefined;
    profiles: ProfileInterface[];
    items: DataInterface[];
  }
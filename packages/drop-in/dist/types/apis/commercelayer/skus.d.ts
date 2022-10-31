import type { Sku as SdkSku } from '@commercelayer/sdk';
interface DeliveryLeadTime {
  shipping_method: {
    name: string;
    reference: string;
    price_amount_cents: number;
    free_over_amount_cents: number | null;
    formatted_price_amount: string;
    formatted_free_over_amount: string | null;
  };
  min: {
    hours: number;
    days: number;
  };
  max: {
    hours: number;
    days: number;
  };
}
interface Level {
  quantity: number;
  delivery_lead_times: DeliveryLeadTime[];
}
interface Inventory {
  available: boolean;
  quantity: number;
  levels: Level[];
}
export declare type Sku = SdkSku & {
  inventory?: Inventory;
};
export declare const getSkuId: (sku: string) => Promise<string | undefined>;
export declare const getSku: (sku: string) => Promise<Sku | undefined>;
export {};

export interface CommerceLayerConfig {
  clientId: string;
  slug: string;
  scope: string;
  debug?: 'none' | 'all';
}
export declare type Config = CommerceLayerConfig & {
  debug: Exclude<CommerceLayerConfig['debug'], undefined>;
  endpoint: string;
};
export declare function getConfig(): Config;

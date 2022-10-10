import { ClientCredentials } from '@commercelayer/js-auth';
import { CommerceLayerClient } from '@commercelayer/sdk';
export declare const getAccessToken: (clientCredentials: ClientCredentials) => Promise<string>;
export declare function createClient(clientCredentials: ClientCredentials): Promise<CommerceLayerClient>;

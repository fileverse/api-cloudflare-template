declare module "@fileverse/api/hono" {
  import type { Hono } from "hono";

  interface AppEnv {
    Bindings: {
      API_KEY: string;
      HYPERDRIVE: { connectionString: string };
      DATABASE_URL?: string;
      RPC_URL?: string;
    };
  }

  export function createApp(): Hono<AppEnv>;
  export type { AppEnv };
}

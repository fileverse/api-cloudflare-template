import { Container, getContainer } from "@cloudflare/containers";

export class FileverseContainer extends Container<Env> {
  defaultPort = 8001;
  sleepAfter = "1h";
  enableInternet = true;

  override get envVars(): Record<string, string> {
    return {
      API_KEY: this.env.API_KEY,
      DATABASE_URL: this.env.DATABASE_URL,
      PORT: "8001",
      NODE_ENV: "production",
      INLINE_WORKER: "true",
      WORKER_CONCURRENCY: this.env.WORKER_CONCURRENCY ?? "5",
      ...(this.env.RPC_URL ? { RPC_URL: this.env.RPC_URL } : {}),
    };
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const id = env.FILEVERSE.idFromName("fileverse-api");
    const container = env.FILEVERSE.get(id);
    return container.fetch(request);
  },
};

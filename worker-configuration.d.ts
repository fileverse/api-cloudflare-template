interface Env {
  FILEVERSE: DurableObjectNamespace;
  API_KEY: string;
  DATABASE_URL: string;
  RPC_URL?: string;
  WORKER_CONCURRENCY?: string;
}

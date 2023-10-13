declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string | undefined;
      JWT_SECRET: string | undefined;
      NODE_ENV: string | undefined;
      GITHUB_CLIENT_ID: string | undefined;
      GITHUB_CLIENT_SECRET: string | undefined;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };

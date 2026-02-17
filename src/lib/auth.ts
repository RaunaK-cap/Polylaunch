import Database from "better-sqlite3";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

const sqlitePath = process.env.BETTER_AUTH_SQLITE_PATH ?? "better-auth.sqlite";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const secret =
  process.env.BETTER_AUTH_SECRET ?? "dev-secret-change-me-please-change-me-32";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  database: new Database(sqlitePath),
  secret,
  baseURL,
  ...(googleClientId && googleClientSecret
    ? {
        socialProviders: {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        },
      }
    : {}),
  plugins: [nextCookies()],
});

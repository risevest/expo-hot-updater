/* eslint-disable import/no-default-export */
import "dotenv/config";

import { d1Database, r2Storage } from "@hot-updater/cloudflare";
import { expo } from "@hot-updater/expo";
import { withSentry } from "@hot-updater/sentry-plugin";
import { defineConfig } from "hot-updater";

export default defineConfig({
  build: withSentry(
    expo({
      sourcemap: true,
    }),
    {
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "expo-hot-updater",
      project: "expo-hot-updater",
    },
  ),
  database: d1Database({
    accountId: process.env.HOT_UPDATER_CLOUDFLARE_ACCOUNT_ID,
    cloudflareApiToken: process.env.HOT_UPDATER_CLOUDFLARE_API_TOKEN,
    databaseId: process.env.HOT_UPDATER_CLOUDFLARE_D1_DATABASE_ID,
  }),
  storage: r2Storage({
    accountId: process.env.HOT_UPDATER_CLOUDFLARE_ACCOUNT_ID,
    bucketName: process.env.HOT_UPDATER_CLOUDFLARE_R2_BUCKET_NAME,
    cloudflareApiToken: process.env.HOT_UPDATER_CLOUDFLARE_API_TOKEN,
  }),
  updateStrategy: "appVersion",
});

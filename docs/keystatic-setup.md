# Keystatic CMS Setup Guide

Keystatic has been installed and configured for this project. To enable the CMS in production (Cloudflare Pages), you need to set up a GitHub App and configure environment variables.

## 1. Create a GitHub App

1.  Go to your [GitHub Developer Settings](https://github.com/settings/apps).
2.  Click **New GitHub App**.
3.  **GitHub App Name**: `frydaychef-cms` (or similar).
4.  **Homepage URL**: `https://frydaychef.net` (Your production URL).
5.  **Callback URL**: `https://frydaychef.net/api/keystatic/github/oauth/callback`.
    *   *Note:* Ensure "Expire user authorization tokens" is unchecked (optional but recommended for simplicity).
6.  **Webhook**: Uncheck "Active" (not needed).
7.  **Repository permissions**:
    *   **Content**: `Read and write`
    *   **Metadata**: `Read-only`
8.  Click **Create GitHub App**.

## 2. Configure Environment Variables

Once created, gather the following credentials from the GitHub App page:

*   **Client ID**
*   **Client Secret** (Generate a new client secret)

You also need a random secret for session encryption. You can generate one with `openssl rand -hex 32` or any password generator.

Go to your **Cloudflare Pages** dashboard > **Settings** > **Environment variables** and add the following:

| Variable Name | Value |
| :--- | :--- |
| `KEYSTATIC_GITHUB_CLIENT_ID` | *Your Client ID* |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | *Your Client Secret* |
| `KEYSTATIC_SECRET` | *Your generated random secret* |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | *The slug of your GitHub App (e.g., frydaychef-cms)* |

## 3. Install the App

On your GitHub App settings page, go to **Install App** and install it on the `johnmschoonover/frydaychef` repository.

## 4. Deploy

Trigger a new deployment on Cloudflare Pages (e.g., by merging the `keystatic-integration` branch).

## 5. Access the CMS

Visit `https://frydaychef.net/keystatic` to log in and manage content.

In development (`npm run dev`), Keystatic runs in **Local Mode** at `http://localhost:4321/keystatic` and saves changes directly to your file system.

## Troubleshooting

### "Authorization Failed" Error

If you see an "Authorization Failed" error when logging in, it is usually due to a **Callback URL mismatch** or **missing environment variables**.

#### 1. Callback URL Mismatch (Preview Deployments)
The GitHub App is configured with a specific Callback URL (e.g., `https://frydaychef.net/api/keystatic/github/oauth/callback`).
*   **Issue:** If you are testing on a **Cloudflare Pages Preview URL** (e.g., `https://keystatic-integration.frydaychef.pages.dev`), the callback URL sent by Keystatic will match the *current* domain, but GitHub will reject it because it doesn't match the *configured* domain.
*   **Solution:**
    *   **Test on Production:** Merge and test on the live `frydaychef.net` domain.
    *   **Temporary Update:** Update the GitHub App's "Callback URL" to match your current Preview URL.
    *   **Dev App:** Create a separate GitHub App for development/previews.

#### 2. Local Preview (`npm run preview`)
Running `npm run preview` builds the site in production mode (`PROD=true`), triggering GitHub storage mode.
*   **Issue:** The app runs on `http://localhost:4321`, but tries to authenticate with the production GitHub App.
*   **Solution:** Use `npm run dev` for local content management (uses Local Mode).

#### 3. Environment Variables
Ensure all 4 environment variables are set in **Cloudflare Pages > Settings > Environment variables**.
*   Check for typos or extra spaces.
*   Ensure they are applied to the correct environment (Preview vs Production).

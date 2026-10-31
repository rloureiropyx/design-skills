// Login hook template. Copy to the consuming project as .ui-capture/hooks/<app>-login.mjs and adapt the selectors.
// Credentials come from the project's .env (gitignored). Never put them in this file or in the plugin.
//
// The CLI calls the default export with:
//   ab(args)  -> runs an agent-browser command in the login session and returns its stdout
//   env       -> variables from the project's .env merged over process.env
// It must leave the session signed in; the CLI then saves the state and continues.
export default async function login({ ab, env }) {
  const { APP_LOGIN_URL, APP_USERNAME, APP_PASSWORD } = env;
  if (!APP_LOGIN_URL || !APP_USERNAME || !APP_PASSWORD) throw new Error("Missing APP_LOGIN_URL / APP_USERNAME / APP_PASSWORD in .env");

  ab(["open", APP_LOGIN_URL]);
  ab(["wait", "--load", "networkidle"]);
  ab(["fill", "#username", APP_USERNAME]);
  ab(["fill", "#password", APP_PASSWORD]);
  ab(["press", "Enter"]);
  ab(["wait", "--load", "networkidle"]);

  // Stop instead of retrying on a rejected password: repeated attempts can lock the account.
  if (/wrong password|incorrect|invalid credentials/i.test(ab(["get", "text", "body"]))) {
    throw new Error("Login rejected. Not retrying, to avoid a lockout.");
  }
}

import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "///USEYOURID///"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};

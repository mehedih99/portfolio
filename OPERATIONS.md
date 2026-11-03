# Daily availability check

The GitHub Actions workflow **Daily portfolio health** runs at 05:17 UTC (09:17 UAE) every day. It also runs when its workflow, script or public configuration changes on `main`, and can be started manually from Actions.

It loads the public website and performs three small read-only queries against the existing `portfolio_content` row. It uses the existing public anon key and existing read permissions. It does not write data, create rows or require a service-role key. Failed checks appear as failed Actions runs; GitHub notification delivery follows the account's Actions notification settings.

This is a best-effort health check, not a guarantee against Supabase Free project pausing. Supabase may pause projects with low database activity, and resuming an already paused project requires the project owner's dashboard access. Supabase's paid plans are not paused for inactivity. GitHub scheduled jobs may be delayed; in a public repository GitHub may disable scheduled workflows after 60 days without repository activity, so check the Actions page periodically and re-enable the workflow if necessary.

The public website times out a database read after five seconds and uses the last successfully loaded content cached on that browser, or built-in content if no cache exists. A failed profile photo falls back to a local image. This keeps the public presentation readable during a backend outage; live admin publishing still requires the backend to be available.

Typography uses Manrope for headings and Inter for body copy with system fallbacks. Europe-focused presentation copy is based on existing career facts. The public presentation refreshes known legacy profile text without overwriting custom CMS changes or claiming European work authorization, local certifications or additional spoken language skills.

References: https://supabase.com/docs/guides/platform/free-project-pausing and https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule

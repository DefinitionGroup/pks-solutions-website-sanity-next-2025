# Google Analytics

The public locale layout loads `ConsentGoogleAnalytics` with GA4 measurement ID
`G-FSP3TS86H8`. The Sanity Studio layout does not include it. No new environment
variables or dependencies are required.

The component waits for Cookiebot statistics consent before requesting Google's
script. Missing Cookiebot, no decision, and rejection all leave GA unloaded.
After loading, withdrawal sets Google's per-property disable flag synchronously
and updates analytics consent to denied. Accepting again resumes collection
without inserting another script or initializing the property again.

Advertising signals and advertising personalization are disabled. Cookiebot
continues to own the consent banner and consent preferences.

## GA4 property setup

In Admin → Data streams → the web stream → Enhanced measurement → Page views,
enable **Page changes based on browser history events**. The Google tag sends
the initial pageview and tracks subsequent Next.js history changes. Do not add
a second router-based pageview sender or another installation of this tag in GTM.

## Verification

1. In a fresh browser, confirm no `gtag/js` or GA collection requests before consent.
2. Reject statistics: confirm GA remains unloaded, including after navigation.
3. Accept statistics: confirm one script and one initial pageview.
4. Follow internal links and use Back/Forward: confirm one pageview per navigation
   in Tag Assistant or GA4 DebugView with history measurement enabled.
5. Withdraw statistics consent: confirm `window['ga-disable-G-FSP3TS86H8']` is
   `true` and subsequent navigation sends no GA collection requests.
6. Accept again: confirm the disable flag is `false`, the current page is measured
   once, and there is still only one script and one property initialization.
7. Reload with saved acceptance and saved rejection to check returning visitors.

Use intercepted collection endpoints for local automated QA so test visits do
not enter the production property. A live property check is still required after
deployment; local queue checks do not prove GA4 ingestion or property settings.

Local browser validation on 2026-09-07 confirmed that a fresh page had no GA
script or property configuration. With simulated Cookiebot events and Google
requests blocked, rejection kept GA unloaded; acceptance inserted one script
and queued one configuration; repeated events did not duplicate initialization;
withdrawal immediately disabled collection and stayed disabled across a history
change; reacceptance queued exactly one current-page event without reinitializing.

References: [Next.js analytics integration](https://nextjs.org/docs/app/guides/third-party-libraries),
[Cookiebot events](https://www.cookiebot.com/en/developer/),
[Google disable flag](https://developers.google.com/tag-platform/security/guides/privacy).

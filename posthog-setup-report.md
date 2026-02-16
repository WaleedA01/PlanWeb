# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your Next.js insurance quote application. The integration includes:

- **Client-side initialization** via `instrumentation-client.ts` (recommended for Next.js 15.3+)
- **Server-side tracking** with `posthog-node` for API route events
- **Reverse proxy** configuration to improve tracking reliability and avoid ad blockers
- **Automatic exception capture** enabled for error tracking
- **Session replay** ready to go with autocapture enabled
- **Form funnel tracking** across all insurance quote forms (Auto, Home, Business)

## Events Implemented

| Event Name | Description | File |
|------------|-------------|------|
| `auto_form_started` | User started the auto insurance quote form | `src/components/forms/auto/AutoForm.tsx` |
| `auto_form_step_completed` | User completed a step in the auto insurance form | `src/components/forms/auto/AutoForm.tsx` |
| `auto_form_submitted` | User successfully submitted the auto insurance form | `src/components/forms/auto/AutoForm.tsx` |
| `home_form_started` | User started the home insurance quote form | `src/components/forms/home/HomeForm.tsx` |
| `home_form_step_completed` | User completed a step in the home insurance form | `src/components/forms/home/HomeForm.tsx` |
| `home_form_submitted` | User successfully submitted the home insurance form | `src/components/forms/home/HomeForm.tsx` |
| `business_form_started` | User started the business insurance quote form | `src/components/forms/business/BusinessForm.tsx` |
| `business_form_step_completed` | User completed a step in the business insurance form | `src/components/forms/business/BusinessForm.tsx` |
| `business_form_submitted` | User successfully submitted the business insurance form | `src/components/forms/business/BusinessForm.tsx` |
| `contact_form_submitted` | User submitted the contact form | `src/components/sections/contact/ContactFormSection.tsx` |
| `how_it_works_dialog_opened` | User opened the How It Works dialog | `src/components/dialogs/HowItWorksDialog.tsx` |
| `lead_submitted` | Lead successfully submitted to backend API (server-side) | `src/app/api/submit/route.ts` |
| `lead_submission_error` | Error occurred during lead submission (server-side) | `src/app/api/submit/route.ts` |

## Files Created/Modified

### New Files
- `instrumentation-client.ts` - Client-side PostHog initialization
- `src/lib/posthog-server.ts` - Server-side PostHog client
- `.posthog-events.json` - Event tracking plan (removed after setup)
- `posthog-setup-report.md` - This report

### Modified Files
- `next.config.ts` - Added PostHog reverse proxy rewrites
- `.env.local` - Added PostHog environment variables
- `src/components/forms/auto/AutoForm.tsx` - Added form tracking events
- `src/components/forms/home/HomeForm.tsx` - Added form tracking events
- `src/components/forms/business/BusinessForm.tsx` - Added form tracking events
- `src/components/sections/contact/ContactFormSection.tsx` - Added contact form event
- `src/components/dialogs/HowItWorksDialog.tsx` - Added dialog open event
- `src/app/api/submit/route.ts` - Added server-side lead events

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/315127/dashboard/1282619) - Your main analytics dashboard

### Insights
- [Form Starts Over Time](https://us.posthog.com/project/315127/insights/xKeVVez3) - Track how many users start each form type
- [Business Form Conversion Funnel](https://us.posthog.com/project/315127/insights/7YQqfSN7) - Business form start-to-submit conversion
- [Auto Form Conversion Funnel](https://us.posthog.com/project/315127/insights/HIifUz7l) - Auto form start-to-submit conversion
- [Total Lead Submissions](https://us.posthog.com/project/315127/insights/5C0anv73) - Server-side lead submission count
- [Form Submissions by Type](https://us.posthog.com/project/315127/insights/Ao7MQpqY) - Compare submissions across form types

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

## Environment Variables

Make sure these are set in your production environment:

```
NEXT_PUBLIC_POSTHOG_KEY=<your-posthog-project-api-key>
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

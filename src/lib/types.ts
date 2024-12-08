export type ActionResponse =
  | { error: string; success?: undefined }
  | { success: string; error?: undefined }

//https://github.com/vercel/next.js/blob/canary/packages/next/src/client/components/redirect-status-code.ts
export enum RedirectStatusCode {
  SeeOther = 303,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
}

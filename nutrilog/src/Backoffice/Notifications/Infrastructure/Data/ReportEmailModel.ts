export interface ReportEmailModel {
  summary: {
    totalDefaulters: number,
    lastReportDate: string,
    reportDate: string,
    totalWarningEmailsSent: number,
    totalEmailsRead: number,
  },
  defaulters: { name: string, email: string }[],
  oldDefaulters: { name: string, email: string }[],
  subject: string,
}
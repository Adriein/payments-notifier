export interface EventTrackingStatModel {
  date: string;
  stats: {
    metrics: { requests: number; processed: number; unique_opens: number };
  }[];
}
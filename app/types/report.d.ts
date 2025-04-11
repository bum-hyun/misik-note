interface IPostReportPayload {
  user_id?: string;
  content: string;
}

interface IReport {
  id: number;
  content: string;
  user_id: string;
  created_at: string;
}

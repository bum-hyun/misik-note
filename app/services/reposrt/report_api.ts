import { DATABASE_NAMES } from '~/constants/database';
import { getSupabaseBrowserClient } from '~/utils/supabase/client';

const database = DATABASE_NAMES.REPORT;

export const getReports = async (): Promise<IReport[]> => {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase.from(database).select('*');

  if (error) {
    throw new Error(`GET Error: ${error.message}`);
  }
  return data;
};

export const postReport = async (payload: IPostReportPayload) => {
  const supabase = getSupabaseBrowserClient();

  const { error } = await supabase.from(database).insert(payload);
  if (error) throw error;
};

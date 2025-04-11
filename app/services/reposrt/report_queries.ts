import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { SERVICE_KEY } from '~/constants/service';
import { getReports, postReport } from '~/services/reposrt/report_api';

export const useGetReports = () =>
  useQuery<IReport[]>({
    queryKey: [SERVICE_KEY.REPORT.GET_REPORTS],
    queryFn: getReports,
  });

export const usePostReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [SERVICE_KEY.REPORT.POST_REPORT],
    mutationFn: (payload: IPostReportPayload) => postReport(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SERVICE_KEY.REPORT.GET_REPORTS] });
    },
  });
};

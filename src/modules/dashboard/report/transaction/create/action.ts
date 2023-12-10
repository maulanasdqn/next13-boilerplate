import { TVSReportTransaction } from "@/entities";
import { serverTrpc } from "@/libs";

export const CreateReportTransactionAction = async (props: TVSReportTransaction) => {
  await serverTrpc.createReportTransaction(props);
};

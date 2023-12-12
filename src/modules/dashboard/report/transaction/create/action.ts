"use server";
import { TVSReportTransaction } from "@/entities";
import { serverTrpc } from "@/libs";

export const CreateReportTransactionAction = async (props: TVSReportTransaction) => {
  try {
    await serverTrpc.createReportTransaction(props);
  } catch (err) {
    return err;
  }
};

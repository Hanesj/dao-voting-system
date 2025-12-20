import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Poll } from "../models/Poll";
import { useWallet } from "../hooks/useWallet";
import { parseEventLogs } from "viem";
import { factoryAbi, address } from "../utilities/abi";
import { pubClient } from "../services/clients";
import { getFullPoll } from "../services/api";

export interface PollsContextValue {
  polls: Poll[];
  masterPolls: Poll[];
  addPoll: (title: string) => Promise<void>;
  setPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
  setMasterPolls: React.Dispatch<React.SetStateAction<Poll[]>>;
  getPolls: () => Promise<void>;
}

const PollsContext = createContext<PollsContextValue | undefined>(undefined);
export const PollsProvider = ({ children }: { children: React.ReactNode }) => {
  const { connectWallet, wallet } = useWallet();
  const [polls, setPolls] = useState<Poll[]>([
    {
      title: "Example Poll 1",
      owner: "0xTTT",
      state: "Not started",
      options: [{ option: "Do this", suggester: "0xCCC", voteCount: 0 }],
      address: "0x0",
    },
  ]);
  const [masterPolls, setMasterPolls] = useState<Poll[]>(polls);
  const [loading, isLoading] = useState<boolean>(true);

  const getPolls = useCallback(async () => {
    const pollsOnChain: Poll[] = [];
    if (pubClient) {
      try {
        const numPolls = await pubClient.readContract({
          abi: factoryAbi,
          address,
          functionName: "getNumOfPolls",
        });

        for (let i = 0; i < Number(numPolls); i++) {
          const a = await pubClient.readContract({
            abi: factoryAbi,
            address,
            functionName: "getPollAddress",
            args: [i],
          });
          if (a) {
            const pollFromChain = await getFullPoll(a, pubClient);
            if (pollFromChain) {
              pollsOnChain.push(pollFromChain);
            }
          }
        }
        //console.log(`Address of pollcontract: ${a}`);
        if (pollsOnChain.length > 0) {
          setPolls([...pollsOnChain]);
          setMasterPolls([...pollsOnChain]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [pubClient]);

  useEffect(() => {
    getPolls();
    // console.log(pollsOnChain);
  }, [getPolls]);

  const addPoll = useCallback(
    async (title: string) => {
      if (wallet && pubClient) {
        try {
          const { request } = await pubClient.simulateContract({
            abi: factoryAbi,
            address,
            functionName: "createPoll",
            args: [title],
            account: wallet.account,
          });

          const txHash = await wallet.writeContract(request);
          const receipt = await pubClient.waitForTransactionReceipt({
            hash: txHash,
          });

          console.log("Receipt: ", receipt);

          const logs = parseEventLogs({
            abi: factoryAbi,

            logs: receipt.logs,
          });
          const pollCreated: any = logs.find(
            (p: any) => p.eventName === "pollCreated"
          );
          console.log(pollCreated.args);
          if (pollCreated) {
            setPolls((polls) => [
              ...polls,
              {
                title,
                state: "Voting has not begun.",
                options: [],
                owner: pollCreated.args.createdBy as string,
                address: pollCreated.args.pollAddress,
              },
            ]);
            setMasterPolls((polls) => [
              ...polls,
              {
                title,
                state: "Voting has not begun.",
                options: [],
                owner: pollCreated.args.createdBy as string,
                address: pollCreated.args.pollAddress,
              },
            ]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [wallet, pubClient]
  );
  const values = {
    polls,
    addPoll,
    setPolls,
    masterPolls,
    setMasterPolls,
    getPolls,
  };

  return (
    <PollsContext.Provider value={values}>{children}</PollsContext.Provider>
  );
};

// Nasta steg, fa in allt i contextet.

export const usePollsContext = () => {
  const context = useContext(PollsContext);
  if (context === undefined) {
    throw new Error("usePollsContext maste anvandas inom PollsProvider");
  }

  return context;
};

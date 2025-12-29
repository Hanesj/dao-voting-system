import "./PollCard.css";
import type { Poll } from "../../models/Poll";
import { usePoll } from "../../hooks/usePoll";

import Options from "../Options/Options";

type Props = {
  poll: Poll;
};

export default function PollCard({ poll }: Props) {
  const { closeVoting, openVoting } = usePoll();

  return (
    <div className="card">
      <h3>
        Poll: {poll.title}
        <span> State: {poll.state}</span>
      </h3>
      <h4>Created by: {poll.owner}</h4>
      <h5>Address: {poll.address}</h5>
      {poll.state !== "Voting has ended." &&
        (poll.state === "Voting has not begun." ? (
          <button
            className="open-vote-btn"
            onClick={() => openVoting(poll.address)}
          >
            Open voting
          </button>
        ) : (
          <button
            className="open-vote-btn"
            onClick={() => closeVoting(poll.address)}
          >
            Close voting
          </button>
        ))}

      <div className="addOption">
        <p className="no-options">Options:</p>
        <Options poll={poll} />
      </div>
    </div>
  );
}

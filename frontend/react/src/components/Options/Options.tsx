import { FiArrowUp } from "react-icons/fi";
import type { Poll } from "../../models/Poll";
import { usePoll } from "../../hooks/usePoll";
import { useEffect, useState, type MouseEvent } from "react";

type Props = {
  poll: Poll;
};

function useWindowSize() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

const Options = ({ poll }: Props) => {
  const [title, setTitle] = useState<string>("");
  const { addVote, addOptionToPoll } = usePoll();

  const isMobile = useWindowSize();

  const handleVote = async (
    e: MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    //console.log(poll.options[index]);
    await addVote(poll.address, poll.options[index].option);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    //console.log(title, ' ', poll.address);
    console.log("address to poll:", poll.address);
    await addOptionToPoll(poll.address, title);
    setTitle("");
  };
  return (
    <>
      {poll.state === "Voting has not begun." && (
        <form onSubmit={handleSubmit}>
          <input
            id="pollTitle"
            name="pollTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Option title"
          />
          <button type="submit">Add</button>
        </form>
      )}
      <div>
        {poll.options.length === 0 && <p>No options yet.</p>}
        {poll.options.map((opt, i) => (
          <div key={i} className="option">
            <span className="option-title">Title: {opt.option}</span>
            <span className="option-suggester">
              {!isMobile
                ? `Suggester: ${opt.suggester.substring(0, 10)}...`
                : `Suggester: ${opt.suggester.substring(0, 7)}...`}
            </span>
            <span className="option-votes">Vote count: {opt.voteCount}</span>
            <button className="vote-btn" onClick={(e) => handleVote(e, i)}>
              <FiArrowUp />
            </button>
            {/* <span className='breaker'></span> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Options;

import "./App.css";
// mport Navbar from './components/navbar/Navbar';
import { usePollsContext } from "./context/PollsContext";
import { useEffect, useState } from "react";
import MainComponent from "./components/MainComponent/MainComponent";
import Pagination from "./components/Pagination/Pagination";
import Toast from "./components/PopupModal/Toast";
import { useSignalRContext } from "./context/SignalRContext";
import { useWallet } from "./hooks/useWallet";
function App() {
  const { polls, addPoll, masterPolls } = usePollsContext();
  const {
    state: { isModalOpen },
    actions: { showModal },
    modalMessage,
  } = useSignalRContext();
  const { disconnectWallet } = useWallet();
  const [pageNo, setPageNo] = useState<number>(0);
  const itemsPerPage = 2;
  //const { addOptionToPoll, addVote, openVoting } = usePoll();

  const totalNumberOfPages = Math.ceil(masterPolls.length / itemsPerPage);

  const hasNextPage = pageNo < totalNumberOfPages - 1;
  const startIndex = pageNo * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pollsPerPage = polls.slice(startIndex, endIndex);

  const handleClick = (dir: number) => {
    console.log(pollsPerPage);
    if (dir === -1) setPageNo((prev) => prev - 1);
    if (dir === 1 && hasNextPage) setPageNo((prev) => prev + 1);
    // console.log('Klick?');
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        showModal();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <>
      {/* <Navbar /> */}
      <div>
        <div className="flex justify-between">
          <h1>DAO4Dev</h1>
          <button
            onClick={disconnectWallet}
            className="max-h-10 self-center mr-45"
          >
            Disconnect wallet
          </button>
        </div>

        <Toast
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={showModal}
        />
      </div>
      <MainComponent
        addPoll={addPoll}
        pollsPerPage={pollsPerPage}
        setPageNo={setPageNo}
      />

      <Pagination
        handleClick={handleClick}
        hasNextPage={hasNextPage}
        pageNo={pageNo}
      />
    </>
  );
}

export default App;

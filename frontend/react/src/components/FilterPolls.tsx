import { useState, type SetStateAction } from "react";
import { usePollsContext } from "../context/PollsContext";

type Props = {
  setPageNo: React.Dispatch<SetStateAction<number>>;
};

const FilterPolls = ({ setPageNo }: Props) => {
  const { masterPolls, polls, setPolls } = usePollsContext();
  const [filter, setFilter] = useState("");

  const handleFilter = (filterClicked: string) => {
    if (filterClicked === "" || filter.includes(filterClicked)) {
      setFilter("");
      setPolls(masterPolls);
      return;
    }
    setPolls(
      masterPolls.filter((p) => p.state.includes(filterClicked.toLowerCase()))
    );
    setFilter(filterClicked);
    setPageNo(0);
  };
  return (
    <div className="flex flex-col gap-0 p-3 w-64 max-h-188 bg-white shadow-xl rounded-lg">
      {/* --- 1. Navigeringsfilter (Filtrera efter Status) --- */}
      <ul className="flex flex-col gap-2">
        <h4 className="font-bolder text-gray-700 mb-1 px-1">Filter</h4>

        {/* 'Ongoing' Knapp (Aktiv/Huvudfokus) */}
        <li
          className={`
                flex items-center justify-center 
                w-full h-10 
                ${
                  filter.includes("Ongoing") ? "bg-blue-300" : "bg-gray-200"
                } text-white rounded-lg 
                cursor-pointer hover:bg-blue-500 transition duration-150
                font-medium
            `}
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            handleFilter(e.currentTarget.textContent || "")
          }
        >
          Ongoing
        </li>

        {/* 'Not Started' Knapp (Sekundär/Väntar) */}
        <li
          className={`
                flex items-center justify-center 
                w-full h-10 
                ${filter.includes("begun") ? "bg-blue-300" : "bg-gray-200"}
                text-gray-800 rounded-lg 
                cursor-pointer hover:bg-blue-500 transition duration-150
                font-medium
            `}
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            handleFilter(e.currentTarget.textContent || "")
          }
        >
          Not begun
        </li>

        {/* 'Ended' Knapp (Avslutad/Neutral) */}
        <li
          className={`
                flex items-center justify-center 
                w-full h-10 
                 ${filter.includes("Ended") ? "bg-blue-300" : "bg-gray-200"} 
                text-gray-800 rounded-lg 
                cursor-pointer hover:bg-blue-500 transition duration-150
                font-medium
            `}
          onClick={(e: React.MouseEvent<HTMLLIElement>) =>
            handleFilter(e.currentTarget.textContent || "")
          }
        >
          Ended
        </li>
        <li
          className={`
                flex items-center justify-center 
                w-full h-10 
                 bg-gray-200
                text-gray-800 rounded-lg 
                cursor-pointer hover:bg-red-500 transition duration-150
                font-medium
            `}
          onClick={() => handleFilter("")}
        >
          Remove filter
        </li>
      </ul>
      <hr className="my-4 border-gray-200" /> {/* Linje för separation */}
      {/* --- 2. Scrollbar Lista med Omröstningar (masterPolls) --- */}
      {/* Tog bort ml-5 och max-w-60 och lade till en fast höjd (h-128 är ca 512px) */}
      <div className="w-full max-h-128 rounded-lg overflow-y-scroll hide-scrollbar">
        <h4 className="font-bold text-gray-700 mb-2 px-1">All polls:</h4>

        <ul className="space-y-3 p-1">
          {polls.map((p, index) => (
            <li
              key={`${p.address}-${index}`}
              className="
                        flex flex-col p-3 
                        bg-gray-50 border border-gray-200 
                        rounded-lg shadow-sm 
                        hover:shadow-md hover:border-blue-400 
                        cursor-pointer transition duration-150
                    "
            >
              {/* Titel */}
              <span className="font-semibold text-gray-800 text-sm leading-snug truncate">
                {p.title}
              </span>

              {/* Status/State */}
              <span
                className={`
                            mt-1 px-2 py-0.5 text-xs font-medium 
                            rounded-full inline-block w-fit
                            ${
                              p.state === "Open"
                                ? "bg-green-100 text-green-800" // Öppen: Grön
                                : "bg-red-100 text-red-800" // Annat: Röd
                            }
                        `}
              >
                {p.state}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterPolls;

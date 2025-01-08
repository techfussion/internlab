import { icons } from "@/global/imageUtil";

export const SectionHeader: React.FC<{
    title: string;
    highlightedWord: string;
    showAll?: boolean;
  }> = ({ title, highlightedWord, showAll = true }) => (
    <div className="flex justify-between items-center">
      <h2 className="text-4xl text-midnight_blue-500 font-bold">
        {title}{" "}
        <span className="text-blue-500">{highlightedWord}</span>
      </h2>
      {showAll && (
        <div className="flex gap-2">
          <p className="text-xs text-purple-500 cursor-pointer">Show all</p>
          <img src={icons.arrowRightBlue} alt="arrow" className="w-2" />
        </div>
      )}
    </div>
  );
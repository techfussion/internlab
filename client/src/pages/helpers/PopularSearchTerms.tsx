import React from "react";
import { Link } from "react-router-dom";
import { POPULAR_SEARCH_TERMS } from "@/global/constants";

export const PopularSearchTerms: React.FC = () => (
    <p className="text-xs text-textBlack1 mt-4 opacity-70">
      Popular: {' '}
      {POPULAR_SEARCH_TERMS.map((term: any, index: any) => (
        <React.Fragment key={term}>
          {index > 0 && ', '}
          <Link to="#" className="text-blue-500 hover:text-blue-300">
            {term}
          </Link>
        </React.Fragment>
      ))}
    </p>
  );
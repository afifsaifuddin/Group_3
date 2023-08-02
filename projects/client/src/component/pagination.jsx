import { Button, Flex } from "@chakra-ui/react";
import React from "react";

export const Pagination = ({ page, index, setIndex }) => {
  const handlePreviousPage = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
  };

  const handleNextPage = () => {
    if (index < page) {
      setIndex(index + 1);
    }
  };

  const handlePageChange = (pageIndex) => {
    setIndex(pageIndex);
  };

  const renderPageButtons = () => {
    const totalPages = page;
    const startPage = Math.max(1, index - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    const pageButtons = [];
    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
      pageButtons.push(
        <Button
          key={pageNum}
          variant="solid"
          onClick={() => handlePageChange(pageNum)}
          isActive={index === pageNum}
          disabled={index === pageNum}
          bgColor={"#FC2947"}
        >
          {pageNum}
        </Button>
      );
    }

    return pageButtons;
  };

  const pageButtons = renderPageButtons();
  return (
    <Flex justifyContent="center" marginTop="20px">
      <Button onClick={handlePreviousPage} bgColor="#FC2947">
        Previous
      </Button>
      {pageButtons}
      <Button onClick={handleNextPage} bgColor="#FC2947">
        Next
      </Button>
    </Flex>
  );
};

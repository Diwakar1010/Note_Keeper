import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <ButtonGroup>
        <Button
          variant="outline-primary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline-primary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Pagination;

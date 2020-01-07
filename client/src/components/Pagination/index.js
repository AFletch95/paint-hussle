import React from 'react';

const CUT_OFF = 11;

const Pagination = props => {
  const { total, setPage } = props;
  if (total < 2) return null;
  const current = Math.min(Math.max(props.current, 0), total - 1);
  const getLeft = () => {
    if (total <= CUT_OFF) return null;
    const start = 0;
    if (current === start) {
      return [
        <li className="page-item disabled" key="Start" style={{ cursor: 'default' }}>
          <span className="page-link" aria-label="Start">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Start</span>
          </span>
        </li>,
        <li className="page-item disabled" key="Previous" style={{ cursor: 'default' }}>
          <span className="page-link" aria-label="Previous">
            <span aria-hidden="true">&lsaquo;</span>
            <span className="sr-only">Previous</span>
          </span>
        </li>,
      ];
    } else {
      return [
        <li className="page-item" key="Start" style={{ cursor: 'pointer' }}>
          <button className="page-link" aria-label="Start" onClick={() => setPage(start)}>
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Start</span>
          </button>
        </li>,
        <li className="page-item" key="Previous" style={{ cursor: 'pointer' }}>
          <button className="page-link" aria-label="Previous" onClick={() => setPage(current - 1)}>
            <span aria-hidden="true">&lsaquo;</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>,
      ];
    }
  };
  const getRight = () => {
    if (total <= CUT_OFF) return null;
    const end = total - 1;
    const atEnd = current === end;
    if (atEnd) {
      return [
        <li className="page-item disabled" key="Next" style={{ cursor: 'default' }}>
          <span className="page-link" aria-label="Next">
            <span aria-hidden="true">&rsaquo;</span>
            <span className="sr-only">Next</span>
          </span>
        </li>,
        <li className="page-item disabled" key="End" style={{ cursor: 'default' }}>
          <span className="page-link" aria-label="End">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">End</span>
          </span>
        </li>,
      ];
    } else {
      return [
        <li className="page-item" key="Next" style={{ cursor: 'pointer' }}>
          <button className="page-link" aria-label="Next" onClick={() => setPage(current + 1)}>
            <span aria-hidden="true">&rsaquo;</span>
            <span className="sr-only">Next</span>
          </button>
        </li>,
        <li className="page-item" key="End" style={{ cursor: 'pointer' }}>
          <button className="page-link" aria-label="End" onClick={() => setPage(end)}>
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">End</span>
          </button>
        </li>,
      ];
    }
  };
  const getMiddle = () => {
    const pageLinks = [];
    function addPage(i) {
      const isCurrent = i === current;
      if (isCurrent) {
        pageLinks.push(
          <li className="page-item active" key={i} style={{ cursor: 'default' }}>
            <span className="page-link">
              {current + 1}
              <span className="sr-only">(current)</span>
            </span>
          </li>,
        );
      } else {
        pageLinks.push(
          <li className="page-item" key={i} style={{ cursor: 'pointer' }}>
            <button className="page-link" onClick={() => setPage(i)}>
              {i + 1}
            </button>
          </li>,
        );
      }
    }
    let ellipsisCount = 0;
    function addEllipsis() {
      pageLinks.push(
        <li className="page-item disabled" key={'ellipsis' + ellipsisCount++}>
          <span className="page-link">...</span>
        </li>,
      );
    }
    if (total <= CUT_OFF) {
      for (let i = 0; i < total; ++i) addPage(i);
    } else if (current < 4) {
      for (let i = 0; i <= 4; ++i) addPage(i);
      addEllipsis();
      addPage(total - 1);
    } else if (current > total - 5) {
      addPage(0);
      addEllipsis();
      for (let i = total - 5; i < total; ++i) addPage(i);
    } else {
      addPage(0);
      addEllipsis();
      for (let i = current - 1; i <= current + 1; ++i) addPage(i);
      addEllipsis();
      addPage(total - 1);
    }
    return pageLinks;
  };
  return (
    <ul className="pagination justify-content-center my-3">
      {getLeft()}
      {getMiddle()}
      {getRight()}
    </ul>
  );
};

export default Pagination;

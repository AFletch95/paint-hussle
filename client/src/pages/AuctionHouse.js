import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import AuctionPanel from '../components/AuctionPanel';
import Pagination from '../components/Pagination';

import database from '../utils/API';

export default () => {
  const [pages, setPages] = useState({
    total: 0,
    current: -1,
    map: new Map(),
  });
  useEffect(() => {
    database.getAuctions({ page: pages.current }).then(res => {
      if (res.statusText === 'OK') {
        const { page, totalPages, auctions } = res.data;
        const update = {};
        if (pages.total !== totalPages) update.total = totalPages;
        if (auctions.length !== 0) {
          if (pages.current !== page) update.current = page;
          update.map = pages.map;
          update.map.set(pages.current, auctions);
        }
        setPages({ ...pages, ...update });
      }
    });
  });
  const getAuctions = () => {
    if (pages.total === 0)
      return <div className='text-center'>No Auctions</div>;
    if (!pages.map.has(pages.current)) return null;
    const auctions = pages.map.get(pages.current);
    return (
      <ListGroup variant='flush'>
        {auctions.map(auction => (
          <ListGroup.Item>
            <AuctionPanel auction={auction} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <Container fluid='true'>
      <Container className='mx-auto'>
        {getAuctions()}
        <Pagination
          current={pages.current}
          total={pages.total}
          setPage={page => setPages({ ...pages, current: page })}
        />
      </Container>
    </Container>
  );
};

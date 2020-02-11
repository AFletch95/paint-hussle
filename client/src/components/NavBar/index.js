import React from 'react';
import './style.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

import logo from '../../logo.svg';

import API from '../../utils/API';

export default props => {
  let currentUsername = sessionStorage.getItem('currentUsername');

  const handleLogOut = () => {
    sessionStorage.clear();
    API.account.logOut();
  };

  const changeLinkColorHover = event => {
    event.target.style.color = 'lightgray';
  };

  const changeLinkColor = event => {
    event.target.style.color = 'white';
  };

  const linkItem = {
    color: 'white',
    fontSize: '1.2rem',
  };

  const activeLinkItem = {
    color: 'white',
    fontSize: '1.2rem',
    textDecoration: 'underline',
  };

  return (
    <Navbar collapseOnSelect expand='lg' className='text-center'>
      <Container>
        <Navbar.Brand href='/' style={linkItem}>
          <Image
            className='d-inline-block align-top'
            src={logo}
            alt='Logo'
            width='30'
            height='30'
          />{' '}
          Paint Hustle
        </Navbar.Brand>
        <Navbar.Collapse id='nav-links'>
          <Nav className='mr-auto'>
            {[
              ['Auction House', 'auctionhouse'],
              ['Artists', 'artists'],
              ['Gallery', 'gallery'],
              ['Leaderboard', 'leaderboard'],
            ].map(([label, path]) => (
              <Nav.Link
                href={`/${path}`}
                style={props.path === path ? activeLinkItem : linkItem}
                onMouseOut={changeLinkColor}
                onMouseOver={changeLinkColorHover}
                className='d-inline-block align-top'
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <NavDropdown
              title='My Account'
              style={linkItem}
              onMouseOut={changeLinkColor}
              onMouseOver={changeLinkColorHover}
            >
              <NavDropdown.Item href='#'>Home</NavDropdown.Item>
              <NavDropdown.Item href='#'>Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/' onClick={handleLogOut}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls='nav-links' />
      </Container>
    </Navbar>

    // <nav className="navbar navbar-dark bg-dark">
    //   <a className="navbar-brand h1 mb-0" href="/">
    //     Paint-Hustle
    //   </a>
    //   <a className="nav-item text-light" href={currentUsername ? '/myaccount/' : '/login'}>
    //     {currentUsername ? 'My Account' : 'Sign in / Sign Up'}
    //   </a>
    //   <a className="nav-item text-light" onClick={() => props.handlePageChange('Market')} href="/marketplace">
    //     Marketplace
    //   </a>
    // </nav>
  );
};

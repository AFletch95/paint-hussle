import React from 'react';
import './style.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';

import logo from '../../logo.svg';

import API from '../../utils/API';

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

export default props => {
  const { user } = props;

  const handleLogOut = () => {
    sessionStorage.clear();
    API.account.logOut();
  };

  return (
    <Navbar collapseOnSelect expand='lg' className='text-center'>
      <Container>
        <Navbar.Brand href='/' style={linkItem}>
          <Image className='d-inline-block align-top' src={logo} alt='Logo' width='30' height='30' /> Paint Hustle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='nav-links' />
        <Navbar.Collapse id='nav-links'>
          <Nav className='mr-auto'>
            {[
              ['Auction House', 'auctionhouse'],
              ['Artists', 'artists'],
              ['Gallery', 'gallery'],
              ['Leaderboard', 'leaderboard'],
            ].map(([label, path]) => (
              <Nav.Link
                key={label}
                href={`/${path}`}
                style={props.path === path ? activeLinkItem : linkItem}
                onMouseOut={changeLinkColor}
                onMouseOver={changeLinkColorHover}
                className='align-top'
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Nav.Item style={linkItem}>
              <Nav.Link disabled={true} style={linkItem} className='align-top'>
                {user.currency || 0}🍪
              </Nav.Link>
            </Nav.Item>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                style={linkItem}
                onMouseOut={changeLinkColor}
                onMouseOver={changeLinkColorHover}
              >
                My Account
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href='#'>Home</Dropdown.Item>
                <Dropdown.Item href='#'>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href='/' onClick={handleLogOut}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
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

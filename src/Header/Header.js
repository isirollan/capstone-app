import '../styles/header.css';
import React from 'react';
import { signOut } from 'aws-amplify/auth';

// Amplify signout function
async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

function Header() {
    return (
        <>
            <div className='header'>
                <div className='left'></div>
                <div className='middle'>
                    <p className='logo'>r.</p>
                </div>
                <div className='right'>
                  <button className='signoutbutton' onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>

        </>
    )
}

export default Header; 
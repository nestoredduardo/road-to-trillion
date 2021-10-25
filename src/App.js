import React, { useEffect, useState } from 'react';

import SelectCharacter from './Components/SelectCharacter'

import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'nestoredduardo';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [characterNFT, setCharacterNFT] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log('Hey, your wallet is not connected!');
        return;
      } else {
        console.log('We have the ethereum object', ethereum);

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if(accounts.length !== 0){
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else{
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderContent = () => {
    if(!currentAccount){
      return (<div className="connect-wallet-container">
              <img
                src="https://c.tenor.com/y2JXkY1pXkwAAAAC/cat-computer.gif"
                alt="Cat Coding"
                width='350'
                className="connect-wallet-gif"
              />
              <button className="cta-button connect-wallet-button"
                onClick={connectWalletAction}>Connect Wallet To Get Started</button>
            </div>)
    } else if(currentAccount && !characterNFT){
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    }
  };

  const connectWalletAction = async()=>{
    try{
      const{ ethereum } = window;

      if(!ethereum) {
        alert('Get Metamask to start your road in web 3.0 🚀')
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('You are connected', accounts[0]);
      setCurrentAccount(accounts[0])
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">🚀 Road to Trillion 🚀</p>
          <p className="sub-text">Team up to build the future!</p>
          {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with 💚 by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;

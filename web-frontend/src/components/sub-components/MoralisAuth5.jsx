import { useMoralis } from 'react-moralis';
import Moralis from 'moralis-v1';
import {useState} from 'react';
import { useEffect } from 'react';


export const MoralisAuth5 = () => {
  const { authenticate, enableWeb3 } = useMoralis();
  const [authError, setAuthError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(()=>{
    enableWeb3();
  },[]);

  const handleAuth = async (provider) => {
    try {
      setAuthError(null);
      setIsAuthenticating(true);
      
      // Enable web3 to get user address and chain
      await enableWeb3({ throwOnError: true, provider });
      const { account, chainId } = Moralis;

      if (!account) {
        throw new Error('Connecting to chain failed, as no connected account was found');
      }
      if (!chainId) {
        throw new Error('Connecting to chain failed, as no connected chain was found');
      }

      

      // Get message to sign from the auth api
      const { message } = await Moralis.Cloud.run('requestMessage', {
        address: account,
        chain: parseInt(chainId, 16),
        network: 'evm',
      });

      // Authenticate and login via parse
      console.log('authenticating...')
      await authenticate({
        signingMessage: message,
        throwOnError: true,
      });
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsAuthenticating(false);
    }
    console.log('ALL DONE')
  };

    return (<div>
    <button onClick={() => {authenticate({signingMessage:'THANKS FOR MAKING ME DO THIS'})}}>Authenticate via metamask</button>
  </div>
  )
}
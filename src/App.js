import './App.css';
import './Animate.css'
import MediaQuery from 'react-responsive';
import { useState, useEffect } from 'react';
import { db } from './resources/config';
import {
  collection,
  addDoc,
} from 'firebase/firestore';
// import { FaCheck } from "react-icons/fa";
import sheetsImg from './assets/sheets1.png';
import cub from './assets/compo/Cub.png';
import join from './assets/compo/join.png';
import joinWhite from './assets/compo/join-white.png';
import * as EmailValidator from 'email-validator';
import axios from 'axios';

function App() {
  const [emailValue, setEmailValue] = useState('');
  const [isToast, setIsToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [processCondition, setProcessCondition] = useState('Subs');

  async function save(e) {
    e.preventDefault();
    setProcessCondition('Load');
    try {
      let data = {
        "publication_id": process.env.REACT_APP_PUBLICATION_ID,
        "email": emailValue,
        "reactivate_existing": false,
        "send_welcome_email": true,
        "utm_medium": "organic",
        "referring_site": "jobs.launchy.app"
      }

      await axios.post(`https://launchy-server.rshme.codes/api/v1/user/subscribe`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((result) => {
        console.log(result);
        const colRefget = collection(db, 'registerCollaboration');
        const saveRegistrant = async (email) => {
          await addDoc(colRefget, {
            email: email,
            status: 'pending',
            referring: 'angels',
            createdAt: new Date().toUTCString(),
          });
        };
        saveRegistrant(
          emailValue,
        ).then(() => {
          setProcessCondition('Success');
          setTimeout(function () {
            setEmailValue('');
            setProcessCondition('Subs');
            window.location.replace('https://docs.google.com/spreadsheets/d/1yiN8ry0BG2kt8CFDzbIdkVzDXmsLbvJ1ruGtnGEHUxo/edit?usp=sharing');
          }, 1000);
        }).catch(function (error) {
          console.log(error);
        });
      }).catch(function (error) {
        console.log(error);
        setProcessCondition('Subs');
        setIsToast(true);
        setToastMessage('Something wrong, please try again later!');
      });
    } catch (err) {
      console.log(err);
      setProcessCondition('Subs');
    }
  };

  useEffect(() => {
  }, [emailValue]);

  useEffect(() => {
    if (!isToast) return;

    const intervalId = setInterval(() => {
      setIsToast(false);
      setToastMessage('');
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isToast]);

  return (
    <section className="py-0 bg-white md:py-16 lg:py-20 flex-center h-screen">
      <img className='cub-1' src={cub} alt='' />
      <img className='cub-2' src={cub} alt='' />
      <img className='cub-3' src={cub} alt='' />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <MediaQuery minWidth={768}>
          <div className='absolute right-10 top-5'>
            <a href='https://twitter.com/launchy_' target="_blank" rel="noreferrer">
              <img className="inline-block rounded-full w-7 h-7 ring-2 ring-white mx-2" src="./assets/twitter.png" alt="" />
            </a>
            <a href='https://www.linkedin.com/company/launch-y' target="_blank" rel="noreferrer">
              <img className="inline-block w-7 h-7 ring-2 ring-white mx-2" src="./assets/linkedin.png" alt="" />
            </a>
          </div>
          <div>
            <img className="md:w-3/12 lg:w-2/12 mt-4 h-8 mx-auto h-auto" src="./assets/launchy.png" alt="" />
          </div>
        </MediaQuery>
        {/* <MediaQuery maxWidth={767.9}> */}
        {/* <div className='absolute right-5 top-5'>
            <a href='https://twitter.com/launchy_' target="_blank" rel="noreferrer">
              <img className="inline-block rounded-full w-6 h-6 ring-2 ring-white mx-2" src="./assets/twitter.png" alt="" />
            </a>
            <a href='https://www.linkedin.com/company/launch-y' target="_blank" rel="noreferrer">
              <img className="inline-block w-6 h-6 ring-2 ring-white mx-2" src="./assets/linkedin.png" alt="" />
            </a>
          </div>
          <div>
            <img className="w-2/4 h-8 mx-auto h-auto" src="./assets/launchy.png" alt="" />
          </div> */}
        {/* </MediaQuery> */}

        <div className="grid max-w-lg grid-cols-1 mx-auto mt-8 gap-y-12 lg:mt-24 lg:max-w-none lg:grid-cols-2 bg-transparent z-50 relative px-2">
          <div className="lg:pr-16 xl:pr-24">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl xl:text-4xl font-pj">GET WEB3 JOBS LIST</h1>

              <div className="flex justify-center flex-shrink-0 mt-8 -space-x-4 overflow-hidden">
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/ethereum.jpg" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/solana.png" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/arbitrum.png" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/aptos.jpg" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/sui.png" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/near.jpg" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/avalanche.png" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/cardano.png" alt="" />
              </div>

              <p className="px-4 mt-5 text-lg font-normal text-gray-900 sm:px-0 font-pj">Fill out your email to receive the <span className="font-semibold">Jobs list</span>.</p>
            </div>

            <div className="space-y-3 mt-10">
              <MediaQuery maxWidth={991.5}>
                <img src={sheetsImg} alt='sheets' />
              </MediaQuery>
              <div className='wrap-input'>
                <div className='block w-full'>
                  <label className="email-input sr-only" htmlFor=""> Email address </label>
                  <input
                    value={emailValue}
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                    }}
                    type="email"
                    name=""
                    id=""
                    placeholder="Email address"
                    className="input-style focus:border-red-900 focus:outline-none focus:ring-white"
                    autoFocus
                  />
                </div>
                <div className='btn-input-wrap block'>
                  <button className='btn-input-style focus:ring-core-900 focus:border-red-900 focus:outline-none' onClick={(e) => {
                    let mailChecker = EmailValidator.validate(emailValue);
                    if (mailChecker) {
                      save(e);
                    } else {
                      setIsToast(true);
                      setToastMessage('Please enter your email correctly.');
                    }
                  }}>
                    {processCondition === 'Subs' &&
                      <span className="font-extrabold">View Jobs</span>
                    }
                    {processCondition === 'Success' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check mx-auto" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" fill="white"></path>
                      </svg>
                    }
                    {processCondition === 'Load' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots mx-auto" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="white"></path>
                      </svg>
                    }
                  </button>
                </div>
              </div>
            </div>
            <p className='text-xs text-gray-500 pt-2 pl-3'>By submitting this form, you agree to subscribe to Chain Catalyst (Web3 Builder-investor Newsletter). You can unsubscribe at any time.</p>
          </div>
          <MediaQuery minWidth={992}>
            <div className="self-center">
              <img src={sheetsImg} alt='sheets' />
            </div>
          </MediaQuery>
        </div>
        <div className='px-4 md:px-28 w-full mt-8 md:mt-16'>

          <MediaQuery minWidth={992}>
            <div className='border-2 lg:border-4 border-red-900 py-2 px-6 lg:px-8 lg:py-6 flex items-center border-join justify-center'>
              <h2 className='w-full text-sm md:text-md lg:text-xl font-black text-red-900 px-2 range-text-join'>Join our web3 jobs telegram group</h2>
              <div className='text-end min-w-fit lg:min-w-unset'>
                <a href='/#' className='bg-red-900 py-2 px-8 font-black text-white text-xl rounded-full inline-flex'>Join Us <img className='ml-2 join-logo-white' src={joinWhite} alt="" /></a>
              </div>
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={991.9}>
            <a href='/#' className='border-2 lg:border-4 border-red-900 py-2 px-6 lg:px-8 lg:py-6 flex items-center border-join justify-center bg-white z-50 relative'>
              <h2 className='w-full text-sm md:text-md lg:text-xl font-black text-red-900 px-2 range-text-join'>Join our web3 jobs telegram group</h2>
              <div className='text-end min-w-fit lg:min-w-unset'>
                <img className='md:mx-2' style={{ width: '2.5vh' }} src={join} alt='' />
              </div>
            </a>
          </MediaQuery>
        </div>
      </div>
      {
        isToast &&
        <div id="toast-bottom-right" className="bg-core-900 flex fixed right-5 bottom-5 items-center p-4 space-x-4 w-full max-w-xs text-gray-50 rounded-lg divide-x divide-gray-200 shadow" role="alert">
          <div className="text-sm font-normal flex items-center">
            <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2 bi bi-exclamation-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill="white"></path> <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" fill="white"></path>
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      }
    </section >
  );
}

export default App;

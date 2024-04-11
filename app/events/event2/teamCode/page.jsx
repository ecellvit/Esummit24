'use client';

import Alert from '@/components/Alert';
import bg from '@/public/assets/bg/spceBg.svg';
import copyIcon from '@/public/assets/icons/copyIcon.svg';
import { AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import LoadingIcons from 'react-loading-icons';

export default function TeamCode() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // router.push("/")
    } else if (status === 'authenticated') {
      getUserData();
    }
  }, [status, router]);

  const [teamName, setTeamName] = useState('Team Futurepreneur'); // To store the team name
  const [teamCode, setTeamCode] = useState('abc123'); //To store the team code recieved from the backend
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false); //To show the bool to display the alert.
  const [alertText, setAlertText] = useState(''); //Store the alert text to be displayed

  const getUserData = () => {
    fetch(`/api/userDetails`, {
      content: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.user;
        console.log('user', user)
        if (user.hasFilledDetails === true) {
          if((user.events).includes(2)){
            if (user.event2TeamId ) {
              if (user.event2TeamRole !== 0) {
                router.push('/events/event2/memberDash');
              }
            } else {
              router.push('/events/event2/joinTeam');
            }
          }else{
            toast.error('Please register the Event first!!')
            router.push('/events.event2')
          }
        } else {
          router.push('/userDetails');
        }
        fetch(`/api/event2/getTeamCode`, {
          content: 'application/json',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessTokenBackend}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);

            setTeamCode(data.teamCode);
            setTeamName(data.teamName);
          })
          .catch((err) => {
            console.log('err', err);
            setLoading(true);
          });
      });
  };

  return (
    <main className="bg-[#0E0E0E] min-h-[100vh] items-center flex flex-col justify-center">
      <Toaster />
      {/* <Image
        alt="bg"
        src={bg}
        fill
        className="object-cover z-[-10]"
      /> */}
      <div className="h-[45vh] w-[45vw] flex flex-col items-center justify-around text-white rounded-lg p-3 min-w-fit min-h-fit border-2 border-[#D6993F]">
       
        <h1 className="text-4xl sm:text-5xl font-bold">
          {loading ? <LoadingIcons.Oval /> : teamName}
        </h1>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-medium underline">
            Team Code
          </h1>
          <h1 className="text-lg">
            {loading ? <LoadingIcons.Oval /> : teamCode}
          </h1>
        </div>
        <div
          className="flex items-center hover:underline hover:cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(teamCode);
            toast.success('Copied to clipboard.', { duration: 3000 });
          }}>
          Click here to copy
          <div>
            <Image alt="copyIcon" src={copyIcon} className="h-full p-2" />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showAlert && <Alert name={alertText} />}
      </AnimatePresence>
    </main>
  );
}

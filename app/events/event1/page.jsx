"use client"

import RegisterButton from '@/components/events/RegisterButton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      getUserData();
      // fetchDataFromBackend();
    }
  }, [status, router]);

  const getUserData = () => {
    setIsLoading(true);

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
        if (user.hasFilledDetails == true) {
          setIsLoading(false);
        } else {
          router.push('/userDetails');
        }
      })
      .catch((err) => {
      });
  };

  return (
    <div>
      Event1 Landing Page
      <br></br>
      info about Event1
      <br></br>

      <RegisterButton event={1} token={session?.accessTokenBackend}/>

      {/* <Link
        href={'/events/event1/makeTeam'}
        className="bg-blue-500 border border-black rounded-lg p-2 m-2">
        Register
      </Link> */}

    </div>
  );
}

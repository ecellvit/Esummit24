"use client"
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function UserDetails() {
   const { data: session, status } = useSession();

   // use session chl rha h baaki frondend me data kese lena h aap log dekh lo
   //console.log("fsdbhbsbvdfwad",data);
   // console.log("fgfcgcgfdfdsds",session);
    //console.log(data);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [mobno, setMobno] = useState('');
    // const router = useRouter();

    const handleSubmit = async () => {

        console.log('button ')
       
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                Authorization:`Bearer ${session.accessTokenBackend}`,
                'Access-Control-Allow-Origin':'*',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    regNo,
                    mobno
                })
            });

            if (response.ok) {
                console.log('Data saved successfully');
         
                setFirstName('');
                setLastName('');
                setRegNo('');
                setMobno('');

                // router.push('/')

            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <div>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ color: 'black' }}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ color: 'black' }}
                />
            </div>
            <div>
                <label htmlFor="regNo">Registration Number:</label>
                <input
                    type="text"
                    id="regNo"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    style={{ color: 'black' }}
                />
            </div>
            <div>
                <label htmlFor="mobNo">Mobile Number:</label>
                <input
                    type="text"
                    id="mobNo"
                    value={mobno}
                    onChange={(e) => setMobno(e.target.value)}
                    style={{ color: 'black' }}
                />
            </div>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    );
}

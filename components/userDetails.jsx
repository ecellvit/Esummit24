"use client"
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function UserDetails() {
   const { data: session, status } = useSession();


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [mobno, setMobno] = useState('');
    // const router = useRouter();

    const handleSubmit = async () => {

       
        try {
            const response = await fetch('/api/userDetails', {
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
         
                setFirstName('');
                setLastName('');
                setRegNo('');
                setMobno('');

                // router.push('/')

            } else {
            }
        } catch (error) {
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
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="regNo">Registration Number:</label>
                <input
                    type="text"
                    id="regNo"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="mobNo">Mobile Number:</label>
                <input
                    type="text"
                    id="mobNo"
                    value={mobno}
                    onChange={(e) => setMobno(e.target.value)}
                />
            </div>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    );
}

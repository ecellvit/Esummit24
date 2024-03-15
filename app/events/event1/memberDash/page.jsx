"use client"

import Card from '@/Components/Card';
import LeaveButton from '@/Components/LeaveButton';
import LoadingScreen from '@/Components/LoadingScreen';
import boardImg from "@/public/assets/boardpics/image2.svg";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const TeamPage = () => {

  const [popUpForDelete, setPopUpForDelete] = useState(false);
  const [popUpForRemove, setPopUpForRemove] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [remove, setRemove] = useState(false);
  const [id, setId] = useState();
  const [teamId,setTeamId] = useState('');
  const [teamLeaderId,setTeamLeaderId] = useState('');
  const [teamName,setTeamName] = useState('');
  const [teamMembersData,setTeamMemberData] = useState([]);
  const[isLoading, setIsLoading] = useState(false);


  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    } else if(status === "authenticated"){
      console.log('asdf')
      getData()
      fetchDataFromBackend();
    }
  }, [status, router])

  const getData = ()=>{
    console.log('asdff')
    setIsLoading(true);
    
    fetch(`/api/userDetails`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('user;;', data)
        const user = data.user;
        if (user.hasFilledDetails == true) {
          if (user.event1TeamId) {
            // router.push("/");
            if (user.event1TeamRole === 0) {
              router.push('/events/event1/leaderDashboard')
            } else {
              setIsLoading(false);
            }
          } else {
            router.push('/events/event1/makeTeam')
          }
        } else{
          router.push('/userDetails');
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
  }

  const fetchDataFromBackend = () => {
    setIsLoading(true);
    fetch('/api/event1/getTeamData', {
      content: "application/json",
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    }).then(res => res.json())
    .then(data => {
      
      setTeamId(data.teamDetails._id);
      setTeamMemberData(data.teamDetails.members);
      
      setTeamName(data.teamDetails.teamName);
      setTeamLeaderId(data.teamDetails.teamLeaderId);
      
      setIsLoading(false);
    }).catch(err => {
      
      
    })
  };

  const leaveTeam = () => {
    setIsLoading(true);
    fetch( '/api/event1/leaveTeam/', {
      content: "application/json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    }).then(data=>data.json())
    .then(data=>{
      console.log('data', data)
      if(data.status == 200) {
        setIsLoading(true);
        router.push('/events/event1/makeTeam')
      }
    })
  }

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen"
      style={{ backgroundImage: 'url(/assets/bg/spceBg.svg)' }}
    >
    {isLoading && <LoadingScreen/>}
      {/* <Navbar /> */}

      <div className="max-w-screen-xl mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4 mt-8 text-white">Team : {teamName}</h1>

        {
          teamMembersData.length < 3 && 
          <div style={{ backgroundColor: '#141B2B' }} className="p-2 outline outline-slate-700 outline-2 rounded-md mb-5">
            <p className="text-white">
              By joining this team, I understand that if the team I have joined has a total of 2 members or less, this team may be merged with another team to meet the minimum requirement of 3 members per team.
            </p>
          </div>
        }

        <div className="flex flex-wrap justify-center">
          {
            teamMembersData.map(el=>{
              return <Card name={el.name} key={el.name} regNo={el.regNo} Role={el.event1TeamRole===0?'Leader':'Member'} leader={false} phone={el.mobNo} imageSrc={boardImg} />
            })
          }
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <LeaveButton 
          // onClick={()=>{
          onClick={()=>leaveTeam()}
         />
      </div>
    </div>
  );
};

export default TeamPage;

"use client";
import "./style.css"
import '@livekit/components-styles';
import { ControlBar, RoomAudioRenderer, useTracks } from "@livekit/components-react";
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
} from '@livekit/components-react';
import { useEffect, useState } from 'react';
import { Track } from 'livekit-client';
import { useSearchParams } from "next/navigation";

export default function Page() {
  // TODO: get user input for room and name
  const params = useSearchParams();
  useEffect(()=>{
    const room = params.get("room");
    const name = params.get("name");
    if(room && name){
      setRoom(room);
      setName(name);
    }
  })
  const [room, setRoom] = useState<string>();
  const [name,setName] = useState<string>();
  // const room = "quickstart-room";
  // const name = "rohan";
  const [token, setToken] = useState("");
  // console.log("token",token)

  // useEffect(() => {
  //   (async () => {
  //     if(!room || !name){
  //       return;
  //     }
  //     try {
  //       const resp = await fetch(
  //         /api/get-participant-token?room=${room}&username=${name}
  //       );
  //       const data = await resp.json();
  //       setToken(data.token);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, []);
  async function getToken(){
    if(!room || !name){
      alert("Please enter the room and username");
      return;
    }
    try {
      const resp = await fetch(
        `/api/get-participant-token?room=${room}&username=${name}`
      );
      const data = await resp.json();
      setToken(data.token);
    } catch (e) {
      console.error(e);
    }
  }

  if (token === "") {
    return (
    // <div>Getting token...</div>;
    <>
    <form
      onSubmit={(e)=>{
        e.preventDefault();
        getToken();
      }}
    className="login-box">
    <div className="user-box">
      <input type="text"  
      placeholder='room'
      value={room}
      onChange={(e)=> setRoom(e.target.value)}/>
      </div>
      <div className="user-box">
      <input type="text"
      placeholder='Name'
      value={name}
      onChange={(e)=> setName(e.target.value)} />
      </div>
      <center><button 
        className="bg-warning-300 dark:bg-warning-foreground justify-center"
        type='submit'>Join</button></center>
      </form>
    </>
    )
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      onDisconnected={()=>setToken("")}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <VideoConference/>
            {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      {/* <RoomAudioRenderer />  */}
      {/* <RoomAudioRenderer/>
       */}
       <RoomAudioRenderer/>
      {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
      {/* <ControlBar/> */}
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // useTracks returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}
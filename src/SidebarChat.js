import React, { useEffect, useState } from 'react';
import "./SidebarChat.css"
import { Avatar } from '@material-ui/core';
import db from './firebase';
import { useHistory } from 'react-router-dom';

function SidebarChat(props) {
    const { addNewChat, id, name } = props;
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');
    const history = useHistory();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot) => (
                // setMessages(snapshot.docs[0].data().message)
                setMessages(snapshot.docs.map((doc)=>
                    doc.data()
                )))
            )
        }
    }, [id])

    const createChat = () => {
        const roomName = prompt("Please Enter the Name for Chat Room");
        if (roomName) {
            db.collection('rooms').add({
                'name': roomName
            })
            // const aTuringRef = db.collection('rooms').doc('room');
            // await aTuringRef.set({
            //     'name':roomName
            // });
        }
    }

    var openChat = function (id) {
        history.push("/rooms/" + id);
    }

    return (!addNewChat) ? (
        <div className="sidebarChat" onClick={() => openChat(id)}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
    ) : (
            <div className="sidebarChat" onClick={createChat}>
                <div className="sidebarChat_info">
                    <h2>Add New Chat</h2>
                </div>
            </div>
        )
}

export default SidebarChat

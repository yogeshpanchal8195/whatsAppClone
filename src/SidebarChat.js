import React, { useEffect, useState } from 'react';
import "./SidebarChat.css"
import { Avatar } from '@material-ui/core';
import db from './firebase';
// import { useHistory, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function SidebarChat({ addNewChat, id, name }) {

    const [seed, setSeed] = useState('');
    const history = createBrowserHistory();

    // const history = useHistory();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

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
        history.push("/rooms/"+id);
    }

    return (!addNewChat) ? (
        // <nav>
        //     <li>
        //     <Link to={`rooms/${id}`}>
                <div className="sidebarChat" onClick={() => openChat(id)}>
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                    <div className="sidebarChat_info">
                        <h2>{name}</h2>
                        <p>Last Message...</p>
                    </div>
                </div>
        //     </Link>
        //     </li>
        // </nav>
    ) : (
            <div className="sidebarChat" onClick={createChat}>
                <div className="sidebarChat_info">
                    <h2>Add New Chat</h2>
                </div>
            </div>
        )
}

export default SidebarChat

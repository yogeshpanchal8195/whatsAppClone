import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, MoreVert, AttachFile, InsertEmoticon, MicRounded } from '@material-ui/icons';
import './Chat.css'
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat(props) {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    var { roomId } = useParams();
    // var roomId = props.match.params.roomId;

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name)
            })
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((msg) => msg.data()));
            })
        }
    }, [roomId])


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = function (event) {
        event.preventDefault();
        let obj = {
            'name': user.displayName,
            'message': input,
            // 'timestamp':new Date(),
            'timestamp': firebase.firestore.FieldValue.serverTimestamp(),
        }
        db.collection('rooms').doc(roomId).collection('messages').add(obj)
        // setMessages(messages=>messages.push(obj));
        setInput("");
    }

    const showDate=(message)=>{
        if(message && message.timestamp && message.timestamp.toDate){
            if(!new Date(message.timestamp.toDate()).toUTCString() || new Date(message.timestamp.toDate()).toUTCString().toLowerCase() == 'invalida date'){
                return ""
            }else if(new Date(message.timestamp.toDate()).toUTCString()){
                return new Date(message.timestamp.toDate()).toUTCString();
            }
        }
        return "";
    }

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>{messages.length && showDate(messages[messages.length - 1])}</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((message) => (
                    <div className={`chat_message ${message.name == user.displayName && 'chat_reciever'}`}>
                        {message.message}
                        <span className="chat_name">{message.name}</span>
                        <span className="chat_time">{showDate(message)}</span>
                    </div>
                ))}
            </div>
            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a Message" />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>
                    <MicRounded />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;


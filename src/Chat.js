import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, MoreVert, AttachFile, InsertEmoticon, MicRounded } from '@material-ui/icons';
import './Chat.css'
import { useParams, useLocation , withRouter } from 'react-router-dom';
import db from './firebase';
import queryString from 'query-string';

import { createBrowserHistory } from 'history';
function Chat(props) {
    console.log(props);
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [roomName, setRoomName] = useState('')

    // const history = createBrowserHistory();
    props.history.listen((location, action) => {
        debugger
        console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
        console.log(`The last navigation action was ${action}`)
    })

    // var { roomId } = useParams();
    console.log("PP", props.match.params.roomId)
    var roomId = props.match.params.roomId;

    useEffect(() => {
        alert(roomId);
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) => {
                setRoomName(snapshot.data().name)
            })
        }
    }, [roomId])


    // const [locationRef,setlocationRef] = useState(React.useRef(window.location));
    // debugger
    // React.useEffect(() => {
    //     debugger
    //     locationRef.current = window.location;
    // }, [window.location]);

    // const getLocation = React.useCallback(() => locationRef.current, [
    //     locationRef,
    // ]);

    // const setLocation = React.useCallback(
    //     ()=>{
    //         setlocationRef(locationRef.current)
    //     },
    //     [history]
    // );

    // const location = useLocation();
    // React.useEffect(() => {
    //     console.log('Location changed');
    // }, [location]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = function (event) {
        event.preventDefault();
        console.log(input);
        setInput("");
    }

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at...</p>
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
                <div className="chat_message">
                    Hey Guys
                    <span className="chat_name">Yogesh</span>
                    <span className="chat_time">11:00 am</span>
                </div>
                <div className={`chat_message ${true && 'chat_reciever'}`}>
                    Hey Guyzzzz
                    <span className="chat_name">Sanjana</span>
                    <span className="chat_time">11:00 am</span>
                </div>
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


// class Chat extends React.Component {

//     constructor(props){
//         super(props)
//         console.log("XX",props.match.params.roomId)
//         console.log("yy",this.props.match.params.roomId)
//     }

//     sendMessage = function (event) {
//         event.preventDefault();
//         // console.log(input);
//         // setInput("");
//     }

//     componentDidUpdate(prevProps) {
//         debugger
//         if (this.props.location !== prevProps.location) {
//         }
//       }

//     componentDidMount(){
//         console.log("PPPPOOPOPOO");
//         debugger
//         console.log("PPPP",this.props.match.params.roomId);
//     }

//     render() {
//         console.log("ZZ",this.props.match.params.roomId)
//         return (
//             <div className='chat'>
//             <div className="chat_header">
//                 {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
//                 <div className="chat_headerInfo">
//                     {/* <h3>{roomName}</h3> */}
//                     <p>Last seen at...</p>
//                 </div>
//                 <div className="chat_headerRight">
//                     <IconButton>
//                         <SearchOutlined />
//                     </IconButton>
//                     <IconButton>
//                         <AttachFile />
//                     </IconButton>
//                     <IconButton>
//                         <MoreVert />
//                     </IconButton>
//                 </div>
//             </div>
//             <div className="chat_body">
//                 <div className="chat_message">
//                     Hey Guys
//                     <span className="chat_name">Yogesh</span>
//                     <span className="chat_time">11:00 am</span>
//                 </div>
//                 <div className={`chat_message ${true && 'chat_reciever'}`}>
//                     Hey Guyzzzz
//                     <span className="chat_name">Sanjana</span>
//                     <span className="chat_time">11:00 am</span>
//                 </div>
//             </div>
//             <div className="chat_footer">
//                 <IconButton>
//                     <InsertEmoticon />
//                 </IconButton>
//                 <form>
//                     {/* <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a Message" />
//                     <button type="submit" onClick={sendMessage}>Send a message</button> */}
//                 </form>
//                 <IconButton>
//                     <MicRounded />
//                 </IconButton>
//             </div>
//         </div>
//         )
//     }
// }

export default withRouter(Chat);



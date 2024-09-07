import { useEffect, useRef, useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useChatStore } from '../../lib/chatStore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';
import upload from '../../lib/upload';

const Chat = () => {
    const [chat, setChat] = useState();
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [img, setImg] = useState({
        file: null,
        url: ''
    })

    const endRef = useRef(null);

    const { currentUser } = useUserStore();
    const { chatId, user } = useChatStore();

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "chats", chatId),
            (res) => {
                setChat(res.data());
            }
        )

        return () => {
            unSub();
        }
    }, [chatId])

    const handleOpenEmojiPicker = () => {
        setOpenEmojiPicker(!openEmojiPicker);
    };

    const handleEmoji = (e) => {
        setTextValue(textValue + e.emoji);
        setOpenEmojiPicker(false);
    };

    const handleImg = (e) => {
        setImg({
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0])
        })
    }

    const handleSend = async () => {
        if (textValue.trim() === '') return;

        let imgUrl = null;

        try {

            if (img.file) {
                imgUrl = await upload(img.file);
            }

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text: textValue,
                    createdAt: new Date(),
                    ...(imgUrl && { img: imgUrl })
                })
            })

            const userIDs = [currentUser.id, user.id];

            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, "userchats", id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();

                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

                    userChatsData.chats[chatIndex].lastMessage = textValue;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = new Date();

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }

        setImg({
            file: null,
            url: ''
        })

        setTextValue('');
    }

    return (
        <div className='chat'>
            <div className='top'>
                <div className='user'>
                    <img src={user?.avatar || "./avatar.png"} alt="" />
                    <div className='texts'>
                        <span>{user?.username}</span>
                    </div>
                </div>
                <div className='icons'>
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className='center'>
                {chat?.messages?.map((message) => (
                    <div className={`message ${message.senderId === currentUser.id ? 'own' : ''}`} key={message?.createdAt}>
                        <div className='texts'>
                            {message.img &&
                                <img src={message.img} alt="" />
                            }
                            <p>{message.text}</p>
                            {/* <span>1 min ago</span> */}
                        </div>
                    </div>
                ))}
                {img.url && (
                    <div className={`message own`}>
                        <div className='texts'>
                            <img src={img.url} alt="" />
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div>
            <div className='bottom'>
                <div className='icons'>
                    <label htmlFor='file'>
                        <img src="./img.png" alt="" />
                    </label>
                    <input type='file' style={{ display: 'none' }} id='file' onChange={handleImg} />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input
                    type='text'
                    placeholder='Type a message...'
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                />
                <div className='emoji'>
                    <img
                        src='./emoji.png'
                        alt=""
                        onClick={handleOpenEmojiPicker}
                    />
                    <div className='picker'>
                        <EmojiPicker
                            open={openEmojiPicker}
                            onEmojiClick={handleEmoji}
                        />
                    </div>
                </div>
                <button className='sendButton' onClick={handleSend}>Send</button>
            </div>
        </div>
    )
};

export default Chat;
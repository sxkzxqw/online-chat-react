import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../..';
import Loader from '../Loader/Loader';
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Container, Button, Grid, TextField, Avatar } from "@mui/material";
import {
    collection,
    addDoc,
    Timestamp,
    getDocs,
    doc,
    query,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import styles from './Chat.module.css'

const Chat = () => {
    const { auth, db } = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState("");

    const [messagesData, setMessagesData] = useState([]);
    const refer = useRef(null);

    const sendMessage = async () => {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: Timestamp.fromDate(new Date()),
            });

            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setValue("");
        refer.current.scrollIntoView({ behavior: 'smooth' })
    };

    const getMessages = async () => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

        onSnapshot(q, (querySnapshot) => {
            setMessagesData([]);

            querySnapshot.docs.map((doc) => {
                setMessagesData((prevState) => {
                    return [...prevState, doc.data()];
                });
            });
        });
    };

    useEffect(() => {
        getMessages();
    }, []);

    if (messagesData.length > 0) {
        setTimeout(() => {
            refer.current.scrollIntoView({ behavior: 'smooth' })
        }, 100);
    }

    return (
        <Container>
            <Grid container
                justifyContent={"center"}
                style={{ height: window.innerHeight - 50, paddingTop: 20 }}>
                {messagesData.length > 0
                    ? <div style={{ width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto' }}>
                        {messagesData?.map((message, index) =>
                            <div style={{
                                margin: 10,
                                border: user.uid === message.uid ? '2px solid blue' : '2px dashed red',
                                marginLeft: user.uid === message.uid ? 'auto' : '10px',
                                width: 'fit-content',
                                padding: 10,
                                borderRadius: '15px',
                                background: '#F6DDFF'
                            }}
                                key={index}
                                className={styles.message}
                            >
                                <Grid container alignItems={'center'} justifyContent={'center'} gap={'15px'}>
                                    <Avatar src={message.photoURL} />
                                    <div>{message.displayName}</div>
                                </Grid>
                                <div>{message.text}</div>
                            </div>
                        )}
                        <div ref={refer}></div>
                    </div>
                    : <Loader />
                }
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{ width: '80%' }}
                >
                    <TextField
                        fullWidth
                        maxRows={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    {value.length > 0
                        ? <Button onClick={sendMessage} variant={"outlined"}>Отправить</Button>
                        : <Button onClick={sendMessage} variant={"outlined"} disabled>Отправить</Button>
                    }
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
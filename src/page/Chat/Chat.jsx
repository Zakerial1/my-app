import React from 'react';
import styles from "./chat.module.css";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectcurrentUser, selectArrUser, deleteUser } from '../Slices/SliceRegistr';
import { arrMesseng, sendMesseng, createChat, searchChat, CurrentMesseng, createContact, Contacts, deletecurrentMesseng } from '../Slices/SliceMesseng';
// import Autosuggest from 'react-autosuggest';
export default function Chat() {
    const user = useSelector(selectcurrentUser);// авторизированй пользователь 
    const arrUser = useSelector(selectArrUser);// все пользователи 
    const dispatch = useDispatch();
    const [arrSearch, setArrSearch] = useState([]);
    const [messeng, setMesseng] = useState(); // переменная для отправки сообщения 
    const [idChatJSX, setidChatJSX] = useState();
    const arrMessengs = useSelector(arrMesseng); //все чаты
    const curMesseng = useSelector(CurrentMesseng); // актуальный чат 
    const contacts = useSelector(Contacts); // все контакты
    const [contactsArr, setContactsArr] = useState(contacts);
    const [newChanel, setnewChanel] = useState(false);
    const [arrNewChanelCont, setArrNewChanelCont] = useState([])
    const [contnentChat, setContnentChat] = useState(false);
    const [counterModal, setCounterModal] = useState(false);
    return (
        <div className={styles.foremost}>
            <div className={styles.main}>
                <div className={styles.menu}>
                    <div>
                        <div className={styles.MenuImg}>
                            <Link to='/'>
                                <img src='https://i.imgur.com/Tn2x0Ck.png' />
                            </Link>
                            <img />
                        </div>
                        <div className={styles.navigation}>
                            <img src='https://i.imgur.com/cI811bZ.png' />
                            <img src='https://i.imgur.com/seVWQjY.png' />
                            <img src='https://i.imgur.com/hi8xuSq.png' />
                        </div>
                    </div>
                    <div className={styles.setting}>
                        <button className={styles.butSetting}>
                            <img src='https://i.imgur.com/Aej80eV.png' />
                        </button>
                        <button className={styles.butExit} onClick={() => {
                            dispatch(deleteUser())
                        }}>
                            <Link to="/"  >
                                <img className={styles.exit} src='https://i.imgur.com/AVXtQSr.png' />
                            </Link>
                        </button>
                    </div>
                </div>
                <div className={styles.chats}>
                    <div>
                        <p className={styles.messeges}>
                            Messages
                        </p>
                    </div>
                    <div className={styles.inputDiv}>
                        <button type='re' onClick={() => {
                            setContnentChat(false);
                        }}>
                            назад
                        </button>
                        <img className={styles.imgSearch} src='https://i.imgur.com/6Is479c.png' />
                        <input className={styles.inputNameUser} placeholder='Search' onChange={(e) => {
                            const searchValue = e.target.value.toLowerCase();
                            const filteredContacts = contacts.filter(user => user.Login.toLowerCase().includes(searchValue));
                            setContnentChat(true);
                            setContactsArr(filteredContacts);
                        }} />
                        <button onClick={() => {
                            setCounterModal(true);

                        }}>
                            +
                        </button>
                        <div className={counterModal == true ? `${styles.modalOn}` : `${styles.modalOff}`}>
                            <div className={styles.modalWindow}>
                                <input placeholder='Логин Пользователя ' onChange={(e) => {
                                    const searchValue = e.target.value.toLowerCase();
                                    const filteredContacts = arrUser.filter(user => user.Login.toLowerCase().includes(searchValue));
                                    setArrSearch(filteredContacts);
                                }}
                                />
                                <div>
                                    {
                                        arrSearch.map((item, index) => {
                                            return (
                                                <div key={index} className={styles.userSearch}>
                                                    <button className={styles.butUserSearch} onClick={() => {
                                                        setCounterModal(false);
                                                        dispatch(createContact({item}));
                                                    }}>
                                                        {item.Login}
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button onClick={() => {
                                    setCounterModal(false);
                                }}>
                                    Добавить
                                </button>
                                <button onClick={() => {
                                    setCounterModal(false);
                                }}>
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.filtrChat}>
                        <p>Sort by  </p>
                        <a href=''>
                            Newest
                        </a>
                    </div>
                    <div>
                        Cont
                        <button onClick={() => {
                            setnewChanel(false);
                        }}>
                            +
                        </button>
                        <button onClick={() => {
                            setnewChanel(true);
                        }}>
                            -
                        </button>
                    </div>
                    <div >
                        <div className={contnentChat == true ? `${styles.chatOff}` : `${styles.chatOn}`}>
                            {
                                contactsArr.map((item, index) => {
                                    return (
                                        <div className={styles.userSearchBox} key={index}>
                                            <p onClick={() => {
                                            }}>{item.Login}</p>
                                            <button onClick={() => {
                                                setidChatJSX(arrMessengs.length - 1);
                                                dispatch(searchChat({ userS: [item.userID, user.userID], chats: arrMessengs }))

                                            }}>
                                                Выбрать чат
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={contnentChat == true ? `${styles.chatOn}` : `${styles.chatOff}`}>
                            <div className={newChanel == true ? `${styles.newChanelNone}` : `${styles.newChanelYea}`}>
                                {
                                    contactsArr.map((item, index) => {
                                        return (
                                            <div>
                                                <div className={styles.userSearchBoxOn} key={index}>
                                                    <p onClick={() => {
                                                    }}>{item.Login}</p>
                                                    <button onClick={() => {
                                                        const temp = arrMessengs.find(chat => chat.usersChat[0] == item.userID ||
                                                            chat.usersChat[1] == item.userID || chat.usersChat[0] == user.userID ||
                                                            chat.usersChat[1] == user.userID)
                                                        if (temp) {
                                                            console.log(" найден ");
                                                            dispatch(searchChat({ userS: [item.userID, user.userID], chats: arrMessengs }))
                                                        } else {
                                                            console.log("Создан новй");
                                                            dispatch(createChat({
                                                                idChat: arrMessengs.length,
                                                                infoChat: ["Напишите первое сообщение "],
                                                                usersChat: [item.userID, user.userID]
                                                            }))
                                                        }
                                                        console.log(arrMessengs,contacts);
                                                        
                                                    }}>
                                                        Создать чат
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={newChanel == true ? `${styles.newChanelYea}` : `${styles.newChanelNone}`}>
                                <div>
                                    {//это для контактов (ники аватарки)
                                        contacts.map((item, index) => {
                                            return (
                                                <div>
                                                    <div className={styles.newChanelBox} key={index}>
                                                        <input type="checkbox" onChange={(e) => {
                                                            if (e.target.checked) {
                                                                arrNewChanelCont.push(item);

                                                            }
                                                            else {
                                                                let indeX = arrNewChanelCont.findIndex(item => item == item);

                                                                if (indeX !== -1) {
                                                                    arrNewChanelCont.splice(index, 1);
                                                                } else {
                                                                    console.log(`Объект с ID ${item} не найден.`);
                                                                }
                                                            }
                                                            // переделать под фильтр через троеточие и дубликат масива
                                                            // создавать массив и добавить пользователей в обьект 
                                                            //фильтр  
                                                        }} />
                                                        <div>
                                                            <p>{item.Login}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <button onClick={() => {
                                        // по нажатию создавать чат и добавлять юзеров в чат, так же отобразить чат с этими участниками и сам чат
                                        dispatch(createChat({
                                            // idChat: 1,
                                            // infoChat: [""],
                                            // usersChat: arrNewChanelCont
                                        }))

                                    }}>
                                        &gt;
                                        &#x271E;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.divDialog}>
                    <div className={styles.Boxdialog}>
                        <div className={styles.dialog}>
                            <img src='https://i.imgur.com/BGhBzr6.png' />
                            <div className={styles.status}>
                                <div>
                                    {user.Login}
                                </div>
                                <div>
                                    online
                                </div>
                            </div>
                        </div>
                        <div className={styles.dialogImg}>
                            <div>
                                <img src='https://i.imgur.com/9phbhaH.png' />
                            </div>
                            <div>
                                <img src='https://i.imgur.com/xzpZ3Z7.png' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.boxMessege}>
                        {
                            curMesseng[0].infoChat.map((item, index) => {
                                return (
                                    <div key={index} className={styles.dialogPhraz}>
                                        <div className={styles.containerMesseng}>
                                            <div>
                                                {item.parentMesseng}
                                            </div>
                                            <p>
                                                {item.contentMesseng}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.divSend}>
                        <div className={styles.sendFile}>
                            <img src='https://i.imgur.com/ogyCX3W.png' />
                        </div>
                        <div className={styles.boxSendInput}>
                            <input className={styles.sendInput} placeholder='Type your message here..' onChange={(e) => {
                                setMesseng(e.target.value)
                            }} />
                        </div>
                        <div className={styles.boxSendMessage}>
                            <button className={styles.butSenMessage} onClick={(e) => {
                                dispatch(sendMesseng({
                                    parentMessengID: user.userID,
                                    parentMesseng: user.Login,
                                    idChat: idChatJSX,
                                    idMesseng: curMesseng[0].infoChat.length,
                                    contentMesseng: messeng
                                }
                                ))
                            }}>
                                Send message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

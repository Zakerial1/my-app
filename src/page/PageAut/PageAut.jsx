import React from 'react';
import { Link } from 'react-router-dom';
import styles from './pageAut.module.css';
import { useState, useEffect } from 'react';
import { selectcurrentUser, selectArrUser, deleteUser,autorUser } from '../Slices/SliceRegistr';
import {deletecurrentMesseng } from    '../Slices/SliceMesseng'
import { useSelector, useDispatch } from 'react-redux';
export default function PageAut() {
    const arrUser = useSelector(selectArrUser);
    const [login, setLogin] = useState();
    const [pass, setPass] = useState();
    const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(autorUser(
            
    //     ))
    // },[])
    return (
        <div className={styles.boxAut}>
            <div className={styles.main}>
                <div>
                    <p className={styles.pName}>
                        Логин
                    </p>
                    <input onChange={(e) => {
                        setLogin(e.target.value)
                    }} />
                </div>
                <div>
                    <p className={styles.pName}>
                        Пароль
                    </p>
                    <input onChange={(e) => {
                        setPass(e.target.value)
                    }} />
                </div>
                <Link to="/Chat">
                    <button className={styles.butMainAut} onClick={() => {
                        
                        for (let i = 0; i < arrUser.length; i++) {
                            if (login == arrUser[i].Login && pass == arrUser[i].Passwort) {
                                dispatch(autorUser(arrUser[i]))
                                dispatch(deletecurrentMesseng())
                            }
                            
                        }
                    }}>
                        Авторизироваться
                    </button>
                </Link>
                <Link to="/">
                    <button className={styles.butMainAut}>
                        На главную
                    </button>
                </Link>
            </div>
        </div>
    )
}

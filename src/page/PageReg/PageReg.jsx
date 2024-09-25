import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectcurrentUser, selectArrUser } from '../Slices/SliceRegistr';
import {deletecurrentMesseng} from '../Slices/SliceMesseng'
export default function PageReg() {
    const dispatch = useDispatch();
    const user = useSelector(selectcurrentUser);
    let arrUser = useSelector(selectArrUser);
    const [login, setLogin] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [lastName, setLastName] = useState();
    const [passwort, setPasswort] = useState();
    const [numberPhone, setNumberPhone] = useState();
    const [userID, setUserID] = useState();
    // setUserID(arrUser.length)
    
    return (
        <div className={styles.boxAut}>
            <div className={styles.main}>
                <div>
                    <p className={styles.pName}>Логин</p>
                    <input onChange={(e) => {
                        setLogin(e.target.value)
                        
                    }} />
                </div>
                <div>
                    <p className={styles.pName}>Имя</p>
                    <input onChange={(e) => {
                        setName(e.target.value)

                    }} />
                </div>
                <div>
                    <p className={styles.pName}>Отчество</p>
                    <input onChange={(e) => {
                        setSurname(e.target.value)

                    }} />
                </div>
                <div>
                    <p className={styles.pName}>Фамилия</p>
                    <input onChange={(e) => {
                        setLastName(e.target.value)

                    }} />
                </div>
                <div>
                    <p className={styles.pName}>Пароль</p>
                    <input onChange={(e) => {
                        setPasswort(e.target.value)
                    }} />
                </div>
                <div>
                    <p className={styles.pName}>Повторите пароль</p>
                    <input onChange={(e) => {
                        // if (passwort !== e.target.value) {
                            
                        // } else {
                            
                        // }
                    }} />
                </div>
                <div>
                    <p className={styles.pName}>Номер телефона </p>
                    <input onChange={(e) => {
                        setNumberPhone(e.target.value)
                    }} />
                </div>
                <div>
                    <Link to="/Chat">
                        <button className={styles.butMainAut} onClick={() => {
                            dispatch(addUser({
                                Login: login,
                                Name: name,
                                Surname: surname,
                                LastName: lastName,
                                Passwort: passwort,
                                NumberPhone: numberPhone,
                                userID: arrUser.length
                            }
                                // localStorage.setItem({Login: login}),
                                
                            ));
                            dispatch(deletecurrentMesseng());
                        }}>
                            Регистрация
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

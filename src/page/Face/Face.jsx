import React from 'react'
import PageAut from '../PageAut/PageAut'
import PageReg from '../PageReg/PageReg'
import styles from './face.module.css'
import { Link } from 'react-router-dom'
export default function Face() {
    return (
        <div className={styles.main}>
            <div className={styles.box}>
                <h1 className={styles.nameMessages}>
                    Messages
                </h1>
                <main className={styles.mainAut}>
                    <Link to="/PageAut">
                        <button className={styles.butMainAut} >
                            Авторизация
                        </button>
                    </Link>
                    <Link to="/PageReg">
                        <button className={styles.butMainAut}>
                            Регистрация
                        </button>
                    </Link>
                </main>
                <footer>

                </footer>
            </div>
        </div>
    )
}

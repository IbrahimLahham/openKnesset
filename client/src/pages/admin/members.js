import React, { useState, useEffect } from 'react';
import './members.css'
import User from './user'

function Members(props) {
    const [users, setUsers] = useState([]);
    const [blcokUsers, setBlockUsers] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);
    useEffect(() => {
        fetch('/admin/getAllMembers')
            .then(r => r.json())
            .then(data => {
                if (data.ok) {
                    setUsers(data.users)
                }
            })
        fetch('/admin/getBlockedMembers')
            .then(r => r.json())
            .then(data => {
                if (data.ok) {
                    setBlockUsers(data.users)
                }
            })
        fetch('/admin/getActiveMembers')
            .then(r => r.json())
            .then(data => {
                if (data.ok) {
                    setActiveUsers(data.users)
                }
            })

    }, [])

    function handleActive(e) {
        const active = (e.active);
        fetch('/admin/changeStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _email: e.email, active: (!active) })
        }).then(r => r.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <>
            <div className="suggestions-container">
                <table class="fixed_header">
                    <caption id="title" className="title-bold">:כל המשתמשים</caption>
                    <thead>
                        <tr id="header">
                            <th className="title-bold">שם</th>
                            <th className="title-bold">דוא״ל</th>
                            <th className="title-bold">טלפון</th>
                            <th className="title-bold">חברה\אירגון</th>
                            <th className="title-bold">ח"כ\אזרח</th>
                            <th className="title-bold">בלוק</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((elem, index) => {

                            return (
                                <User
                                    key={index}
                                    fname={elem.firstName}
                                    lname={elem.lastName}
                                    email={elem.email}
                                    phone={elem.phone}
                                    company={elem.company}
                                    type={elem.type}
                                    active={elem.active}
                                    spam={handleActive}
                                />)
                        })}
                    </tbody>
                </table>

                <table class="fixed_header">
                    <caption id="title" className="title-bold">משתמשים חסומים:</caption>
                    <thead>
                        <tr id="header">
                            <th className="title-bold">שם</th>
                            <th className="title-bold">דוא״ל</th>
                            <th className="title-bold">טלפון</th>
                            <th className="title-bold">חברה\אירגון</th>
                            <th className="title-bold">ח"כ\אזרח</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blcokUsers.map((elem, index) => {

                            return (
                                <User
                                    key={index}
                                    fname={elem.firstName}
                                    lname={elem.lastName}
                                    email={elem.email}
                                    phone={elem.phone}
                                    company={elem.company}
                                    type={elem.type}
                                    active={elem.active}
                                    spam={handleActive}
                                />)
                        })}
                    </tbody>
                </table>

                <table class="fixed_header">
                    <caption id="title" className="title-bold">משתמשים פעילים:</caption>
                    <thead>
                        <tr id="header">
                            <th className="title-bold">שם</th>
                            <th className="title-bold">דוא״ל</th>
                            <th className="title-bold">טלפון</th>
                            <th className="title-bold">חברה\אירגון</th>
                            <th className="title-bold">ח"כ\אזרח</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeUsers.map((elem, index) => {
                            return (
                                <User
                                    key={index}
                                    fname={elem.firstName}
                                    lname={elem.lastName}
                                    email={elem.email}
                                    phone={elem.phone}
                                    company={elem.company}
                                    type={elem.type}
                                    active={elem.active}
                                    spam={handleActive}
                                />)
                        })}
                    </tbody>
                </table>

            </div>
        </>

    )
}

export default Members
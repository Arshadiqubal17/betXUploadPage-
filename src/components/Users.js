import React,{useState} from 'react';

import Navbar from './Navbar'
import Table from 'react-bootstrap/Table';
import {db} from '../firebase'

function Users(props) {
    const [usersList, setUsersList] = useState([]);

    const li = [];
    db.collection("Users")
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            li.push({...doc.data(),id:doc.id})
        });
        setUsersList(li);
    });

    function activateAccount(id){
        // console.log("activating accoungt for user " + id);
        db.collection("Users")
        .doc(id)
        .update({
            'deactive':false
        }).then(() => {
            console.log('User updated!');
          });
    }

    function deactivateAccount(id){
        // console.log("deactivating accoungt for user " + id);
        db.collection("Users")
        .doc(id)
        .update({
            'deactive':true
        }).then(() => {
            console.log('User updated!');
          });
    }

    return (
        <>
            <Navbar/>
            <div class="container">
                <h2 class="text-center mt-3">Users in database</h2>
                <Table striped bordered hover className="mt-4">
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList.map((user,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email
                                    }</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td>{user.deactive? 
                                        <div>
                                            <span>Currentyly User is Deactive</span>
                                            <span class="ms-3 btn btn-info btn-sm" onClick={()=>activateAccount(user.id)}>Active</span>
                                        </div>
                                        :
                                        <div>
                                            <span>Currentyly User is Active</span>
                                            <span class="ms-3 btn btn-danger btn-sm" onClick={()=>deactivateAccount(user.id)}>Deactive</span>
                                        </div>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Users;
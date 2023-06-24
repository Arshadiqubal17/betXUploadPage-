import React,{useState,useEffect} from 'react';
import Navbar from './Navbar'
import {db} from '../firebase'
function PaymentHistory(props) {

    const [paymentList, setPaymentList] = useState([]);

    console.log("PaymentHistory")
    
       
        console.log('getPayments called')
        const li = [];
        db
        .collection("users").get().then((querySnapshot) => {
            console.log('sss',querySnapshot)
            querySnapshot.forEach((doc) => {
                console.log('sss')
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    
        console.log('list ',paymentList)
        
   
    

    return (
        
        <>
            <Navbar/>
            
        </>
    );
}

export default PaymentHistory;
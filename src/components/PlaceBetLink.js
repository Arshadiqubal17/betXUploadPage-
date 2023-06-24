import React,{useState} from 'react';
import Navbar from './Navbar'
import {db} from '../firebase'

function PlaceBetLink(props) {

    const [betLink, setBetLink] = useState('');
    const [tempBetLink, setTempBetLink] = useState('');

    db.collection("BetLink")
    .doc('BetLink')
    .onSnapshot((querySnapshot) => {
        // console.log('bet link ',querySnapshot.data())
        setBetLink(querySnapshot.data().link)
    });

    function changeLink (){
        // console.log('change link ',tempBetLink)
            db
            .collection('BetLink')
            .doc('BetLink')
            .update({
                'link': tempBetLink,
            })
            .then(() => {
                console.log('Link updated!');
            });
    }

    return (
        <div>
            <Navbar/>
            
            

            <h5 className="text-center mt-5">Current link : <a href={betLink} target="_blank">{betLink}</a></h5>

            <div className="d-flex  justify-content-center mt-5">
                <input placeholder="change link" className="form-control" style={{width: "370px"}} onChange={(e)=>{setTempBetLink(e.target.value)}}/>
                <input className="btn btn-info" type="submit" onClick={()=>changeLink()}/>
            </div>

        </div>
    );
}

export default PlaceBetLink;
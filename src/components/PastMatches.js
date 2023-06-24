import React,{useEffect,useState,useRef} from 'react';
import Navbar from './Navbar'
import moment from 'moment';
import {db,storage} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";
import Table from 'react-bootstrap/Table';

function PastMatches(props) {
    const [pageHeader,setPageHeader] = useState(null);
    const [matchList, setMatchList] = useState([]);

    const inputDate1 = useRef(null);
    const inputDate2 = useRef(null);
    const [predictionImage, setPredictionImage] = useState('');
    const predictionImageRef = useRef(null);

    useEffect(()=>{
        //set dates
        var nowPlus10 = new Date();
        nowPlus10.setMinutes((new Date()).getMinutes()-10)
        var before1Month = new Date();
        before1Month.setMonth(before1Month.getMonth() - 1);
        before1Month.setHours(0, 0, 0, 0);
        //get Matches
        getMatches(before1Month,nowPlus10);
    },[]);

    //Getting data from firebase
    function  getMatches (from,to){
        
        console.log("getting matches beetwen "+from+to)

        const li = [];
        db.collection("Matches")
        .where('matchDate', '<=', to)
        .where('matchDate', '>=', from)
        .orderBy("matchDate", "desc")
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                li.push({...doc.data(),id:doc.id})
            });
            setMatchList(li);
        });
        //Set value to header
        setPageHeader("Past Matches from "+moment(from).format('DD-MM-YYYY')+" to "+moment(to).format('DD-MM-YYYY'))
    }

    //Update status of match
    function updateStatus(status,id){
        console.log(status+id)
        db.collection("Matches")
        .doc(id)
        .update({
            "status":status,
        })
        .then(()=>{
            //update matches data
            var nowPlus10 = new Date();
            nowPlus10.setMinutes((new Date()).getMinutes()-10)
            var before1Month = new Date();
            before1Month.setMonth(before1Month.getMonth() - 1);
            before1Month.setHours(0, 0, 0, 0);
            getMatches(before1Month,nowPlus10);
            alert("Match updated")
        })
    }

    //Update List
    function updateList(){
       
        const dateFrom = new Date(inputDate1.current.value+" 00:00:00");
        const dateTo = new Date(inputDate2.current.value+" 23:59:59");

        getMatches(dateFrom,dateTo);

        //inputDate1.current.value = null;

        
    }

    function uploadPredictionImage (id){
        if(predictionImage == null)
        return;
        // console.log('Vandesh '+id)
        const storageRef = ref(storage, `/PedictionImage/${new Date()+predictionImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, predictionImage);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // const percent = Math.round(
                //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
                // // update progress
                // setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    //console.log(url);
                    // setMatch({...match,predictionImage:url})
                    db
                    .collection('Matches')
                    .doc(id)
                    .update({predictionImage:url
                        })
                    .then(() => {
                        // console.log('Match Updated');
                        //set dates
                        var nowPlus10 = new Date();
                        nowPlus10.setMinutes((new Date()).getMinutes()-10)
                        var before1Month = new Date();
                        before1Month.setMonth(before1Month.getMonth() - 1);
                        before1Month.setHours(0, 0, 0, 0);
                        //get Matches
                        getMatches(before1Month,nowPlus10);
                        alert('Match Updated');
                    });
                });
                //reset input
                predictionImageRef.current.value = null;
                }
            );
    }


    return (
        <>
            <Navbar/>
            <div className="container">
                <div ><h2 className="text-center mt-3">{pageHeader}</h2></div>
                <div className="d-flex justify-content-center">
                    <input ref={inputDate1} type="date" className="form-control" style={{maxWidth: "370px"}}/>
                    <input ref={inputDate2} type="date" className="form-control ms-2" style={{maxWidth: "370px"}}/>
                    <a className="btn btn-info ms-2" onClick={()=>{updateList()}}>Get Data</a>
                </div>
                <Table striped bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Team Images</th>
                            <th>Prediction Image</th>
                            <th>Match Name</th>
                            <th>Match Type</th>
                            <th>Bet Type</th>
                            <th>Match Date</th>
                            <th>Bet Date</th>
                            <th>ODD</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        matchList.map((match,index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>
                                        <img src={match.team1Image} alt="Image not uploaded" width="50"/>
                                        <img src={match.team2Image} alt="Image not uploaded" width="50"/>
                                    </td>
                                    <td>
                                        <img src={match.predictionImage} alt="Image not uploaded" width="70"/>
                                        <div className="mb-3 row">
                                            <label  className="col-sm-4 col-form-label text-end"></label>
                                            <div className="col-sm-4">
                                                <input type="file" className="form-control" id="" ref={predictionImageRef} onChange={(e)=>{setPredictionImage(e.target.files[0])}}/>
                                                <span className="btn btn-primary" onClick={()=>uploadPredictionImage(match.id)}>Upload</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{match.matchTitle}</td>
                                    <td>{match.matchType}</td>
                                    <td>{match.betType}</td>
                                    <td>{match.matchDate ? moment(match.matchDate.toDate()).format('MMMM Do, h:mm a') : ''}</td>
                                    <td>{match.betDate ? moment(match.betDate.toDate()).format('MMMM Do, h:mm a') : ''}</td>
                                    <td>{match.odd}</td>
                                    <td>
                                        {match.status}
                                        <br/>
                                        <select onChange={(e)=> updateStatus(e.target.value,match.id)}>
                                            <option value="">--Select--</option>
                                            <option value="Win">Win</option>
                                            <option value="Lose">Lose</option>
                                        </select>
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

export default PastMatches;
import React,{useState,useRef,useEffect} from 'react';
import Navbar from './Navbar';
// import firebase from 'firebase/compat/app';
import {db,storage} from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { BallTriangle } from  'react-loader-spinner';
import Table from 'react-bootstrap/Table';

export default function News() {
    const [news , setNews] = useState([]);
    const [image , setImage] = useState();
    const [loading , setLoading] = useState(false);
    const imageRef = useRef(null);

    const [newsList, setNewsList] = useState([]);

    useEffect(()=>{
        getNewsFromFirebase();
    },[])

    function getNewsFromFirebase (){
        const li = [];
        db.collection('News')
        .orderBy("dateTime","desc")
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                li.push({...doc.data(),id:doc.id})
            });
            setNewsList(li);
        });
        // console.log('list '+li);
        // console.log('newsList'+newsList);
    }

    //Getting form data
    let name,value;
   const getNewsData = (event) =>{
        name = event.target.name;
        value = event.target.value;
        if(name==='trending'){
            // console.log('trending')
            value = event.target.checked;
        }
        //  console.log('getNewsData name '+name);
        //  console.log('getNewsData value '+value);
        setNews({...news,[name]:value});
        // console.log(news);
    }

    const uploadImage = () =>{
        if(image == null)
        return;
        setLoading(true) 
        const storageRef = ref(storage, `/NewsImages/${new Date()+image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // const percent = Math.round(
                //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                // );
                // // update progress
                // setPercent(percent);
            },
            (err) => {
                console.log(err)
                setLoading(false) 
            },
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // console.log(url);
                    setNews({...news,image:url})
                });
                //hide loading indicator
                setLoading(false) 
                //clear file selection
                imageRef.current.value = null;
                //clear form data
                setNews([])
                }
            );
    }

    const uploadNewsOnFirebase = () => {
        if(news.matchType && news.image && news.title && news.description){ 
            setLoading(true)   
            db.collection('News')
            .add({...news,dateTime: new Date()})
            .then((docref)=>{
                alert('News Saved Successfully') 
                setLoading(false)
                //reset data after uploadNewsOnFirebase
                setNews({title:'',description:'',image:'',matchType:'',trending:false})
                // console.log("news after upload data "+news)
            })
            .catch((err) => {
                console.log('error while saving news '+ err)
                setLoading(false)
            });
        }else{
            alert('Please fill all data')
        }
    }

   const deleteNews = (id) => {
   // console.log('deleteNews',id);
        db
        .collection('News')
        .doc(id)
        .delete()
        .then(() => {
            getNewsFromFirebase();
            alert('News deleted!');
        });
   }

  return (
    <>
   
    <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle={{}}
        visible={loading}
        />

        <Navbar/>
            <form>
                <div className="mb-3 row mt-5">
                    <label  className="col-sm-4 col-form-label text-end">Match type:</label>
                    <div className="col-sm-4">
                        <select className="form-control" value={news.matchType} name="matchType" onChange={getNewsData}>
                            <option value="">--Select--</option>
                            <option value="Baseball">Baseball</option>
                            <option value="Basketball">Basketball</option>
                            <option value="Counter Strike">Counter Strike</option>
                            <option value="Cricket">Cricket</option>
                            <option value="Football">Football</option>
                            <option value="Handball">Handball</option>
                            <option value="Ice Hockey">Ice Hockey</option>
                            <option value="Kabbadi">Kabbadi</option>
                            <option value="Rugby">Rugby</option>
                            <option value="Table Tennis">Table Tennis</option>
                            <option value="Tennis">Tennis</option>
                            <option value="Volleyball">Volleyball</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label  className="col-sm-4 col-form-label text-end">News Image:</label>
                    <div className="col-sm-4">
                        <img src={news.image} alt="Image not uploaded" width="100"/>
                        <input type="file" className="form-control" ref={imageRef} onChange={(e)=>{setImage(e.target.files[0])}}/>
                        <span className="btn btn-info mt-2" onClick={uploadImage}>Upload Image</span>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label  className="col-sm-4 col-form-label text-end">Title:</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="title" value={news.title} onChange={getNewsData}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label  className="col-sm-4 col-form-label text-end">Description:</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="description" value={news.description} onChange={getNewsData}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label  className="col-sm-4 col-form-label text-end">Trending:</label>
                    <div className="col-sm-4">
                        <input type="checkbox" className="" name="trending" checked={news.trending} onChange={getNewsData}/>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <span className="btn btn-info" onClick={uploadNewsOnFirebase}>Submit News</span>
                </div>
            </form>
            <Table striped bordered hover className="mt-5">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>SMatch Type</th>
                        <th>News Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
            {
                newsList.map((news,index) => (
                    <tr>
                        <td>{index+1}</td>
                        <td>{news.matchType}</td>
                        <td><img src={news.image} alt="Image not uploaded" width="50"/></td>
                        <td>{news.title}</td>
                        <td>{news.description}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => {if(window.confirm('Delete this news?')){deleteNews(news.id)};}}>Delete</button>
                        </td>
                    </tr>
                ))
            }
             </tbody>
         </Table>
    </>
  )
}

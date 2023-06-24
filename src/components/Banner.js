import React,{useEffect,useState,useRef} from 'react';
import Navbar from './Navbar';
import {db,storage} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";
import firebase from 'firebase/compat/app';

function Banner(props) {
    const inputRef = useRef(null);

    const [bannerList, setBannerList] = useState([]);
    // State to store uploaded file
    const [file, setFile] = useState("");
    // progress
    const [percent, setPercent] = useState(0);

    useEffect(()=>{
        getBanners();
    },[]);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }else{

            const storageRef = ref(storage, `/Slider Images/${new Date()+file.name}`);
    
            // progress can be paused and resumed. It also exposes progress updates.
            // Receives the storage reference and the file to upload.
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
    
                    // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        //console.log(url);
                        //Set to firebase database
                        db
                        .collection('BannerImages')
                        .add({
                        image: url,
                        dateTime : new Date()
                        })
                        .then(() => {
                        alert('Image added!');
                        //Set file to empty
                        setFile("");
                        inputRef.current.value = null;
                        });
                        //get Updated Data
                        getBanners ()
                    });
                
                    }
                );

        }
    };

    function getBanners(){
        const li = [];
        db.collection("BannerImages")
        .orderBy("dateTime","desc")
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               //console.log(`${doc.id} => ${doc.data()}`);
                li.push({...doc.data(),id:doc.id})
            });
            setBannerList(li);
        });
       // console.log(bannerList)
    }

    //for delete file from database and storage
    function deleteFile (banner){
        //delete from database
        db.collection('BannerImages')
        .doc(banner.id)
        .delete()
        .then(() => {
                //Delete file from firestore
                let pictureRef = ref(storage, banner.image);
                deleteObject(pictureRef)
                .then(() => {
                  alert("Picture is deleted successfully!");
                  //get Updated Data
                  getBanners ()
                })
                .catch((err) => {
                  alert("error while deleteFile :"+err.message);
                });
        });
        
    }
    return (
        <div>
            <Navbar/>
            <h1 className="text-center mb-5">Banner Images</h1>
            <div className="col text-center justify-content-center align-self-center" >
                <div className="d-flex justify-content-center mt-5">
                    <input style={{maxWidth:300}} className="form-control" type="file" onChange={handleChange} ref={inputRef} id="imageFile" accept="image/jpeg,image/png" />
                </div>
                <button className="btn btn-primary mt-2"onClick={handleUpload}>Upload to Firebase</button>
                <p className="text-center">{percent} "% done"</p>
            </div>
            
            <div className="container">
                
            {
               bannerList.map((banner,index)=>(
                <div className="">
                    <img src={banner.image} class="rounded mx-auto d-block img-fluid img-thumbnail mt-3" alt="...." width="500"/>
                    <div className="d-flex justify-content-center">
                        <span className="btn btn-outline-danger" onClick={()=>deleteFile(banner)}>Delete</span>
                    </div>
                    <hr/>
                </div>
                
                )) 
            }
            </div>
        </div>
    );
}

export default Banner;
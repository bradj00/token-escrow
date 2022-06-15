import React from 'react'
import { useEffect,useState,useContext } from 'react'
import { QrReader } from 'react-qr-reader';
import CancelIcon from '@mui/icons-material/Cancel';
import {generalContext} from '../App';
import { getEllipsisTxt } from '../helpers/formatters';
const ReadQrCode = () => {

    const [data, setData] = useState();
    const {showPage, setshowPage} = useContext(generalContext);

    useEffect(()=>{
        if(data){
            window.history.replaceState(null, "COOL BEANS", data)
            window.location.reload(false);
        }
    },[data])

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', fontSize:'5vh', zIndex:'99999', color:'#fff', position:'absolute', height:'100%', width:'100%', top:'0',left:'0',}}>
            <div style={{textAlign:'center', position:'absolute', width:'100%',height:'100%',}}>
                <div onClick={()=>{setshowPage('home')}} style={{cursor:'pointer', transform:'scale(1.5)', zIndex:'9999',position:'absolute',top:'-1vh',right:'3%',}}>
                    <CancelIcon />
                </div>
                <div style={{border:data? '3px solid #00ff00':'0px solid #fff',}}>
                <QrReader
                    onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }
            
                    if (!!error) {
                        // console.info(error);
                    } 
                    }}
                    constraints={{
                        facingMode: 'environment'
                    }}
                    style={{ width: '100%' }}
                />
                </div>
                <p style={{fontSize:'1.2vh'}}>{data? data: "Scan QR code"}</p>
            </div>
        </div>
    )
}

export default ReadQrCode 
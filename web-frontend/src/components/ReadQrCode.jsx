import React from 'react'
import { useEffect,useState } from 'react'
import { QrReader } from 'react-qr-reader';

const ReadQrCode = () => {
    const [data, setData] = useState('No result');
    
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', fontSize:'5vh', zIndex:'99999', color:'#fff', position:'absolute', height:'100%', width:'100%', top:'0',left:'0',}}>
            <div style={{textAlign:'center', position:'absolute', width:'100%',height:'100%',}}>
                <QrReader
                    onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }
            
                    if (!!error) {
                        // console.info(error);
                    }
                    }}
                    style={{ width: '100%' }}
                />
                <p>{data}</p>
            </div>
        </div>
    )
}

export default ReadQrCode 
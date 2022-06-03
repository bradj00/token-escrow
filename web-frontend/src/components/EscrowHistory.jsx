import React from 'react'

const EscrowHistory = () => {
  return (
    <div style={{userSelect:'none', position:'absolute', bottom:'32%', width:'100%', display:'flex', justifyContent:'center', color: '#fff', fontSize:'4vh', zIndex:'9999',}}>
        <div style={{textAlign:'center'}}>
            <div style={{fontSize:'3vh',}}>
                My Escrow History
            </div>
            <div style={{backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'5px', textAlign:'left', width:'95vw',height:'30vh',position:'fixed', left:'2.5vw', bottom:'2.5vw'}}>
                <div style={{padding:'2vh',fontSize:'2.5vh',}}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
            </div>
        </div>
    </div>
  ) 
}

export default EscrowHistory
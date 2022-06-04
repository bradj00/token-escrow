import React from 'react'

const EscrowHistory = () => {
  return (
    <div style={{userSelect:'none', position:'absolute', bottom:'32%', width:'100%', display:'flex', justifyContent:'center', color: '#fff', fontSize:'4vh', zIndex:'9999',}}>
        <div style={{textAlign:'center',position:'absolute', bottom:'-2vh',display:'flex', justifyContent:'center'}}>
            <div style={{fontSize:'3vh',position:'absolute', top:'-3.5vh',}}>
                Active Escrow
            </div>
            <div style={{backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'5px', textAlign:'left', width:'95vw',height:'25vh',}}>
                <div style={{padding:'2vh',fontSize:'2.5vh',}}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
            </div>
        </div>
        
        <div style={{textAlign:'center',position:'absolute',bottom:'-31vh',display:'flex', justifyContent:'center'}}>
            <div style={{fontSize:'3vh',position:'absolute', top:'-3.5vh',}}>
                Escrow History
            </div>
            <div style={{backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'5px', textAlign:'left', width:'95vw',height:'25vh',}}>
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
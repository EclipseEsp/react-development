import React, { Component } from 'react'



export default class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            text : null
        }
    }
    render() {
        return (
            <div style={{backgroundColor:"black",overflow:"auto",display:"block",color:"red",wordBreak: "break-all"}}>
                Testsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        {/*<body style={{borderColor:"black",color:"red",padding:"1px",margin:"1px"}} >hellossssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</body>*/}
            </div>
        )
    }
}

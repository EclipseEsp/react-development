import React, { Component } from 'react'
import openSocket from 'socket.io-client';


export default class SocketDemo extends Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    componentDidMount(){
        const socket = openSocket('http://localhost:8000');
        socket.on('news', (data) => {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
            socket.emit('my other event', { my: 'data2'});
        });
    }

    render() {
        return (
            <div>
                <h5>SocketDemo</h5>
            </div>
        )
    }
}

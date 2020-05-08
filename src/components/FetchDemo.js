import React, { Component } from 'react'

export default class FetchDemo extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: null
        }
    }
    // Actions taken after rendering the component in the Lifecycle
    componentDidMount() {
        const fetchurl = "/fetch";
        fetch(fetchurl)
        .then(res => res.text())
        .then(text => {
            console.log(text)
            this.setState({text})
        }
        , (err) => console.log(err)
        );
    }

    render() {
        const {text} = this.state;
        return (
            <div className="fetch">
                <h5 className="fetch-header">GET Request with Fetch</h5>
                <div className="fetch-body">
                    {this.state.text}
                </div>
            </div>
      );
    }
}

import React from 'react';

import { connect } from 'react-redux';


class Home extends React.Component {
    constructor(props) {
        super(props);
      

    }
 

    render() {
        return (
            <div>
                Home
            </div>
        );
    }
}


export default connect(
    state => ({
        name: state 
    }),
    dispath => ({
       
    }
    )
)(Home)
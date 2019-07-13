import React from 'react';

import { connect } from 'react-redux';


class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: props.name }

    }

    handleChange = (event) => {
        this.setState({ name: event.target.value });
    }


    handleSubmit = () => {
        this.props.newName(this.state.name);
    }

    render() {
        return (
            <div>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleChange} />
                </label>
                <button onClick={this.handleSubmit} > update </button>


            </div>
        );
    }
}


export default connect(
    state => ({
        name: state.name
    }),
    dispath => ({
        newName: (newName) => { dispath({ type: 'newname', name: newName }) }
    }
    )
)(Hello)

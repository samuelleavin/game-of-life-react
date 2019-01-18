import React, { Component } from 'react';

class Cell extends Component {
    getClassList = () => {
        return `cell ${this.props.isAlive ? '' : 'dead'}`
    }
    
    render() {
        return (
            <div className={this.getClassList()}></div>
        );
    }
}

export default Cell;
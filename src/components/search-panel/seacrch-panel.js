import React from 'react';

import './search-panel.css';

export default class SeacrchPanel extends React.Component{
    state ={
        term: ''
    }
    onUpdateSearch=(e)=>{
        const term = e.target.value;
        this.setState({term:term});
        this.props.onUpdateSearch(term);
    }
    render(){
        return(
            <input
                className='form-control search-input'
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onUpdateSearch}
            />
        )
    }
}
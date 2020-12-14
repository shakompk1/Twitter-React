import React from 'react';
import './post-status-filter.css';

export default class PostStatusFilter extends React.Component{
    state = {
        button : [
            {name:'all',label:'Все'},
            {name:'like',label:'Понравилось'}
        ]
    }
    render(){
        const buttons = this.state.button.map(({name,label})=>{
            const active  = this.props.filter === name;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary'
            return (
                <button 
                    key={name} 
                    type='button' 
                    onClick={()=>this.props.onFilterSelect(name)}
                    className={`btn ${clazz}`}>{label}</button>
            )
        })
        return(
            <div className='btn-group'>
                {buttons}
            </div>
        )
    }
}
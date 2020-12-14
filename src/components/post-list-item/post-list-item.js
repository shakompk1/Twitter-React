import React from 'react';

import './post-list-item.css';

export default class PostListItem extends React.Component{
           
    render(){
        const {label,important,like,onDelete,onToggleImportant,onToggleLiked} = this.props;
        let classNames = 'app-list-item d-flex justify-content-between'
        if(important){
            classNames += ' important'
        }
        if(like){
            classNames += ' like'
        }
        return(
            <div className={classNames}>
                <span className='app-list-item-label' onClick={onToggleLiked}>
                    {label}
                </span>
                <div className='d-flex justify-content-center align-items-center'>
                    <button 
                    onClick={onToggleImportant}
                    type='button'
                    className='btn-star btn-sm'>
                        <i className="fa fa-star"></i>
                    </button>
                    <button 
                    type='button'
                    className='btn-trash btn-sm'
                    onClick={onDelete}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        )
    }
}
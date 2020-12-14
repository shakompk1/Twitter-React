import React from 'react';

import AppHeader from '../app-header';
import SeacrchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';


export default class App extends React.Component{
    state ={
        data:[
            {label:'Going to learn React',important:true,like:false,id: 1},
            {label:'Thats is so good',important:false,like:false,id: 2},
            {label:'I need a break...',important:false,like:false,id: 3}
        ],
        term : '',
        filter: 'all',
        maxId : 4
    }
    deleteItem =(id)=>{
        this.setState(({data})=>{
            const index = data.findIndex(elem=>elem.id === id);
            const before = data.slice(0,index);
            const after = data.slice(index + 1);

            const newArr = [...before,...after];

            return{
                data:newArr
            }
        })
    }
    addItem =(body)=>{
        let {maxId} = this.state;
        const newItem ={
           label : body,
           important:false,
           id:  maxId++
        }
        this.setState(({data,maxId})=>{
            const newArr =[...data,newItem]
            return{
                data:newArr,
                maxId:++this.state.maxId
            }
        })
    }
    onToggleImportant =(id)=>{
        this.setState(({data})=>{
            const index = data.findIndex(elem=> elem.id === id);

            const old = data[index];
            const newItem ={...old,important:!old.important}

            const newArr= [...data.slice(0,index),newItem,...data.slice(index+1)]
            return{
                data: newArr
            }
        });
    }
    onToggleLiked =(id)=>{
        this.setState(({data})=>{
            const index = data.findIndex(elem=> elem.id === id);

            const old = data[index];
            const newItem ={...old,like:!old.like}

            const newArr= [...data.slice(0,index),newItem,...data.slice(index+1)]
            return{
                data: newArr
            }
        });
    }
    searchPost = (items,term)=> {
        if(term.length === 0){
            return items
        }
        
        return items.filter((item)=>{
            return item.label.indexOf(term) > -1
        })
    }
    filterPost = (items,filter)=>{
        if(filter ==='like'){
            return items.filter(item=>item.like)
        }else{
            return items
        }
    }
    onFilterSelect =(filter)=>{
        this.setState({filter})
    }
    onUpdateSearch = (term)=>{
        this.setState({term})
    }
    render(){
        const {data,term,filter} = this.state;
        const liked = data.filter(item=> item.like).length;
        const allPosts = this.state.data.length;
        const visiblePosts =this.filterPost(this.searchPost(data,term),filter);
        return (
            <div className='app'>
                <AppHeader like={liked} allPosts={allPosts}/>
                <div className='search-panel d-flex'>
                    <SeacrchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter 
                        filter={filter} 
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}
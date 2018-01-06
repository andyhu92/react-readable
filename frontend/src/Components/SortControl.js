import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import '../../node_modules/react-dropdown/style.css'

class SortControl extends Component{
    constructor(){
        super();
        this.allOptions = [
                {
                 id:1,
                 value: { sortBy:"voteScore",order:"desc"},
                 label: 'Max Vote Score First'
                }, {
                 id:2,
                 value: { sortBy:"voteScore",order:"asc"},
                 label: 'Min Vote Score First'
                }, {
                 id:3,
                 value: { sortBy:"timestamp",order:"desc"},
                 label: 'Latest First'
                }, {
                 id:4,
                 value: { sortBy:"timestamp",order:"asc"},
                 label: 'Oldest First'
                }
        ];
        this.state={
            currentOption:this.allOptions[0]
        }
    }


    onHandleChange = (option) => {
        this.setState({currentOption: option});
        let val = this.allOptions.filter(o => o.id === option.value)[0];
        this.props.onSort(val.value);
    }


    render(){
        const options = this.allOptions.map(o => ({
            value:o.id,
            label:o.label
        }))
        return (
            <div className="dropdown">
                <Dropdown onChange={this.onHandleChange} value={this.state.currentOption}
                 options={options}/>
            </div>
        )
    }
}

export default SortControl;
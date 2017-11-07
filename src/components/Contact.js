import React, { Component } from 'react';
import ContactInfo from './ContactInfo';

export default class Contact extends Component{
    constructor(props) {
      super(props);
      this.state = {
          keyword: '',
        contactData:[
          {name:'A', phone:'000-0000-0000'},
           {name:'B', phone:'111-0000-0000'},
           {name:'C', phone:'222-0000-0000'}
        ]
      }

      this.handleChange = this.handleChange.bind(this);

    }
    
    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    render() {
      
      const mapToComponent= (data) => {
        console.log(data);
            data.sort();
            data = data.filter((contact) =>{
                
                return contact.name.toLowerCase().indexOf(this.state.keyword) >  -1;
            } );
        return data.map((contact, i ) => {
          return(<ContactInfo contact={contact} key={i}/>)
        })
      }
      
      return(
     <div>
         <h1>Contacts</h1>
         <input
            name="keyword"
            placeholder="Search"
            value={this.state.keyword}
            onChange={this.handleChange}
         />
        <div>{mapToComponent(this.state.contactData)}</div>
        </div>
      );
    }
  }
  
  
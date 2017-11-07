import React, { Component } from 'react';
import ContactInfo from './ContactInfo';

export default class Contact extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        contactData:[
          {name:'A', phone:'000-0000-0000'},
           {name:'B', phone:'111-0000-0000'},
           {name:'C', phone:'222-0000-0000'}
        ]
      }
    }
    
    render() {
      
      const mapToComponent= (conData) => {
        return conData.map((contact, i ) => {
          return(<ContactInfo contact={contact} key={i}/>)
        })
      }
      
      return(
     <div>
        {mapToComponent(this.state.contactData)}
        </div>
      );
    }
  }
  
  
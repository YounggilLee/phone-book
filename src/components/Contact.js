import React, { Component } from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

export default class Contact extends Component{
    constructor(props) {
      super(props);
      this.state = {
          selectedKey: -1,
          keyword: '',
        contactData:[
          {name:'A', phone:'000-0000-0000'},
           {name:'B', phone:'111-0000-0000'},
           {name:'C', phone:'222-0000-0000'}
        ]
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.hanldeCreate = this.hanldeCreate.bind(this);
      this.hanldeRemove = this.hanldeRemove.bind(this);
      this.hanldeEdit = this.hanldeEdit.bind(this);

    }
    
    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        })

        console.log(key, "is selected");
    }

    hanldeCreate(contact) {
        console.log(contact);
        this.setState({
           contactData : update(this.state.contactData, { $push: [ contact ] })
        });
    }

    hanldeRemove() {
        if(this.state.selectedKey < 0){
            return;
        }
        this.setState({
            contactData : update(this.state.contactData, { $splice: [ [ this.state.selectedKey, 1 ] ] }),
            selectedKey: -1
        })
    }

  
    hanldeEdit(name, phone){
    this.setState({
     contactData: update(this.state.contactData,{[this.state.selectedKey]:{name: {$set: name},
        phone:{$set: phone}}})
    })
   }

    render() {
      
      const mapToComponent= (data) => {
      
            data.sort();
            data = data.filter((contact) =>{
                
                return contact.name.toLowerCase().indexOf(this.state.keyword) >  -1;
            } );
        return data.map((contact, i ) => {
          return(<ContactInfo contact={contact} key={i} onClick={() => this.handleClick(i)}/>)
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
                <ContactDetails isSelected={this.state.selectedKey !== -1}
                                contact={this.state.contactData[this.state.selectedKey]}
                                onRemove={this.hanldeRemove}
                                />
                <ContactCreate onCreate={this.hanldeCreate}/>
        </div>
      );
    }
  }
  
  
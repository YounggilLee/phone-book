import React, { Component } from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from 'react-addons-update';

export default class Contact extends Component{
    constructor(props) {
      super(props);
      this.state = {
          selectedKey: -1,
          keyword: '',
        contactData:[
           {name:'Merry', phone:'000-0000-0000'},
           {name:'Bill', phone:'111-0000-0000'},
           {name:'Scott', phone:'333-0000-0000'},
           {name:'Jack', phone:'444-0000-0000'}
           
        ]
      }

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.hanldeCreate = this.hanldeCreate.bind(this);
      this.hanldeRemove = this.hanldeRemove.bind(this);
      this.hanldeEdit = this.hanldeEdit.bind(this);

    }


    ///Local storage 
    // componentWillMount() {
    //     const contactData = localStorage.contactData;

    //     if(contactData) {
    //         this.setState({
    //             contactData: JSON.parse(contactData)
    //         })
    //     }
    // }

    // componentDidupdate(prevProps, prevState) {
    //     if(JSON.stringify(prevProps.contactData) !== JSON.stringify(this.state.contactData)){
    //         localStorage.contactData = JSON.stringify(this.state.contactData);
    //     }
    // }

    
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
                                onEdit={this.hanldeEdit}
                                />
                <ContactCreate onCreate={this.hanldeCreate}/>
        </div>
      );
    }
  }
  
  
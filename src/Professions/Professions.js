import React, { Component } from 'react'
import "antd/dist/antd.css";
import axios from 'axios';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';


import {
   Button, Modal,
    Input,Spin
  } from 'antd';
export class Professions extends Component {
    constructor(props) {
        super(props)
        
    }
      state = {
         showRegister: false,
        
         name:'',
         phoneno:'',
         area:'',
         city:'',
         pincode:'',
         categoryid:'',
         details:'',
         visible: false,
        _id:'',
         loaded:false, showCategorySpin:true,clickedCompany:0
         
      }
    handleCancel = e => {
        console.log(e);
        this.setState({
          showRegister: false
        });
      };
      showRegister = () => {
        this.setState({
          showRegister: true
        });
      };
     
      handleOk =async(e)=>{
        
        const { name, phoneno,area,city,pincode} = this.state
        const userInfo={name, phoneno,area,city,pincode}
        axios.post(`http://localhost:3000/notes/`,userInfo)
        .then(res => { 
        console.log(res)
          this.setState({ showRegister: false ,userInfo})
          
        
      })
      window.location.reload();
        }
        handleYes = (e,p) => {
          e.preventDefault()
          const user = {
            name: this.state.name, 
            phoneno: this.state.phoneno,
            area: this.state.area,
            city: this.state.city,
            pincode: this.state.pincode,
          };
          axios.put(`http://localhost:3000/notes/`+p._id,user)
              .then(res => console.log(res.data));
              this.setState({ visible: false ,user:""})
              window.location.reload();
        };
      
        handleNo = e => {
          console.log(e);
          this.setState({
            visible: false,name:"",phoneno:"",area:"",city:"",pincode:""
          });
        };
        edit=(e,p)=>{
          
          this.setState({
            visible: true,
          });
          axios.get('http://localhost:3000/notes/'+p._id)
          .then(response => {
              this.setState({ 
                name: response.data.name, 
                phoneno: response.data.phoneno,
                area: response.data.area,
                city: response.data.city,
              
                pincode: response.data.pincode
                });
               console.log(response.data)
              
          })

          .catch(function (error) {
              console.log(error);
          })
        }
        
        delete=(e,p)=> {
         
              axios.delete('http://localhost:3000/notes/'+p._id)
              .then(console.log('Deleted'))
              .catch(err => console.log(err))
              window.location.reload(); 
      }
        
        async componentDidMount() { 
    
        const Companies= await axios.get('http://localhost:3000/notes/')
                
        // console.log(Companies)
        this.setState({ loaded: true, Companies: Companies.data })  
      }

    render() {
        return (
            <div id="app">
          
            <div class="main-content">
              <section class="section" style={{backgroundColor:'#eee'}}>
                <div class="section-header" style={{ justifyContent: 'space-between' }}>
                  <h1>Professions</h1>
                    <Button type="primary" onClick={this.showRegister}>
                      ADD PROFESSIONS
                    </Button>
                </div>
           <div class="section-body">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h4>Company</h4>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table table-striped" id="table-1">
                          <thead>
                            <tr>
                              <th class="text-center">
                                #
                              </th>
                              <th>Name</th> 
                              <th>phone Number</th>

                              <th>Area</th>
                              <th>City</th>
                              <th>Pincode</th>

                            </tr>
                          </thead>

                           {
                             
                            
              !this.state.loaded?<tr ><td colSpan="10" style={{textAlign: 'center',verticalAlign: 'middle'}}>
              <Spin /></td></tr>:
            
              this.state.Companies.map((p,i)=>
               {
                return(
                  <tbody >
                  <tr>
                  <td>C{i+1}</td>
                  

                  <td>{p.name}</td>

                    <td >Contact: {p.phoneno}</td>
                    <td>Location:{p.area}</td>
                    <td>City:{p.city}</td>
                    <td>Pincode:{p.pincode}</td>
                    <td>
                      <button type="button" onClick={e => this.edit( e,p)}>Edit</button>
                    </td>
                    <td>
                      <button type="submit" onClick={e => this.delete( e,p)} >Delete</button>
                    </td>
                </tr>
                  </tbody>
               )
               }
               )
             }  
                       </table>
                  </div>
                  </div>
                 </div>
               </div>
            </div>
          </div> 
          
                    <Modal
              title="ADD Details"
              visible={this.state.showRegister}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={[
                <Button key="save" type="primary" onClick={this.handleOk}>
                  Save
              </Button>,
                <span style={{ marginRight: 100 }} />,
                <Button key="cancel" onClick={this.handleCancel}>
                  CANCEL
              </Button>,
                <span style={{ marginRight: 100 }} />
              ]}
            >
                 <p>Name</p>
              <p>
                <Input
                  onChange={e => this.setState({ name: e.target.value })}
                  value={this.state.name}
                  name="name"
                />
              </p>
              <p>Phone Number</p>
              <p>
                <Input
                  onChange={e => this.setState({ phoneno: e.target.value })}
                  value={this.state.phoneno}
                  name="phoneno"
                  pattern="{0-9}{10}"
                
                />
              </p>
              <p>Area</p>
              <p>
                <Input
                  onChange={e => this.setState({ area: e.target.value })}
                  value={this.state.area}
                  name="area"
                  
                />
              </p>
              <p>City</p>
              <p>
                <Input
                  onChange={e => this.setState({ city: e.target.value })}
                  value={this.state.city}
                  name="city"
                  
                />
              </p>
              <p>Pin code</p>
              <p>
                <Input
                  onChange={e => this.setState({ pincode: e.target.value })}
                  value={this.state.pincode}
                  name="pincode"
               
                />
              </p> 
             

            </Modal>
            <div>
            {!this.state.loaded?<tr ><td colSpan="10" style={{textAlign: 'center',verticalAlign: 'middle'}}>
              <Spin /></td></tr>:
              this.state.Companies.map((p)=>{return(
            <Modal
              title="Edit"
              visible={this.state.visible}
              onOk={this.handleYes}
              onCancel={this.handleNo}
              footer={[ 
                <Button key="save" type="primary" onClick={e => this.handleYes( e,p)}>
                  UPDATE
              </Button>,
                <span style={{ marginRight: 100 }} />,
                <Button key="cancel" onClick={this.handleNo}>
                  CANCEL
              </Button>,
                <span style={{ marginRight: 100 }} />
              ]}
            
            >
                 <p>Name</p>
              <p>
                <Input
                  onChange={e => this.setState({ name: e.target.value })}
                  value={this.state.name}
                  name="name"
                />
              </p>
              <p>Phone Number</p>
              <p>
                <Input
                  onChange={e => this.setState({ phoneno: e.target.value })}
                  value={this.state.phoneno}
                  name="phoneno"
                  pattern="{0-9}{10}"
                
                />
              </p>
              <p>Area</p>
              <p>
                <Input
                  onChange={e => this.setState({ area: e.target.value })}
                  value={this.state.area}
                  name="area"
                  
                />
              </p>
              <p>City</p>
              <p>
                <Input
                  onChange={e => this.setState({ city: e.target.value })}
                  value={this.state.city}
                  name="city"
                  
                />
              </p>
              <p>Pin code</p>
              <p>
                <Input
                  onChange={e => this.setState({ pincode: e.target.value })}
                  value={this.state.pincode}
                  name="pincode"
               
                />
              </p> 
             

            </Modal>
            )})}</div>
           
            </section>
             
            </div>
          </div>
        )
    }
}

export default Professions
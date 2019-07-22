import React, { Component } from "react";
import { Spin } from "antd";
import axios from 'axios';
import checkAuth from '../auth/checkAuth'
export class Newprof extends Component {
  state = { visible: false, verify: 'Verify', loaded:false, 
  
  showCategorySpin:true,clickedCompany:0 };

  async componentDidMount() { 
    const token = await checkAuth()
   
    if(token===null) {
      this.props.history.push('/login')
    }
  const Companies= await axios.get('/viewProfession', {
    headers: { token }})
          console.log(token)
          console.log(Companies)
          this.setState({ loaded: true, Companies: Companies.data.details })  
}

//   handleCompanyClick = async (id)=>{
//     this.setState({showCategorySpin:true})
//     const token = await localStorage.getItem('wdm_dskd')
//     if (token) {
//       try {
//         const Companies = await axios.get('/oneCompanyCategories/?company_id='+id, {
//           headers: { token }
//         })

        
//         if (Companies) {
//           // console.log(token)
//           // console.log(Companies.data)
//           this.setState({ showCategorySpin: false,
//              Category: Companies.data.finalCategory,
//              clickedCompany:id })
//         }
//       }
//       catch (err) {
//         alert('something went wrong')
//         console.log(err)
//       }
//     }
//     else {

//     }
//   }


  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  //Modal
  render() {
    return (
      <div id="app">
        <div class="main-content">
          <section class="section">
            <div class="section-header" style={{ justifyContent: 'space-between' }}>
              <h6>Wefactor > Company</h6>
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
                              <th>Phone Number</th>
                              <th>Area</th>
                              <th>City</th>
                              <th>Pin code</th>

                            </tr>
                          </thead>
                          
                        
            {
              !this.state.loaded?<tr ><td colSpan="10" style={{textAlign: 'center',verticalAlign: 'middle'}}>
              <Spin /></td></tr>:
              this.state.Companies.map((p,i)=>{
                return(
                  <tbody>
                  <tr>
                  <td>C{i+1}</td>

                  <td>{p.name}</td>

                    <td>Contact: {p.phoneno}</td>
                    <td>area:{p.area}
</td>
                    <td>city:{p.city}</td>
                    <td>
                  <div class="card-header-action">

                  </div>

                </td>
                </tr>
                <div class="mr-3">
            <a class="btn btn-light btn-action mr-1" ><i class="fas fa-pencil-alt"></i></a>
            <a class="btn btn-light btn-action"  data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')"><i class="fas fa-trash"></i></a>
          </div>
                   
                  </tbody>
                )
              })
            }

                                   
                        </table>



                      </div>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </section>
        </div>
        <footer class="main-footer">
          <div class="footer-left">
            Wefactor  Copyright &copy; 2019 <div class="bullet"></div>
          </div>
          <div class="footer-right">
            Design By <a href="https://thebluesconsultants.com">The Blues Consultants</a>
          </div>
        </footer>
      </div>

    );
  }
}

export default Newprof;
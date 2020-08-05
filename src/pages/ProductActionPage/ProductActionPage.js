import React, { Component } from 'react';
import callAPI from './../../utils/APICaller'
import { Link } from 'react-router-dom';


class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        }
    }

    componentDidMount(){
        let {match} = this.props;
        if(match){
            let id = match.params.id;
            callAPI(`products/${id}`, 'GET', null).then(res => {
                let data = res.data;
                this.setState({
                    id: data.id,
                    txtName: data.name,
                    txtPrice: data.price,
                    chkbStatus: data.status
                })
            });
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }

    onSave = (e) => {
        let {id, txtName, txtPrice, chkbStatus} = this.state;
        e.preventDefault();
        let {history} = this.props
        
        if(id){
            // method PUT
            callAPI(`products/${id}`, 'PUT', {
                name: txtName,
                price: txtPrice,
                status: chkbStatus,
            }).then(res => {
                history.goBack()
            })
        }else{
            callAPI('products', 'POST', {
                name: txtName,
                price: txtPrice,
                status: chkbStatus,
            }).then(res => {
                history.goBack()
            })
        }
        
    }


    render() {
        let { txtName, txtPrice, chkbStatus } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label >Tên sản phẩm</label>
                        <input
                            type="text"
                            className="form-control"
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange} />

                    </div>
                    <div className="form-group">
                        <label >Giá</label>
                        <input
                            type="number"
                            className="form-control"
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange} />

                    </div>
                    <div className="form-group">
                        <label >Trạng thái</label>
                    </div>

                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="chkbStatus"
                                value={chkbStatus}
                                onChange={this.onChange} 
                                checked={chkbStatus}/>

                            Còn hàng
                        </label>
                    </div>
                    <Link to="/product-list" className="btn btn-danger mr-10" >
                        Trở lại
                    </Link>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </form>

            </div>
        )
    }
}

export default ProductActionPage;

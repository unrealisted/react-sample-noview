import React from "react";
import ReactDOM from "react-dom";

var pathname = window.location.pathname;  

var Item = React.createClass({

	getInitialState: function(){
		return {
		  data: ""
		};
	},

	componentDidMount: function(){
	    this.serverRequest = $.get(this.props.source, function (result) {
			this.setState({
				data: result
			});
	    }.bind(this));
	},

	componentWillUnmount: function() {
	    this.serverRequest.abort();
	},


	render: function(){
		if(!! this.state.data){
			return(
				<div class="row">
					<div class="logo_background">
						<h1><a href="/">Mobile Store</a></h1>
					</div>
					<div class="col-lg-12">
						<table class="table table_item">
							<tbody>
								{
					              this.state.data.data.map((item) => {
					                return  <div>
					                			<tr>
						                			<td colSpan="2"><b>{item.yml_catalog.shop.offers.offer.name}</b></td>
						                		</tr>
						                		<tr>
						                			<td colSpan="2" class="table_item_img"><img width="120" src={ Array.isArray(item.yml_catalog.shop.offers.offer.picture) ? item.yml_catalog.shop.offers.offer.picture[0] : item.yml_catalog.shop.offers.offer.picture}/></td>
						                		</tr>
						                		<tr>
						                			<td>Цена: </td><td>{item.yml_catalog.shop.offers.offer.price + "руб."}</td>
						                		</tr>
						                		{item.yml_catalog.shop.offers.offer.param.map((par) => {
													return <tr><td>{par._name + ":"}</td><td>{par.__text}</td></tr>
												})}
						                		
					                		</div>
					              })
					            }
							</tbody>
						</table>
					</div>
				</div>
			);
		}
		else{
			return (
				<div class="spinner">
				  <div class="double-bounce1"></div>
				  <div class="double-bounce2"></div>
				</div>
			);
		}
	}
});

if(typeof window !== 'undefined') {
	const app = document.getElementById('app');
	ReactDOM.render(<Item source={"/api" + pathname} />,app);
}
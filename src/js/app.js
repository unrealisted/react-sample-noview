import React from "react";
import ReactDOM from "react-dom";



var App = React.createClass({

	getInitialState: function(){
		return {
		  categories: ""
		};
	},

	componentDidMount: function(){
	    this.serverRequest = $.get(this.props.source, function (result) {
			this.setState({
				categories: result
			});
	    }.bind(this));
	},

	componentWillUnmount: function() {
	    this.serverRequest.abort();
	},

	render: function(){
		let hrefs = ['./smartphones', './mobilephones', './radiophones', './smartwatches'];
		if(!! this.state.categories){
			return(
				<div class="row">
					<div class="logo_background">
						<h1>Mobile Store</h1>
					</div>
					<div class="col-lg-12">
						{!!this.state.categories ?
			              this.state.categories.categories.map((item, index) => {
			                return <div class="row catalog_buttons"><a role="button" class="btn btn-green" href={hrefs[index]}>{item.yml_catalog.shop.categories.category.__text}</a></div>
			              }) : <p>Loading . . .</p>
			            }
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
	ReactDOM.render(<App source={"/api/categories"} />,app);
}
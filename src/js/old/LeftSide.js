import React from "react";
import ReactDOM from "react-dom";


export default class LeftSide extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let id = this.props.viewItem;
		let catalog = this.props.catalog.yml_catalog.shop.offers.offer;
		let item;
		catalog.filter((curr) => {
			return curr._id == this.props.viewItem ? item = curr : null;
		});

		return(
			<div class="col-lg-4">
				<table class="table description_table">
					<tbody>
						<tr><td colSpan="2"><h3>{item.name}</h3></td></tr>
						<tr><td colSpan="2"><img width="50%" src={ Array.isArray(item.picture) ? item.picture[0] : item.picture}/></td></tr>
						<tr><td><h3>Цена: </h3></td><td><h3>{item.price + " руб."}</h3></td></tr>
						{item.param.map((par) => {
							return <tr><td>{par._name}</td><td>{par.__text}</td></tr>
						})}
						
					</tbody>
				</table>
			</div>
		)
	}
}

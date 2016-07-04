import React from "react";
import LeftSide from "./LeftSide";

export default class RightSideContentItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let item = this.props.item;
		return (
				<tr>
					<td class="table_item_img"><img width="80" src={ Array.isArray(item.picture) ? item.picture[0] : item.picture}/></td>
					<td>{item.name}</td>
					<td>{item.price + " руб."}</td>
					<td><button class="btn btn-default" onClick={this.props.addToView.bind(this)} value={this.props.item._id}>Подробнее</button></td>
					<td><button class="btn btn-default" id={"btn-compare-" + item._id} onClick={this.props.addToCompare.bind(this)} value={this.props.item._id}>Добавить</button></td>
				</tr>
		)
	}
}

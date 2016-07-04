import React from "react";

export default class RightSideCompare extends React.Component {
	constructor(props){
		super(props);
	}


	 
	render(){
		let compareItems = this.props.compareItems;

		console.log(this.props.compareItems);
		return(
			<div>
				<table class="table compareTable">
					<tbody>
						<tr>
							<th>Модель</th>
							{compareItems.map((item) => {
								return <td>{item.name}</td>
							})}
						</tr>
						<tr>
							<th></th>
							{compareItems.map((item) => {
								return <td><img width="80" src={ Array.isArray(item.picture) ? item.picture[0] : item.picture}/></td>
							})}
						</tr>
						<tr>
							<th>Цена</th>
							{compareItems.map((item) => {
								return <td>{item.price + " руб."}</td>
							})}
						</tr>
						<tr>
							<th>Производитель</th>
							{compareItems.map((item) => {
								return <td>{item.vendor}</td>
							})}
						</tr>
						<tr>
							<th>Цвет</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Цвет" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Комплектация</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Комплектация" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Размеры, мм</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Размеры, мм" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Гарантия</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Гарантия" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Год выпуска</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Год выпуска" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Страна-изготовитель</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Страна-изготовитель" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Процессор</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Процессор" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Видеопроцессор</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Видеопроцессор" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Диагональ</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Диагональ" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Разрешение</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Разрешение" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Число SIM-карт</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Число SIM-карт" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Встроенная память, ГБ</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Встроенная память, ГБ" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Оперативная память, МБ</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Оперативная память, МБ" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Операционная система</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Операционная система" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Макс. время работы, ч</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Макс. время работы, ч" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th>Емкость аккумулятора, мАч</th>
							{
								compareItems.map((item) => {
									return item.param.map((curr) => {
										return curr._name == "Емкость аккумулятора, мАч" ? <td>{curr.__text}</td> : null
									})
								})
							}
						</tr>
						<tr>
							<th></th>
							{compareItems.map((item) => {
								return <td><button class="btn btn-default" onClick={this.props.deleteFromCompare.bind(this)} value={item._id}>Удалить</button></td>
							})}
							
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}
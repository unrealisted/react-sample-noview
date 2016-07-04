import React from "react";
import ReactDOM from "react-dom";

var path = window.location.pathname;

var url = document.URL;
var params = "";
url.indexOf('?') !== -1 ? params = url.substring(url.indexOf('?'), url.length) : params = "";
var paginationUrl = url;


var ListItem = React.createClass({

	getInitialState: function(){
		return {
		  data: "",
		  original: "",
		  search: "",
		  filterByLowerPrice : 0,
		  filterByHigherPrice : 9999999,
		  itemPerPage: 40,
		  pages: 0
		};
	},

	componentDidMount: function(){
	    this.serverRequest = $.get(this.props.source, function (result) {
	    	var page = result.page;
			this.setState({
				data: result.data.slice((page-1) * this.state.itemPerPage, page*this.state.itemPerPage),
				pages: Math.ceil(result.data.length / this.state.itemPerPage)
			});
	    }.bind(this));
	    this.serverRequest = $.get(this.props.original, function (result) {
			this.setState({
				original: result
			});
	    }.bind(this));
	},



	componentWillUnmount: function() {
	    this.serverRequest.abort();
	},

	updateSearch: function(event){
		this.setState({search: event.target.value})
	},

	lowerPriceFilter: function(event){
		if(event.target.value == 0)
			this.setState({filterByLowerPrice: 0});
		else
		{
			let lowerPrice = parseInt(event.target.value);
			this.setState({filterByLowerPrice: lowerPrice});
		}
	},

	higherPriceFilter: function(event){
		if(event.target.value == 0)
			this.setState({filterByHigherPrice: 999999});
		else
		{
			let higherPrice = parseInt(event.target.value);
			this.setState({filterByHigherPrice: higherPrice});
		}
	},

	render: function(){
		let data = this.state.data;
		let original = this.state.original;

		let seatchInCatalog = !! data ? data.filter((item) => {
			 return item.yml_catalog.shop.offers.offer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 && item.yml_catalog.shop.offers.offer.price < this.state.filterByHigherPrice && item.yml_catalog.shop.offers.offer.price > this.state.filterByLowerPrice;
		}) : data;
		


		//Create vendors array
		let vendors = !! original ? original.data.map((item) => {
			 return item.yml_catalog.shop.offers.offer.vendor;
		}) : original;
		//Delete duplicates elements in vendor array
		vendors = unique(vendors);
		//Sort vendors array by ABC
		vendors = vendors.sort(function(a,b){
			return a < b ? -1 : 1;
		});

		//Create color array
		let colors = [];
		!! original ? original.data.map((item) => {
			 return item.yml_catalog.shop.offers.offer.param.filter((par) => {
				return par._name == "Цвет" ? colors.push(par.__text) : null;
			});
		}) : original;
		colors = unique(colors);
		colors = colors.sort();

		//Creat country array
		let country = [];
		!! original ? original.data.map((item) => {
			 return item.yml_catalog.shop.offers.offer.param.filter((par) => {
				return par._name == "Страна-изготовитель" ? country.push(par.__text) : null;
			});
		}) : original;
		country = unique(country);
		country.sort();

		//Function of duplicates elements
		function unique(list) {
		    var result = [];
		    $.each(list, function(i, e) {
		        if ($.inArray(e, result) == -1) result.push(e);
		    });
		    return result;
		}

		let urlPages = [];
		for (var i = 1; i < this.state.pages + 1; i++) {
			urlPages.push(i);
		}


		function replacePageUrl(page){
			let key = "page=";
			let findPagePrams = paginationUrl.substring(paginationUrl.indexOf("page="), 0);
			if(paginationUrl.indexOf("?") == -1)
				return paginationUrl + "?" + key + page;	
			else
			{
				if(paginationUrl.includes("page="))
					return findPagePrams + key + page;	
				else
					return paginationUrl + "&" +  key + page;
			}
		}


		if(!! original){
			return(
			 <div class="row">
			 	<div class="logo_background">
					<h1><a href="/">Mobile Store</a></h1>
				</div>
				<div class="col-lg-12">
					<div class="form-group">
					  <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} class="form-control" placeholder="Search" />
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div class="row">
								<div class="col-lg-2">
									<h4>Цена:</h4>
									<p><input onChange={this.lowerPriceFilter.bind(this)} type="number" min="0" placeholder="от" class="form-control" /></p>
									<p><input onChange={this.higherPriceFilter.bind(this)}  type="number" min="0" placeholder="до" class="form-control" /></p>
								</div>	
							</div>
						</div>
						<form>
							<div class="col-lg-4">
								<h4>Марка</h4>
								<div class="vendors_list">
								
									{
										vendors.map((item, index) => {
											return <p><input type="radio" name="vendor" value={item} /> {item}</p>
										})
									}
								</div>
							</div>
							<div class="col-lg-4">
								<h4>Цвет</h4>
								<div class="vendors_list">
								
									{
										colors.map((item, index) => {
											return <p><input type="radio" name="color" value={item} /> {item}</p>
										})
									}
									
								</div>
							</div>
							<div class="col-lg-4">
								<h4>Изготовитель</h4>
								<div class="vendors_list">
								
									{
										country.map((item, index) => {
											return <p><input type="radio" name="country" value={item} /> {item}</p>
										})
									}
									
								</div>
							</div>
							<div class="col-lg-12 buttons">
								<input type="submit" class="btn btn-default" value="Поиск" />
								<input type="submit" class="btn btn-default" value="Сброс" />
							</div>
						</form>
					</div>
					<div class="col-lg-12">
						<table class="table-striped">
							<thead>
								<tr>
									<th>Фото</th>
									<th>Модель</th>
									<th>Цена</th>
									<th></th>
								</tr>
							</thead>
							<tbody>

								{!!seatchInCatalog ?
					              seatchInCatalog.map((item) => {
					                return  <tr><td><img width="80" src={Array.isArray(item.yml_catalog.shop.offers.offer.picture) ? item.yml_catalog.shop.offers.offer.picture[0] : item.yml_catalog.shop.offers.offer.picture}/></td>
												<td>{item.yml_catalog.shop.offers.offer.name}</td>
												<td>{item.yml_catalog.shop.offers.offer.price}</td>
												<td><a class="btn btn-green" role="button" href={path + "/" + item.yml_catalog.shop.offers.offer._id}>Подробнее</a></td>
											</tr>
					              }) : seatchInCatalog
					            }
							</tbody>
						</table>
						
			        </div>
			        <nav>
					  <ul class="pagination">
					  {
					  	urlPages.map((page) => {
					  		return <li><a href={replacePageUrl(page)}>{page}</a></li>
					  	})
					  }
					  </ul>
					</nav>
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
	ReactDOM.render(<ListItem original={"/api" + path} source={"/api" + path + params} />,app);
}
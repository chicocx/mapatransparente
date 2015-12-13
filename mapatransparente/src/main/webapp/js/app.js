var map, featureList, boroughSearch = [], saudeSearch = [], educacaoSearch = [], segurancaSearch = [];

$(window).resize(function() {
	sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
	$(document).off("mouseout", ".feature-row", clearHighlight);
	sidebarClick(parseInt($(this).attr("id"), 10));
});

$(document).on("mouseover", ".feature-row", function(e) {
	highlight.clearLayers().addLayer(L.circleMarker([$(this).attr("lat"), $(this).attr("lng")], highlightStyle));
});

$(document).on("mouseout", ".feature-row", clearHighlight);

$("#about-btn").click(function() {
	$("#aboutModal").modal("show");
	$(".navbar-collapse.in").collapse("hide");
	return false;
});

$("#legend-btn").click(function() {
	$("#legendModal").modal("show");
	$(".navbar-collapse.in").collapse("hide");
	return false;
});

$("#login-btn").click(function() {
	$("#loginModal").modal("show");
	$(".navbar-collapse.in").collapse("hide");
	return false;
});

$("#list-btn").click(function() {
	$('#sidebar').toggle();
	map.invalidateSize();
	return false;
});

$("#nav-btn").click(function() {
	$(".navbar-collapse").collapse("toggle");
	return false;
});

$("#sidebar-toggle-btn").click(function() {
	$("#sidebar").toggle();
	map.invalidateSize();
	return false;
});

$("#sidebar-hide-btn").click(function() {
	$('#sidebar').hide();
	map.invalidateSize();
});

function sizeLayerControl() {
	$(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
	highlight.clearLayers();
}

function sidebarClick(id) {
	var layer = markerClusters.getLayer(id);
	map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
	layer.fire("click");
	/* Hide sidebar and go to the map on small screens */
	if (document.body.clientWidth <= 767) {
		$("#sidebar").hide();
		map.invalidateSize();
	}
}

function syncSidebar() {
	/* Empty sidebar features */
	$("#feature-list tbody").empty();
	/* Loop through saudes layer and add only features which are in the map bounds */
	saudes.eachLayer(function (layer) {
		if (map.hasLayer(saudeLayer)) {
			if (map.getBounds().contains(layer.getLatLng())) {
				$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NOME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
			}
		}
	});
	/* Loop through educacoes layer and add only features which are in the map bounds */
	educacoes.eachLayer(function (layer) {
		if (map.hasLayer(educacaoLayer)) {
			if (map.getBounds().contains(layer.getLatLng())) {
				$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NOME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
			}
		}
	});
	segurancas.eachLayer(function (layer) {
		if (map.hasLayer(segurancaLayer)) {
			if (map.getBounds().contains(layer.getLatLng())) {
				$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NOME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
			}
		}
	});
	/* Update list.js featureList */
	featureList = new List("features", {
		valueNames: ["feature-name"]
	});
	featureList.sort("feature-name", {
		order: "asc"
	});
}

/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
	maxZoom: 19,
	subdomains: ["otile1", "otile2", "otile3", "otile4"],
	attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
	maxZoom: 18,
	subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
	attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
	maxZoom: 18,
	subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
	maxZoom: 19,
	subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
	attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);

/* Overlay Layers */
var highlight = L.geoJson(null);
var highlightStyle = {
		stroke: false,
		fillColor: "#00FFFF",
		fillOpacity: 0.7,
		radius: 10
};

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
	spiderfyOnMaxZoom: true,
	showCoverageOnHover: false,
	zoomToBoundsOnClick: true,
	disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove saudes to markerClusters layer */
var saudeLayer = L.geoJson(null);
var saudes = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: "img/theater.png",
				iconSize: [24, 28],
				iconAnchor: [12, 28],
				popupAnchor: [0, -25]
			}),
			title: feature.properties.NOME,
			riseOnHover: true
		});
	},
	onEachFeature: function (feature, layer) {
		if (feature.properties) {
			var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NOME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADDRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
			layer.on({
				click: function (e) {
					$("#feature-title").html(feature.properties.NOME);
					$("#feature-info").html(content);
					$("#featureModal").modal("show");
					highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
				}
			});
			$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/theater.png"></td><td class="feature-name">' + layer.feature.properties.NOME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
			saudeSearch.push({
				name: layer.feature.properties.NOME,
				address: layer.feature.properties.ADDRESS1,
				source: "Saudes",
				id: L.stamp(layer),
				lat: layer.feature.geometry.coordinates[1],
				lng: layer.feature.geometry.coordinates[0]
			});
		}
	}
});
$.getJSON("data/saude.geojson", function (data) {
	saudes.addData(data);
	map.addLayer(saudeLayer);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove educacoes to markerClusters layer */
var educacaoLayer = L.geoJson(null);
var educacoes = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: "img/museum.png",
				iconSize: [24, 28],
				iconAnchor: [12, 28],
				popupAnchor: [0, -25]
			}),
			title: feature.properties.NOME,
			riseOnHover: true
		});
	},
	onEachFeature: function (feature, layer) {
		if (feature.properties) {
			var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NOME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
			layer.on({
				click: function (e) {
					$("#feature-title").html(feature.properties.NOME);
					$("#feature-info").html(content);
					$("#featureModal").modal("show");
					highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
				}
			});
			$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NOME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
			educacaoSearch.push({
				name: layer.feature.properties.NOME,
				address: layer.feature.properties.ADRESS1,
				source: "Educacoes",
				id: L.stamp(layer),
				lat: layer.feature.geometry.coordinates[1],
				lng: layer.feature.geometry.coordinates[0]
			});
		}
	}
});
$.getJSON("data/educacao.geojson", function (data) {
	educacoes.addData(data);
});

/* Empty layer placeholder to add to layer control for listening when to add/remove SEGURANCA to markerClusters layer */
var segurancaLayer = L.geoJson(null);
var segurancas = L.geoJson(null, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.icon({
				iconUrl: "img/museum.png",
				iconSize: [24, 28],
				iconAnchor: [12, 28],
				popupAnchor: [0, -25]
			}),
			title: feature.properties.NOME,
			riseOnHover: true
		});
	},
	onEachFeature: function (feature, layer) {
		if (feature.properties) {
			var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Nome</th><td>" + feature.properties.NOME + "</td></tr>" + "<tr><th>URL</th><td>" + feature.properties.URL + "</td></tr>" + "<tr><th>Endereco</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
			layer.on({
				click: function (e) {
					$("#feature-title").html(feature.properties.NOME);
					$("#feature-info").html(content);
					$("#featureModal").modal("show");
					highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
				}
			});
			$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NOME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
			segurancaSearch.push({
				nome: layer.feature.properties.NOME,
				address: layer.feature.properties.ADRESS1,
				source: "Segurancas",
				id: L.stamp(layer),
				lat: layer.feature.geometry.coordinates[1],
				lng: layer.feature.geometry.coordinates[0]
			});
		}
	}
});
$.getJSON("data/seguranca.geojson", function (data) {
	segurancas.addData(data);
});

map = L.map("map", {
	zoom: 15,
	center: [-16.676798, -49.261368],
	layers: [mapquestOSM, markerClusters, highlight],
	zoomControl: false,
	attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
	if (e.layer === saudeLayer) {
		markerClusters.addLayer(saudes);
		syncSidebar();
	}
	if (e.layer === educacaoLayer) {
		markerClusters.addLayer(educacoes);
		syncSidebar();
	}
	if (e.layer === segurancaLayer) {
		markerClusters.addLayer(segurancas);
		syncSidebar();
	}
});

map.on("overlayremove", function(e) {
	if (e.layer === saudeLayer) {
		markerClusters.removeLayer(saudes);
		syncSidebar();
	}
	if (e.layer === educacaoLayer) {
		markerClusters.removeLayer(educacoes);
		syncSidebar();
	}
	if (e.layer === segurancaLayer) {
		markerClusters.removeLayer(segurancas);
		syncSidebar();
	}
});

/* Filter sidebar feature list to only show features in current map bounds */
map.on("moveend", function (e) {
	syncSidebar();
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
	highlight.clearLayers();
});

/* Attribution control */
function updateAttribution(e) {
	$.each(map._layers, function(index, layer) {
		if (layer.getAttribution) {
			$("#attribution").html((layer.getAttribution()));
		}
	});
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
	position: "bottomright"
});
attributionControl.onAdd = function (map) {
	var div = L.DomUtil.create("div", "leaflet-control-attribution");
	div.innerHTML = "<span class='hidden-xs'>Developed by <a href='http://bryanmcbride.com'>bryanmcbride.com</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
	return div;
};
map.addControl(attributionControl);

var zoomControl = L.control.zoom({
	position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
	position: "bottomright",
	drawCircle: true,
	follow: true,
	setView: true,
	keepCurrentZoomLevel: true,
	markerStyle: {
		weight: 1,
		opacity: 0.8,
		fillOpacity: 0.8
	},
	circleStyle: {
		weight: 1,
		clickable: false
	},
	icon: "fa fa-location-arrow",
	metric: false,
	strings: {
		title: "My location",
		popup: "You are within {distance} {unit} from this point",
		outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
	},
	locateOptions: {
		maxZoom: 18,
		watch: true,
		enableHighAccuracy: true,
		maximumAge: 10000,
		timeout: 10000
	}
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
	var isCollapsed = true;
} else {
	var isCollapsed = false;
}

var baseLayers = {
		"Street Map": mapquestOSM,
		"Aerial Imagery": mapquestOAM,
		"Imagery with Streets": mapquestHYB
};

var groupedOverlays = {
		"Áreas de interesse": {
			"<img src='img/theater.png' width='24' height='28'>&nbsp;Saúde": saudeLayer,
			"<img src='img/museum.png' width='24' height='28'>&nbsp;Educação": educacaoLayer,
			"<img src='img/museum.png' width='24' height='28'>&nbsp;Segurança": segurancaLayer
		}
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
	collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
	$(this).select();
});

/* Prevent hitting enter from refreshing the page */
$("#searchbox").keypress(function (e) {
	if (e.which == 13) {
		e.preventDefault();
	}
});

$("#featureModal").on("hidden.bs.modal", function (e) {
	$(document).on("mouseout", ".feature-row", clearHighlight);
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
	$("#loading").hide();
	sizeLayerControl();
	featureList = new List("features", {valueNames: ["feature-name"]});
	featureList.sort("feature-name", {order:"asc"});

	var boroughsBH = new Bloodhound({
		name: "Boroughs",
		datumTokenizer: function (d) {
			return Bloodhound.tokenizers.whitespace(d.name);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: boroughSearch,
		limit: 10
	});
	
	var saudeBH = new Bloodhound({
		name: "Saudes",
		datumTokenizer: function (d) {
			return Bloodhound.tokenizers.whitespace(d.name);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: saudeSearch,
		limit: 10
	});

	var museumsBH = new Bloodhound({
		name: "Educacoes",
		datumTokenizer: function (d) {
			return Bloodhound.tokenizers.whitespace(d.name);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: educacaoSearch,
		limit: 10
	});
	
	var segurancasBH = new Bloodhound({
		name: "Segurancas",
		datumTokenizer: function (d) {
			return Bloodhound.tokenizers.whitespace(d.nome);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: segurancaSearch,
		limit: 10
	});

	var geonamesBH = new Bloodhound({
		name: "GeoNames",
		datumTokenizer: function (d) {
			return Bloodhound.tokenizers.whitespace(d.name);
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: {
			url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
			filter: function (data) {
				return $.map(data.geonames, function (result) {
					return {
						name: result.name + ", " + result.adminCode1,
						lat: result.lat,
						lng: result.lng,
						source: "GeoNames"
					};
				});
			},
			ajax: {
				beforeSend: function (jqXhr, settings) {
					settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
					$("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
				},
				complete: function (jqXHR, status) {
					$('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
				}
			}
		},
		limit: 10
	});
	boroughsBH.initialize();
	saudeBH.initialize();
	museumsBH.initialize();
	segurancasBH.initialize();
	geonamesBH.initialize();

	/* instantiate the typeahead UI */
	$("#searchbox").typeahead({
		minLength: 3,
		highlight: true,
		hint: false
	}, {
		name: "Saudes",
		displayKey: "name",
		source: saudeBH.ttAdapter(),
		templates: {
			header: "<h4 class='typeahead-header'><img src='img/theater.png' width='24' height='28'>&nbsp;Saudes</h4>",
			suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
		}
	}, {
		name: "Educacoes",
		displayKey: "name",
		source: museumsBH.ttAdapter(),
		templates: {
			header: "<h4 class='typeahead-header'><img src='img/museum.png' width='24' height='28'>&nbsp;Educacoes</h4>",
			suggestion: Handlebars.compile(["{{name}}<br>&nbsp;<small>{{address}}</small>"].join(""))
		}
	}, {
		name: "Segurancas",
		displayKey: "nome",
		source: segurancasBH.ttAdapter(),
		templates: {
			header: "<h4 class='typeahead-header'><img src='img/museum.png' width='24' height='28'>&nbsp;Segurancas</h4>",
			suggestion: Handlebars.compile(["{{nome}}<br>&nbsp;<small>{{address}}</small>"].join(""))
	   }
	}, {
		name: "GeoNames",
		displayKey: "name",
		source: geonamesBH.ttAdapter(),
		templates: {
			header: "<h4 class='typeahead-header'><img src='img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
		}
	}).on("typeahead:selected", function (obj, datum) {
		if (datum.source === "Saudes") {
			if (!map.hasLayer(saudeLayer)) {
				map.addLayer(saudeLayer);
			}
			map.setView([datum.lat, datum.lng], 17);
			if (map._layers[datum.id]) {
				map._layers[datum.id].fire("click");
			}
		}
		if (datum.source === "Educacoes") {
			if (!map.hasLayer(educacaoLayer)) {
				map.addLayer(educacaoLayer);
			}
			map.setView([datum.lat, datum.lng], 17);
			if (map._layers[datum.id]) {
				map._layers[datum.id].fire("click");
			}
		}
		if (datum.source === "Segurancas") {
			if (!map.hasLayer(segurancaLayer)) {
				map.addLayer(segurancaLayer);
			}
			map.setView([datum.lat, datum.lng], 17);
			if (map._layers[datum.id]) {
				map._layers[datum.id].fire("click");
			}
		}
		if (datum.source === "GeoNames") {
			map.setView([datum.lat, datum.lng], 14);
		}
		if ($(".navbar-collapse").height() > 50) {
			$(".navbar-collapse").collapse("hide");
		}
	}).on("typeahead:opened", function () {
		$(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
		$(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
	}).on("typeahead:closed", function () {
		$(".navbar-collapse.in").css("max-height", "");
		$(".navbar-collapse.in").css("height", "");
	});
	$(".twitter-typeahead").css("position", "static");
	$(".twitter-typeahead").css("display", "block");
});

//Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
	L.DomEvent
	.disableClickPropagation(container)
	.disableScrollPropagation(container);
} else {
	L.DomEvent.disableClickPropagation(container);
}

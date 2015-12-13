<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html; charset=UTF-8" %>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#000000">
    <meta name="description" content="">
    <meta name="author" content="">
    
    <title>Mapa transparente</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <link rel="apple-touch-icon" sizes="76x76" href="img/favicon-76.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="img/favicon-120.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="img/favicon-152.png"/>
    <link rel="icon" sizes="196x196" href="img/favicon-196.png"/>
    <link rel="icon" type="image/x-icon" href="img/favicon.ico"/>
    
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <style type="text/css">
	  .logo {
	  background: url("img/fundo.png")  100% no-repeat fixed;
	  background-size: cover;
	  height:1000px;
	  
	  .btn-custom {
	  background-color: hsl(0, 0%, 80%) !important;
	  background-repeat: repeat-x;
	  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#134134134", endColorstr="#c9c9c9");
	  background-image: -khtml-gradient(linear, left top, left bottom, from(#134134134), to(#c9c9c9));
	  background-image: -moz-linear-gradient(top, #134134134, #c9c9c9);
	  background-image: -ms-linear-gradient(top, #134134134, #c9c9c9);
	  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #134134134), color-stop(100%, #c9c9c9));
	  background-image: -webkit-linear-gradient(top, #134134134, #c9c9c9);
	  background-image: -o-linear-gradient(top, #134134134, #c9c9c9);
	  background-image: linear-gradient(#134134134, #c9c9c9);
	  border-color: #c9c9c9 #c9c9c9 hsl(0, 0%, 68.5%);
	  color: #white !important;
	  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.69);
	  -webkit-font-smoothing: antialiased;
}
	  
	}
      </style>
      
      <script>
			var applyMapContainerHeight = function() {
			  var height = $(window).height();
			  $('#map-container').css({ height: height});
			};
			applyMapContainerHeight();
	</script>
      
  </head>

  <body onload="applyMapContainerHeight();">
  	<div class="logo" id="map-container">
  		<div style="margin-top: 320px; margin-left: 40%;" class="col-md-6">
  			<form id="form" action="RegistrarVontade" method="post">
                 <div class="row" >
                   <div class="col-md-6">
                     <div class="form-group">
                       <label style="color: white;" for="nome">Nome:</label>
                       <input type="text" name="nome" id="nome" class="form-control" />
                    </div>
                    <div class="form-group">
                       <label style="color: white;" for="cep">CEP:</label>
                       <input type="text" name="cep" class="form-control" >
                    </div>
                   <div class="col-md-12" style="text-align: center">
                       <button type="submit" class="btn btn-custom" data-dismiss="modal">Enviar</button>
                   </div>
                 </div>
             </form>
  		</div>
  	</div>
  </body>
</html>
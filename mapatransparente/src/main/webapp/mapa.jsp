<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page contentType="text/html; charset=UTF-8" %>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Mapa transparente</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="theme-color" content="#000000">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />

    <link rel="apple-touch-icon" sizes="76x76" href="img/favicon-76.png"/>
    <link rel="apple-touch-icon" sizes="120x120" href="img/favicon-120.png"/>
    <link rel="apple-touch-icon" sizes="152x152" href="img/favicon-152.png"/>
    <link rel="icon" sizes="196x196" href="img/favicon-196.png"/>
    <link rel="icon" type="image/x-icon" href="img/favicon.ico"/>
    
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <style type="text/css">
	
	
	html, body, .container-table {
    	height: 108%;
	}
	body{
	    background: url('img/fundo.png') no-repeat center center fixed;
	    -webkit-background-size: cover;
	    -moz-background-size: cover;
	    -o-background-size: cover;
	    background-size: cover;
	}	  
	.container-table {
	    display: table;
	    overflow: auto;
	}
	.vertical-center-row {
	    display: table-cell;
	    vertical-align: middle;
	}
	.btn-primary {
	    background: #ffffff;
	    color: #00CC99;
	}
      </style>      
  </head>

  <body>
  	<div class="container container-table">
  		<div class="row vertical-center-row">
	  		<div class="col-sm-4 col-sm-offset-4">
	  			<form id="form" action="RegistrarVontade" method="post">
       		    	<div class="col-md-12 form-group">
                       <label style="color: white;" for="nome">Nome:</label>
                       <input type="text" name="nome" id="nome" class="form-control" />
                    </div>
                    <div class="col-md-12 form-group">
                       <label style="color: white;" for="cep">Cep:</label>
                       <input type="text" name="cep" id="cep" class="form-control" >
                    </div>
                    <div class="col-md-12" style="text-align: center">
                        <button type="submit" class="col-sm-12 btn btn-primary btn-lg outline" data-dismiss="modal">Entrar</button>
                    </div>
             	</form>
             </div>
  		</div>
  	</div>
  </body>
</html>
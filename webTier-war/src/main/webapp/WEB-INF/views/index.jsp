<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Online shop</title>

    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">

    <link rel='stylesheet prefetch' href='http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css'>
    <link href='http://fonts.googleapis.com/css?family=Titillium+Web:400,200,300,700,600' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,100' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <!-- Bootstrap -->
    <link href="<c:url value='/resources/css/bootstrap.min.css' />" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="<c:url value='/resources/css/font-awesome.min.css' />" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="<c:url value='/resources/css/owl.carousel.css' />" rel="stylesheet">
    <link href="<c:url value='/resources/css/style.css' />" rel="stylesheet">
    <link href="<c:url value='/resources/css/responsive.css' />" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
   <%-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-resource.js"></script>--%>
    <%--<script src="<c:url value='/resources/js/app.js' />"></script>--%>
    <script src="<c:url value='/resources/js/index.js' />"></script>
    <script src="<c:url value='/resources/js/item_controller.js' />"></script>
    <script src="<c:url value='/resources/js/item_service.js' />"></script>
    <script src="<c:url value='/resources/js/MenuCtrl.js' />"></script>
</head>
<body ng-app="myApp">
<div class="site-branding-area">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <div class="logo">
                    <h1><a href="${contextPath}/"><img src="${contextPath}/resources/img/logo.png"></a></h1>
                </div>
            </div>

            <div class="col-sm-6">
                <div class="shopping-item">
                    <a href="cart.html">Cart - <span class="cart-amunt">$100</span> <i class="fa fa-shopping-cart"></i>
                        <span class="product-count">5</span></a>
                </div>
            </div>
            <div class="col-sm-6">
                <sec:authorize access="isAuthenticated()"><div class="logout"><a href="${contextPath}/logout">logout</a></div><div class="username">login: <sec:authentication property="principal.username"/></div></sec:authorize>
            </div>
        </div>
    </div>
</div> <!-- End site branding area -->

<div class="mainmenu-area" ng-controller="MenuCtrl">
    <div class="container">
        <div class="row">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li class="{{isActive('/')}}"><a href="${contextPath}/">Home</a></li>
                    <li class="{{isActive('/phones')}}"><a href="#">Shop page</a></li>
                    <li class="{{isActive('/contacts')}}"><a href="#">Contacts</a></li>
                    <li>
                        <form name="searchForm" action="${contextPath}/search/">
                        <input style="margin-top: 10px" type="text" name="keyword" placeholder="Search products...">
                        <%--<input type="submit" style="display:none;"/>--%>
                        </form>
                    </li>
                    <sec:authorize access="!isAuthenticated()">
                        <li class="{{isActive('/registration')}}"><a href="${contextPath}/registration">login/registration</a></li>
                    </sec:authorize>
                </ul>
            </div>
        </div>
    </div>
</div> <!-- End mainmenu area -->
<container></container>
<jsp:include page="${current}"  flush="true"></jsp:include>
<div class="footer-bottom-area">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="copyright">
                    <p>&copy; 2017 Lab3. All Rights Reserved.</p>
                </div>
            </div>

            <div class="col-md-4">
                <div class="footer-card-icon">
                    <i class="fa fa-cc-discover"></i>
                    <i class="fa fa-cc-mastercard"></i>
                    <i class="fa fa-cc-paypal"></i>
                    <i class="fa fa-cc-visa"></i>
                </div>
            </div>
        </div>
    </div>
</div> <!-- End footer bottom area -->

<!-- Latest jQuery form server -->
<script src="https://code.jquery.com/jquery.min.js" defer></script>

<!-- Bootstrap JS form CDN -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js" defer></script>

<!-- jQuery sticky menu -->
<script src="${contextPath}/resources/js/owl.carousel.min.js" defer></script>
<script src="${contextPath}/resources/js/jquery.sticky.js" defer></script>

<!-- jQuery easing -->
<script src="${contextPath}/resources/js/jquery.easing.1.3.min.js" defer></script>

<!-- Main Script -->
<script src="${contextPath}/resources/js/main.js" defer></script>
<%--<script src="${contextPath}/resources/js/index.js"></script>--%>
<!-- Slider -->
<script type="text/javascript" src="${contextPath}/resources/js/bxslider.min.js" defer></script>
<script type="text/javascript" src="${contextPath}/resources/js/script.slider.js" defer></script>
</body>
</html>

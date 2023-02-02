(function () {
 	var ver = new Date().getDate() + '' + (new Date().getHours());
	var titleName = 'M4A Home 개선 2023  HTML 리스트';
	document.title = titleName;
	document.write('<meta name="description" content="' + titleName+ '" />\n'
	+'<link rel="canonical" href="' + document.URL + '" />'
	+'<link rel="shortcut icon" type="image/x-icon" href="@list/ico_favicon96.ico" />'
	+'<link type="image/x-icon" rel="apple-touch-icon-precomposed" href="@list/ico_favicon196.png" />'
	+'<link rel="preload" href="@list/SpoqaHanSansNeo-Regular.woff2"  as="font" type="font/woff2" crossorigin />'
	+'<link rel="preload" href="@list/m4a.css?ver=' + ver + '" as="style" />'
	+'<link rel="stylesheet" href="@list/m4a.css?ver=' + ver + '" media="all" />'
	+'<script src="@list/jquery-3.6.1.min.js"></script>'
	+'<script defer src="@list/m4a-list.json?ver=' + ver + '"></script>'
	+'<script defer src="@list/m4a-com.js?ver=' + ver + '"></script>');
})();

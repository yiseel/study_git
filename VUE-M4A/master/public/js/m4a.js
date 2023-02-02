var vers = new Date().getDate() + '' + (new Date().getHours());
(function () {
	document.write('\x3Cmeta name="theme-color" content="#BE3455" />\n'
	+'\x3Clink rel="shortcut icon" type="image/x-icon" href="/images/fav-196.webp">\n'
	+'\x3Clink type="image/x-icon" rel="apple-touch-icon" href="/images/fav-196.webp">\n'
	+'\x3Clink rel="preload" href="/fonts/NanumSquareRoundR.woff2" as="font" type="font/woff2" crossorigin>\n'
	+'\x3Clink rel="preload" href="/css/m4a-fonts.css" as="style">\n'
	+'\x3Clink rel="preload" href="/css/m4a-com.css?ver=' + vers + '" as="style">\n'
	+'\x3Clink rel="stylesheet" href="/css/m4a-fonts.css" media="all">\n'
	+'\x3Clink rel="stylesheet" href="/css/m4a-com.css?ver=' + vers + '" media="all">\n'
	+'\x3Cscript defer src="/js/m4a-com.js?ver=' + vers + '">\x3C/script>\n');
})();
/*
	+'\x3C!-- Google tag (gtag.js) -->\n'
	+'\x3Cscript async src="https://www.googletagmanager.com/gtag/js?id=G-3FD7R6PE4N"></script>\n'
	+'\x3Cscript>\n'
	+'window.dataLayer = window.dataLayer || [];\n'
	+'function gtag(){dataLayer.push(arguments);}\n'
	+'gtag("js", new Date());\n'
	+'gtag("config", "G-3FD7R6PE4N");\n'
	+'\x3C/script>\n'
*/

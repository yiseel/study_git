//jSon parse
$(function(){
	var jsonObj = JSON.parse(JSON.stringify(listParam));
	var html = [];
	var itemName = [];
	var itemNameColor = [];
	$.each(jsonObj.listParam,function(idx, item){
		
		if(itemName.indexOf(item.name) == -1){
			itemName.push(item.name);
		}
		
		html.push('<div class="list-row">');
		html.push('<div class="cell0">'+ (idx +1) +'</div>');
		html.push('<div class="list-item cell1"><span class="circle circle' + itemName.indexOf(item.name) + '">'+ item.name +'</span></div>');
		html.push('<div class="list-item cell2"><a href="'+ item.path +'" class="link-block" title="'+ item.title + ' ' + item.path +' 가 새창으로 열림" target="_blank" role="button"><div class="text1">'+ item.title +'</div> <div class="text2">'+ item.path +'</div></a></div>');
		html.push('<div class="list-item cell3"><div class="date">'+ item.date +'</div></div>');
		html.push('<div class="list-item cell4"><span class="result">'+ item.state +'</span></div>');
		html.push('<div class="list-item cell5 issue"><button class="btn1">이슈</button></div><div class="tool-tip">'+ item.issue +'</div>');
		html.push('</div>');
		$('#totalTxt').text(idx +1);
	});
	//console.log(itemName)
	$('#htmlList').html(html.join(''));

	$('.circle').each(function(){
		var text1 = $(this).html();
		text1 = text1.substr(1,999);
		$(this).html(text1);
	});
	
	$('.issue').each(function(){
		if($(this).next().text() != ''){
			$(this).addClass('on');
			$(this).find('.btn1').on('click', function(){
				if(!$(this).hasClass('open')){
					$(this).addClass('open').parent().next().stop().slideDown(300);
				}else{
					$(this).removeClass('open').parent().next().stop().slideUp(300);
				}
			})
		}
	});
	
	$('.cell4 > .result').each(function(){
		if($(this).text()=='완료'){
			$(this).addClass('on');
		}
	});
	
	$('.link-block').each(function(){
		$(this).mouseenter(function(){
			$('#ifrFreeview').attr('src',$(this).attr('href'))
			$('#mFreeView').fadeIn(300);
		});
	});
	
	$('.btn-close').on('click',function(){
		$('#mFreeView').fadeOut(300);
	});
	
	$('#darkMode').on('change',function(){
		if($(this).is(':checked')&&!$(this).hasClass('light-mode')){
			$('html').addClass('dark-mode').addClass('light-mode');
		}else if($(this).is(':checked')){
			$('html').addClass('dark-mode');
		}else{
			$('html').removeClass('dark-mode');
		}
	});
	
});
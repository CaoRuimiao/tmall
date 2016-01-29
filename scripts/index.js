$(function(){
	$('#body').bind('mousedown',function(e){
		e.preventDefault();
	});
//  导航下拉部分
	$('.headerNav').hover(function(){
		$(this).find('.headerHidden').finish();
		$(this).find('.headerHidden').slideDown();
	},function(){
		$(this).find('.headerHidden').slideUp();
	});
//  头部导航条、左侧导航条、右侧返回顶部、左侧图标对应楼层显示
	var timerId1,timerId2,timerId3,timerId4;
	$(window).scroll(function(){
	    if($(window).scrollTop() > 300){
	   		clearTimeout(timerId1);
	    	timerId1 = setTimeout(function(){
				$('#tmall-nav').show();    //顶条出现
	    	},500);
	    }else{
	    	clearTimeout(timerId1);
	    	$('#tmall-nav').hide();
	    };
	    if($(window).scrollTop()>=1100 && $(window).scrollTop()<=6500){
	    	clearTimeout(timerId2);
	    	timerId2=setTimeout(function(){
	    		$('.sn-nav-wrapper').show();     //楼层导航出现
	    	},500);
		}else{
			clearTimeout(timerId2);
			$('.sn-nav-wrapper').hide();
		}
		if($(window).scrollTop()>=3500){
	    	clearTimeout(timerId3);
	    	timerId3=setTimeout(function(){
	    		$('.right-nav-top').show();     //返回顶部出现
	    	},500);
		}else{
			clearTimeout(timerId3);
			$('.right-nav-top').hide();
		}
		$('.floor-item').each(function(i){
			if(i==11 && $(window).scrollTop()>=$($('.floor-item')[11]).offset().top-140){
				$($('.wenzi')[i]).show();
			}else{
				if($(window).scrollTop()>=$($('.floor-item')[i]).offset().top-140 && $(window).scrollTop()<=$($('.floor-item')[i+1]).offset().top-140){
					$($('.wenzi')[i]).show();   //左侧图标对应楼层显示
				}
				else{
					$($('.wenzi')[i]).hide();
				}
			}			
		});	
	 });
//  轮播
	suofang1=function(){
		$($('.b2')[index]).find('img').animate({width:'110%',height:'110%'},0);
		$($('.b2')[index]).find('img').show(0,function(){
			$($('.b2')[index]).find('img').animate({width:'100%',height:'100%'},2000);
		});
	};
	var index=1,timerId;
	var colors=['#C89EFF','#F3EDF1','#68C9A8','#DBDBDB','#B90AF9','#005494'];
	var lunbo=function(){
		if(index==$('.b1').length){    //顺序很重要（先处理边界问题）
			index=0;
		}
		$('.b2').hide();
		var el=$('.b2')[index];
		$(el).show();
		$('.b1').removeClass('dotcolor');
		$($('.b1')[index]).addClass('dotcolor');
		$('.banner-color').css({background:colors[index]});
		suofang1();
		index++;				
	};
	$('.b1').each(function(i){
		$(this).data('index',i);
	});
	$('.b1').hover(function(){
		clearInterval(timerId);
		$('.b1').removeClass('dotcolor');
		$(this).addClass('dotcolor');
		var i=$(this).data('index');
		$('.b2').hide();
		$($('.b2')[i]).show();
		suofang1();
		index=i+1;    //i -----> i+1
		$('.banner-color').css({background:colors[i]});	
	},function(){
		clearInterval(timerId);
		$('.banner-color').css({background:colors[index-1]});
		timerId=setInterval(lunbo,2000);
	});
	timerId=setInterval(lunbo,2000);
//  菜单部分
	suofang2=function(){
		$($('.bm3')[i]).find('img').animate({width:'110%',height:'110%'},0);
		$($('.bm3')[i]).find('img').show(0,function(){
			$($('.bm3')[i]).find('img').animate({width:'100%',height:'100%'},2000);
		});
	};
	var colors2=['#FFD11C','#FED44C','#F2F7FD','#345171','#DC2E63',
	'#FBAD17','#D2FBF5','#A5856E','#D70609','#FFE957','#FFC3D3',
	'#29A6FF','#E4E2E3','#FFD5D6','#30C4FF','#C9E0B2'];
	$('.bm1').each(function(i){
		$(this).data('index',i);
	});
	$('.bm1').hover(function(){
		$(this).find('.bm2').show();
		i=$(this).data('index');
		$('.bm3').hide();
		$($('.bm3')[i]).show();
		suofang2();
		$('.bm4').hide();
		$($('.bm4')[i]).show();
		clearInterval(timerId);
		if(i==0){
			$('.banner-main-small-index').show();
			$('.b1').show(); 
			$('.banner-color').css({background:colors[index-1]});
			timerId=setInterval(lunbo,2000);
		}else{
			$('.banner-main-small-index').hide();
			$('.b1').hide();     //小圆点
			$('.banner-color').css({background:colors2[i]});		
		}
	},function(){
		$('.bm2').hide();		
		//先经过小圆点，在经过菜单栏，最后到精选市场，图片背景会显示当前banner图的前一张的背景	
		// $('.bm3').hide();
		// $('.bm4').hide();
		clearInterval(timerId);
		if(i==0){
			// index=$('.b1').length-1;
			$('.b1').show();     //小圆点
			$('.banner-main-small-index').show();   //小图
			$('.banner-color').css({background:colors[index-1]});
			timerId=setInterval(lunbo,2000);
		}	 			
	});
//  热门品牌
	$('.pinpai').each(function(i){
		$(this).data('index',i);
	});
	$('.pinpai').click(function(){
		var i=$(this).data('index');
		$('.pinpai').removeClass('selected');
		$(this).addClass('selected');
		$('.brand-rec-content-item').hide();
		$($('.brand-rec-content-item')[i]).show();
		$('.brand-rec-content-item').removeClass('show');
		$($('.brand-rec-content-item')[i]).addClass('show');
	});
//  换一批
	$('#change').click(function(){
		var	arr=[],dict={},rad;
		$('.show').find('img').each(function(i){
			arr.push($(this).attr('src'));	
		});	
		$('.show').find('img').each(function(i){
			rad=Math.floor(Math.random()*24);
			while(dict[rad]){
				rad=Math.floor(Math.random()*24);
			}
			dict[rad]=true;	
			$(this).attr({src:arr[rad]});
		});	
	}); 
//  楼层小轮播
	var current1=current2=current3=current4=current5=current8=0, 
	indexf1=indexf2=indexf3=indexf4=indexf5=indexf8=1;
	var timerIdf1,timerIdf2,timerIdf3,timerIdf4,timerIdf5,timerIdf8;
	f1lunbo=function(){
		$($('.f1')[current1]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f1')[indexf1]).animate({left:'0px'});
		current1=indexf1;
		indexf1++;
		if(indexf1==$('.f1').length){
			indexf1=0;
		}
	};
	timerIdf1=setInterval(f1lunbo,2000);
	$('.f1-l').click(function(){	
		clearInterval(timerIdf1);
		$($('.f1')[current1]).animate({left:'100px'},function(){
			$(this).css({left:'-100px'},'slow');
		});
		$($('.f1')[indexf1]).animate({left:'0px'});
		current1=indexf1;
		indexf1--;
		if(indexf1==-1){
			indexf1=$('.f1').length-1;
		}	
		timerIdf1=setInterval(f1lunbo,2000);
	});
	$('.f1-r').click(function(){
		clearInterval(timerIdf1);
		$($('.f1')[current1]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f1')[indexf1]).animate({left:'0px'});
		current1=indexf1;
		indexf1++;
		if(indexf1==$('.f1').length){
			indexf1=0;
		}
		timerIdf1=setInterval(f1lunbo,2000);
	});
	$('.f1').hover(function(){
		clearInterval(timerIdf1);
	},function(){
		timerIdf1=setInterval(f1lunbo,2000);
	});
	f2lunbo=function(){
		$($('.f2')[current2]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f2')[indexf2]).animate({left:'0px'});
		current2=indexf2;
		indexf2++;
		if(indexf2==$('.f2').length){
			indexf2=0;
		}
	};
	timerIdf2=setInterval(f2lunbo,2000);
	$('.f2-l').click(function(){	
		clearInterval(timerIdf2);
		$($('.f2')[current2]).animate({left:'200px'},function(){
			$(this).css({left:'-100px'},'slow');
		});
		$($('.f2')[indexf2]).animate({left:'0px'});
		current2=indexf2;
		indexf2--;
		if(indexf2==-1){
			indexf2=$('.f2').length-1;
		}	
		timerIdf2=setInterval(f2lunbo,2000);
	});
	$('.f2-r').click(function(){
		clearInterval(timerIdf2);
		$($('.f2')[current2]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f2')[indexf2]).animate({left:'0px'});
		current2=indexf2;
		indexf2++;
		if(indexf2==$('.f2').length){
			indexf2=0;
		}
		timerIdf2=setInterval(f2lunbo,2000);
	});
	$('.f2').hover(function(){
		clearInterval(timerIdf2);
	},function(){
		timerIdf2=setInterval(f2lunbo,2000);
	});
	f3lunbo=function(){
		$($('.f3')[current3]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f3')[indexf3]).animate({left:'0px'});
		current3=indexf3;
		indexf3++;
		if(indexf3==$('.f3').length){
			indexf3=0;
		}
	};
	timerIdf3=setInterval(f3lunbo,2000);
	$('.f3-l').click(function(){	
		clearInterval(timerIdf3);
		$($('.f3')[current3]).animate({left:'200px'},function(){
			$(this).css({left:'-100px'},'slow');
		});
		$($('.f3')[indexf3]).animate({left:'0px'});
		current3=indexf3;
		indexf3--;
		if(indexf3==-1){
			indexf3=$('.f3').length-1;
		}	
		timerIdf3=setInterval(f3lunbo,2000);
	});
	$('.f3-r').click(function(){
		clearInterval(timerIdf3);
		$($('.f3')[current3]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f3')[indexf3]).animate({left:'0px'});
		current3=indexf3;
		indexf3++;
		if(indexf3==$('.f3').length){
			indexf3=0;
		}
		timerIdf3=setInterval(f3lunbo,2000);
	});
	$('.f3').hover(function(){
		clearInterval(timerIdf3);
	},function(){
		timerIdf3=setInterval(f3lunbo,2000);
	});
	f4lunbo=function(){
		$($('.f4')[current4]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f4')[indexf4]).animate({left:'0px'});
		current4=indexf4;
		indexf4++;
		if(indexf4==$('.f4').length){
			indexf4=0;
		}
	};
	timerIdf4=setInterval(f4lunbo,2000);
	$('.f4-l').click(function(){	
		clearInterval(timerIdf4);
		$($('.f4')[current4]).animate({left:'200px'},function(){
			$(this).css({left:'-100px'},'slow');
		});
		$($('.f4')[indexf4]).animate({left:'0px'});
		current4=indexf4;
		indexf4--;
		if(indexf4==-1){
			indexf4=$('.f4').length-1;
		}	
		timerIdf4=setInterval(f4lunbo,2000);
	});
	$('.f4-r').click(function(){
		clearInterval(timerIdf4);
		$($('.f4')[current4]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f4')[indexf4]).animate({left:'0px'});
		current4=indexf4;
		indexf4++;
		if(indexf4==$('.f4').length){
			indexf4=0;
		}
		timerIdf4=setInterval(f4lunbo,2000);
	});
	$('.f4').hover(function(){
		clearInterval(timerIdf4);
	},function(){
		timerIdf4=setInterval(f4lunbo,2000);
	});
	f5lunbo=function(){
		$($('.f5')[current5]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f5')[indexf5]).animate({left:'0px'});
		current5=indexf5;
		indexf5++;
		if(indexf5==$('.f5').length){
			indexf5=0;
		}
	};
	timerIdf5=setInterval(f5lunbo,2000);
	$('.f5-l').click(function(){	
		clearInterval(timerIdf5);
		$($('.f5')[current5]).animate({left:'200px'},function(){
			$(this).css({left:'-100px'},'slow');
		});
		$($('.f5')[indexf5]).animate({left:'0px'});
		current5=indexf5;
		indexf5--;
		if(indexf5==-1){
			indexf5=$('.f5').length-1;
		}	
		timerIdf5=setInterval(f5lunbo,2000);
	});
	$('.f5-r').click(function(){
		clearInterval(timerIdf5);
		$($('.f5')[current5]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f5')[indexf5]).animate({left:'0px'});
		current5=indexf5;
		indexf5++;
		if(indexf5==$('.f5').length){
			indexf5=0;
		}
		timerIdf5=setInterval(f5lunbo,2000);
	});
	$('.f5').hover(function(){
		clearInterval(timerIdf5);
	},function(){
		timerIdf5=setInterval(f5lunbo,2000);
	});
	f8lunbo=function(){
		$($('.f8')[current8]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f8')[indexf8]).animate({left:'0px'});
		current8=indexf8;
		indexf8++;
		if(indexf8==$('.f8').length){
			indexf8=0;
		}
	};
	timerIdf8=setInterval(f8lunbo,2000);
	$('.f8-l').click(function(){	
		clearInterval(timerIdf8);
		$($('.f8')[current8]).animate({left:'200px'},function(){
			$(this).css({left:'-100px'},'slow');
		});
		$($('.f8')[indexf8]).animate({left:'0px'});
		current8=indexf8;
		indexf8--;
		if(indexf8==-1){
			indexf8=$('.f8').length-1;
		}	
		timerIdf8=setInterval(f8lunbo,2000);
	});
	$('.f8-r').click(function(){
		clearInterval(timerIdf8);
		$($('.f8')[current8]).animate({left:'-100px'},function(){
			$(this).css({left:'100px'},'slow');
		});
		$($('.f8')[indexf8]).animate({left:'0px'});
		current8=indexf8;
		indexf8++;
		if(indexf8==$('.f8').length){
			indexf8=0;
		}
		timerIdf8=setInterval(f8lunbo,2000);
	});
	$('.f8').hover(function(){
		clearInterval(timerIdf8);
	},function(){
		timerIdf8=setInterval(f8lunbo,2000);
	});
	// f1lunbo=function(){
	// 	$('.f1').hide();
	// 	$($('.f1')[indexf1]).show();	
	// 	indexf1++;
	// 	if(indexf1==$('.f1').length){
	// 		indexf1=0;
	// 	}
	// };
	// $('.f1-l').click(function(){	
	// 	clearInterval(timerIdf1);
	// 	indexf1--;
	// 	if(indexf1==-1){
	// 		indexf1=$('.f1').length-1;
	// 	}	
	// 	$('.f1').hide();
	// 	$($('.f1')[indexf1]).show();	
	// 	timerIdf1=setInterval(f1lunbo,2000);
	// });
	// $('.f1-r').click(function(){
	// 	clearInterval(timerIdf1);
	// 	$('.f1').hide();
	// 	$($('.f1')[indexf1]).show();
	// 	indexf1++;
	// 	if(indexf1==$('.f1').length){
	// 		indexf1=0;
	// 	}
	// 	timerIdf1=setInterval(f1lunbo,2000);
	// });
	// f2lunbo=function(){
	// 	var i=$(this).data('index');
	// 	$('.f2').hide();
	// 	$($('.f2')[indexf2]).show();	
	// 	indexf2++;
	// 	if(indexf2==$('.f2').length){
	// 		indexf2=0;
	// 	}
	// };
	// timerIdf2=setInterval(f2lunbo,2000);
	// $('.f2').hover(function(){
	// 	clearInterval(timerIdf2);
	// },function(){
	// 	timerIdf2=setInterval(f2lunbo,2000);
	// });
	// $('.f2-l').click(function(){	
	// 	clearInterval(timerIdf2);
	// 	indexf2--;
	// 	if(indexf2==-1){
	// 		indexf2=$('.f2').length-1;
	// 	}	
	// 	$('.f2').hide();
	// 	$($('.f2')[indexf2]).show();	
	// 	timerIdf2=setInterval(f2lunbo,2000);
	// });
	// $('.f2-r').click(function(){
	// 	clearInterval(timerIdf2);
	// 	$('.f2').hide();
	// 	$($('.f2')[indexf2]).show();
	// 	indexf2++;
	// 	if(indexf2==$('.f2').length){
	// 		indexf2=0;
	// 	}
	// 	timerIdf2=setInterval(f2lunbo,2000);
	// });
	// f3lunbo=function(){
	// 	var i=$(this).data('index');
	// 	$('.f3').hide();
	// 	$($('.f3')[indexf3]).show();	
	// 	indexf3++;
	// 	if(indexf3==$('.f3').length){
	// 		indexf3=0;
	// 	}
	// };
	// timerIdf3=setInterval(f3lunbo,2000);
	// $('.f3').hover(function(){
	// 	clearInterval(timerIdf3);
	// },function(){
	// 	timerIdf3=setInterval(f3lunbo,2000);
	// });
	// $('.f3-l').click(function(){	
	// 	clearInterval(timerIdf3);
	// 	indexf3--;
	// 	if(indexf3==-1){
	// 		indexf3=$('.f3').length-1;
	// 	}	
	// 	$('.f3').hide();
	// 	$($('.f3')[indexf3]).show();	
	// 	timerIdf3=setInterval(f3lunbo,2000);
	// });
	// $('.f3-r').click(function(){
	// 	clearInterval(timerIdf3);
	// 	$('.f3').hide();
	// 	$($('.f3')[indexf3]).show();
	// 	indexf3++;
	// 	if(indexf3==$('.f3').length){
	// 		indexf3=0;
	// 	}
	// 	timerIdf3=setInterval(f3lunbo,2000);
	// });
	// f4lunbo=function(){
	// 	var i=$(this).data('index');
	// 	$('.f4').hide();
	// 	$($('.f4')[indexf1]).show();	
	// 	indexf4++;
	// 	if(indexf4==$('.f4').length){
	// 		indexf4=0;
	// 	}
	// };
	// timerIdf4=setInterval(f4lunbo,2000);
	// $('.f4').hover(function(){
	// 	clearInterval(timerIdf4);
	// },function(){
	// 	timerIdf4=setInterval(f4lunbo,2000);
	// });
	// $('.f4-l').click(function(){	
	// 	clearInterval(timerIdf4);
	// 	indexf4--;
	// 	if(indexf4==-1){
	// 		indexf4=$('.f4').length-1;
	// 	}	
	// 	$('.f4').hide();
	// 	$($('.f4')[indexf4]).show();	
	// 	timerIdf4=setInterval(f4lunbo,2000);
	// });
	// $('.f4-r').click(function(){
	// 	clearInterval(timerIdf4);
	// 	$('.f4').hide();
	// 	$($('.f4')[indexf4]).show();
	// 	indexf4++;
	// 	if(indexf4==$('.f4').length){
	// 		indexf4=0;
	// 	}
	// 	timerIdf4=setInterval(f4lunbo,2000);
	// });
	// f5lunbo=function(){
	// 	var i=$(this).data('index');
	// 	$('.f5').hide();
	// 	$($('.f5')[indexf1]).show();	
	// 	indexf5++;
	// 	if(indexf5==$('.f5').length){
	// 		indexf5=0;
	// 	}
	// };
	// timerIdf5=setInterval(f5lunbo,2000);
	// $('.f5').hover(function(){
	// 	clearInterval(timerIdf5);
	// },function(){
	// 	timerIdf5=setInterval(f5lunbo,2000);
	// });
	// $('.f5-l').click(function(){	
	// 	clearInterval(timerIdf5);
	// 	indexf5--;
	// 	if(indexf5==-1){
	// 		indexf5=$('.f5').length-1;
	// 	}	
	// 	$('.f5').hide();
	// 	$($('.f5')[indexf5]).show();	
	// 	timerIdf5=setInterval(f5lunbo,2000);
	// });
	// $('.f5-r').click(function(){
	// 	clearInterval(timerIdf5);
	// 	$('.f5').hide();
	// 	$($('.f5')[indexf5]).show();
	// 	indexf5++;
	// 	if(indexf5==$('.f5').length){
	// 		indexf5=0;
	// 	}
	// 	timerIdf5=setInterval(f5lunbo,2000);
	// });
	// f8lunbo=function(){
	// 	var i=$(this).data('index');
	// 	$('.f8').hide();
	// 	$($('.f8')[indexf1]).show();	
	// 	indexf8++;
	// 	if(indexf8==$('.f8').length){
	// 		indexf8=0;
	// 	}
	// };
	// timerIdf8=setInterval(f8lunbo,2000);
	// $('.f8').hover(function(){
	// 	clearInterval(timerIdf8);
	// },function(){
	// 	timerIdf8=setInterval(f8lunbo,2000);
	// });
	// $('.f8-l').click(function(){	
	// 	clearInterval(timerIdf8);
	// 	indexf8--;
	// 	if(indexf8==-1){
	// 		indexf8=$('.f8').length-1;
	// 	}	
	// 	$('.f8').hide();
	// 	$($('.f8')[indexf8]).show();	
	// 	timerIdf8=setInterval(f8lunbo,2000);
	// });
	// $('.f8-r').click(function(){
	// 	clearInterval(timerIdf8);
	// 	$('.f8').hide();
	// 	$($('.f8')[indexf8]).show();
	// 	indexf8++;
	// 	if(indexf8==$('.f8').length){
	// 		indexf8=0;
	// 	}
	// 	timerIdf8=setInterval(f8lunbo,2000);
	// });
//  小图偏移
	$('.smallimg').hover(function(){
		$(this).css({position:'relative'});
		$(this).stop();
		$(this).animate({left:1},200);
	},function(){
		$(this).stop();
		$(this).animate({left:0},200);
	});
//  右侧冻结
	$('.r1').hover(function(){
		$('.r1').stop();
		$(this).find('.r2').show(0,function(){
			$(this).animate({right:40},200);
	});
	},function(){
		$('.r1').stop();
		$(this).find('.r2').css({right:80}).hide(0);
	});
	$('.right-nav-car').hover(function(){
		$('#right-nav-car').css({backgroundImage:'url(./img/car2.png)'});
	},function(){
		$('#right-nav-car').css({backgroundImage:'url(./img/car.png)'});
	});
// 	左侧楼层导航	
	$('.sn-nav-wrapper-item').each(function(i){
		$(this).data('index',i);
	});
	// var contents=['女装内衣','美容护肤','男装内衣','鞋包','运动户外','手机数码','家用电器','母婴','食品','图书','家装家纺','超市'];
	// var iconfonts=['&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;','&#xe60c;'];
	$('.sn-nav-wrapper-item').click(function(){
		var i=$(this).data('index');
		var newtop=$($('.floor-item')[i]).offset().top-50;
		$({top:$(window).scrollTop()}).animate(
			{top:newtop},
			{
				duration:700,
				step:function(){
					$(window).scrollTop(this.top);
				}
			});
	});
//  左侧楼层导航鼠标经过变字体
	$('.sn-nav-wrapper-item').hover(
		function(){
			i=$(this).data('index');
			$($('.wenzi')[i]).show();	
		},function(){
			i=$(this).data('index');
			if($(window).scrollTop()>=$($('.floor-item')[i]).offset().top-120 && $(window).scrollTop()<=$($('.floor-item')[i+1]).offset().top-120){
				$($('.wenzi')[i]).show();
			}else{
				$($('.wenzi')[i]).hide();
			}	
	});
//  返回顶部
	$('.right-nav-top').click(function(){
		$({top:$(window).scrollTop()}).animate(
			{top:0},
			{
				duration:700,
				step:function(){
					$(window).scrollTop(this.top);
				}
			});
	});









	Array.prototype.myMap = function(fn) {
		var r=[];
		for(var i=0;i<this.length;i++){
			r.push(fn.apply(this,[this[i],i,this]));
		}
		return r;
	};
	[1,1,3,2,5,3,2].myMap(function(a,b){
		console.log(a+b);
		return a+b;
	});

	// var arr1=[1,2,3,4,5];
	// arr.reduce(function(a,b){
	// 	console.log(arguments);
	// 	return a+b; //15
	// });

	// Array.prototype.myReduce=function(fn){
	// 	var nr1=[];
	// 	for(var i=0;i<this.length;i++){
	// 		nr1.push(fn.apply(this,[]));
	// 	}
	// }
	// var arr2=[2,3,5,3,5,8];
	// arr.reduceRight(function(){
	// 	console.log(arguments);
	// 	return a+b;  //26
	// });











});
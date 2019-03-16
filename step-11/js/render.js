"use strict";function calculateVideoSize(){var t=".videoplayer-container, .videoplayer-container-thumb",e=$(t);e.length&&e.find("iframe").each(function(e,i){var a=$(i).closest(t).width(),o=$(i).closest(t).height();if(o>a){var n=1.77*o;$(i).css({width:n,"min-width":n,"min-height":"auto",height:n})}else n=1.77*a,$(i).css({height:n,"min-height":n,"min-width":"auto",width:n})})}function closeDropDown(t){$(".smart-section-nav__list").not(t).addClass("visually-hidden"),t||window.removeEventListener("click",windowClickCallback)}function alignCenter(t){$(window).height()>t.outerHeight()?t.css({top:($(window).height()-t.height())/2+"px"}):t.css("top",0)}function renderError(t,e){$(t).after('<label class="label-form-error" id="label_'+e+'">This field is required<label>')}function submitCustomForm(t){t.preventDefault(),$(".label-form-error").remove();var e=$(this),i=e.attr("data-integration-id"),a=e.attr("data-integration-pk"),o=$(this).closest(".section-class-link").find('.form-item:not(".hidden__important") input[data-integration-id="'+i+'"][type="text"], .form-item:not(".hidden__important") input[data-integration-id="'+i+'"][type="radio"]:checked, .form-item:not(".hidden__important") input[data-integration-id="'+i+'"][type="checkbox"]:checked, .form-item:not(".hidden__important") textarea[data-integration-id="'+i+'"], .form-item:not(".hidden__important") select[data-integration-id="'+i+'"]');if(o.length>0&&a){var n=!1;o.map(function(e,i){if($(i).bind("focus",function(t){$("#label_"+$(i).attr("id")).css("display","none"),$(this).off(t)}),"required"==$(i).attr("required")&&!$(i).val()){t.preventDefault();var a=$(i).attr("id");renderError(i,a),n=!0}}),n?(t.preventDefault(),t.stopImmediatePropagation()):$.ajax({url:"/api/autoresponder/integrations/"+a+"/",type:"GET",async:!1,success:function(a){if(a&&a.html){$("body").addClass("user-no-click");var n=$.parseHTML(a.html);$("body").append($('<div id="form_integration_'+i+'" hidden>').append(n));var s=$("#form_integration_"+i).find("form").first();o.each(function(){var t=$(this),e=t.attr("name"),i=t.val();if(e&&i){var a=s.find('[name="'+e+'"]').first();"radio"===t.attr("type")||"checkbox"===t.attr("type")?(a=s.find('[name="'+e+'"][value="'+i+'"]').first()).attr("checked",!0):(a=s.find('[name="'+e+'"]').first()).length>0&&a.val(i)}});var r=s.attr("action");if(r.includes("wufoo")||r.includes("mcssl")||r.includes("contest")){t.preventDefault();var l=s.find('[type="submit"], #submit, [name="submit"]').first();l?l.click():s.submit()}else $.ajax({url:s.attr("action"),type:"POST",data:s.serialize(),crossDomain:!0,async:!0,complete:function(a,n){var s=a.getResponseHeader("Location");s&&-1!==s.indexOf("captcha")&&(window.location=s),$("body").hasClass("user-no-click")&&$("body").removeClass("user-no-click"),200!=a.status&&0!=a.status?(console.log('An error has occurred: "'+a.status+". "+a.statusText+'"'),t.preventDefault(),t.stopImmediatePropagation()):(e.attr("href")||"").replace("#","")?window.location=e.attr("href"):o.val(""),$("#form_integration_"+i).remove()}})}}})}}function submitForm(t){$(".label-form-error").remove(),t.preventDefault();var e=$(this),i=$(this).attr("data-integration-type").toLowerCase(),a=$(this).attr("data-integration-list-id"),o=$(this).attr("data-integration-original-id"),n=!1,s=a,r=!1;$(this).attr("data-integration-campaign")&&(n=$(this).attr("data-integration-campaign")),$(this).attr("data-integration-infusionsoft-id")&&(s=$(this).attr("data-integration-infusionsoft-id")),$(this).attr("data-opt-in")&&(r=$(this).attr("data-opt-in"));var l,c=$(this).closest(".section-class-link"),d="",p=!1;"email"===i?(l='[data-integration-list-id="'+o+'"]',d=c.find('.form-item:not(".hidden__important") input'+l+'[type="text"], .form-item:not(".hidden__important") input'+l+'[type="radio"]:checked, .form-item:not(".hidden__important") input'+l+'[type="checkbox"]:checked, .form-item:not(".hidden__important") textarea'+l+', .form-item:not(".hidden__important") select'+l),p=!0):(l='[data-integration-type="'+i+'"][data-integration-list-id="'+s+'"]',d=c.find('.form-item:not(".hidden__important") input'+l+', .form-item:not(".hidden__important") textarea'+l));var h=d;if(h.length>0){var m=!1;if(h.map(function(e,i){if($(i).bind("focus",function(t){$("#label_"+$(i).attr("id")).css("display","none"),$(this).off(t)}),"required"===$(i).attr("required")&&""===$(i).val().trim()){t.preventDefault(),t.stopImmediatePropagation();var a=$(i).attr("id");renderError(i,a),m=!0}}),m)t.preventDefault(),t.stopImmediatePropagation();else{var f=new FormData,v={};h.each(function(){if($(this).attr("data-integration-name")){var t=$(this).val();"infusionsoft"===$(this).attr("data-integration-type")&&"checkbox"===$(this).attr("type")&&(t=+$(this).prop("checked")),f.append($(this).attr("data-integration-name"),t),p&&(v[$(this).attr("data-integration-name")]=$(this).val())}}),f.append("opt_in",r),f.append("type",i),f.append("list_id",a),f.append("object_id",o),f.append("campaign_id",n),p&&f.append("data_form",JSON.stringify(v)),$.ajax({url:"/api/send-integration/",type:"POST",data:f,processData:!1,contentType:!1,success:function(i){"error"in i?(console.log('An error has occurred: "'+i.error+'"'),t.preventDefault(),t.stopImmediatePropagation()):"ok"in i&&((e.attr("href")||"").replace("#","")?window.location=e.attr("href"):(h.filter(':not([type="checkbox"],[type="radio"])').val(""),h.filter('[type="checkbox"]:not([checked="checked"]),[type="radio"]:not([checked="checked"])').prop("checked",!1),h.filter('[type="checkbox"][checked="checked"],[type="radio"][checked="checked"]').prop("checked",!0)))}})}}}function openPopup(t,e){t.preventDefault();var i=$(e)[0].getAttribute("data-blur"),a="";i&&(a="blur("+i+"px)");var o=$(".contentWrapper")[0].style;o.WebkitFilter=a,o.MozFilter=a,o.OFilter=a,o.MsFilter=a,o.filter=a,$(".modal-visible").removeClass("modal-visible"),$(e)[0].classList.add("modal-visible"),alignCenter($(".modal-visible .modal-vertical")),$("html,body").css("overflow","hidden"),$(".modal-visible .scrollbar-inner").scrollbar()}$(document).ready(function(){function t(){var t=$(this);t.css({width:"100%"});var e=t.closest(".image-n-gradient-root"),i=parseFloat(e.closest(".main-block-image").innerWidth().toFixed(2)),a=parseFloat(t.innerWidth().toFixed(2)),o=parseFloat(t.innerHeight().toFixed(2));if(t.css({height:"auto",width:"100%"}),e.css({height:"auto",width:"100%"}),a&&o){var n=e.data("max-value-input-height");try{n=parseFloat(parseInt(n,10).toFixed(2))}catch(t){n=0,console.error("Error convert value to int")}a>i&&0!==i&&(n=i),e.css({width:n,height:n});var s=1;a=parseFloat(t.innerWidth().toFixed(2)),n>(o=parseFloat(t.innerHeight().toFixed(2)))?(s=n/o,o=n,a*=s):n>a&&(s=n/a,a=n,o*=s),(n<o||n<a)&&t.css({height:o,width:a})}}if($(window).on("load",function(){$("img").each(function(){this.complete&&void 0!==this.naturalWidth&&0!=this.naturalWidth||(this.src="https://dsovc51kv2br8.cloudfront.net/media/common/imageNotAvailable.jpg")}),calculateVideoSize()}),$("[data-disabled]").mousedown(function(t){t.preventDefault(),t.stopPropagation()}),$(window).on("resize",function(){$(".image-shape-circle img").resize(),$(".is-testimonial-section").length&&$(".is-testimonial-section").each(function(){$(this);var t=0,e=$(this).find(".row.is-active-testimonial-row").first().attr("id");$(this).find(".row").each(function(i,a){$(a).addClass("is-active-testimonial-row").removeClass("is-pre-active-testimonial-row").removeClass("is-post-active-testimonial-row");var o=$(a).find(".image-shape-circle img");o.length&&o.resize(),t<$(a).height()+30&&(t=$(a).height()+30),$(a).attr("id")!==e&&$(a).removeClass("is-active-testimonial-row")}),$(this).height(t)})}),$(".section-class-link .navigation-ul").each(function(t,e){$(e).clone().addClass("smart-section-nav__list visually-hidden").appendTo($(this).closest(".section-class-link")).attr("id",e.id+"_cloned")}),$(".image-shape-circle img").one("load",function(){t.bind(this)()}).each(function(){this.complete&&t.bind(this)()}),$(".image-shape-circle img").on("resize",function(e){e.stopPropagation(),t.bind(this)()}),$(".videoplayer-container").length>0){var e=function(t){var e=t.divObj.offsetWidth+200,i=t.divObj.offsetHeight;if(e/i>16/9)t.playerObj.setSize(e,e/16*9),$("#"+t.playerId).css({left:-100});else{var a=(e-$("#"+t.playerId).width())/2-100;$("#"+t.playerId).css({left:a}),t.playerObj.setSize(i/9*16,i)}},i=document.createElement("script");i.src="https://www.youtube.com/iframe_api";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(i,a);var o=[];window.onYouTubeIframeAPIReady=function(){var t={autoplay:1,autohide:1,modestbranding:1,rel:0,showinfo:0,controls:0,disablekb:1,enablejsapi:0,iv_load_policy:3};function i(t){t.target.mute&&t.target.mute(),o.forEach(function(t){var i=t.playerObj;i.playVideo&&(i.playVideo(),i.isMuted&&!i.isMuted()&&i.mute()),e(t)})}function a(t){t.data===YT.PlayerState.ENDED&&t.target.playVideo()}$(".videoplayer-container").each(function(e,n){var s="videoplayer-container-"+$(n).attr("data-section"),r=n,l=new YT.Player(s,{videoId:$(n).attr("data-youtube-id"),events:{onReady:i,onStateChange:a},playerVars:t});o.push({playerId:s,playerObj:l,divObj:r})})},$(window).on("load resize",function(){o.forEach(e)})}var n=$(".navigationPage");n&&n.length&&n.each(function(){var t=$(this),e=t.closest(".row");!t.hasClass("custom-navigation")||t.hasClass("text-align-center")||e.hasClass("navigation-page-row")?e.hasClass("navigation-page-row")&&e.removeClass("navigation-page-row"):e.addClass("navigation-page-row")}),$('[data-stripe="handler"]').length&&(window.stripeBillingComplete=function(t,e,i){$.ajax({url:"/api/stripe-billing/"+t+"/send/",type:"POST",contentType:"application/json",data:JSON.stringify(e),success:function(){var t=$("#"+i+' [data-stripe="handler"]');t.attr("data-stripe-disable",!0),t[0].click(),t.removeAttr("data-stripe-disable")},error:function(t){alert("An error has occurred stripe: "+t.responseText)}})})}),$('[data-stripe="handler"]').click(function(t){var e=$(this),i=e.closest(".button-item").attr("id"),a=window.stripeBilling[i];if(a&&!e.attr("data-stripe-disable")){t.preventDefault();var o="Pay",n=parseFloat(e.data("amount")),s=e.data("currency");if("true"===e.data("subscription").toLowerCase()){o="Subscribe {{amount}}";var r=e.data("subscription_interval");r&&(o+="/"+r.toUpperCase())}a.open({name:e.data("form_name"),description:e.data("form_description"),amount:100*n,currency:s,panelLabel:o});window.addEventListener("popstate",function t(){a.close(),window.removeEventListener("popstate",t)})}}),$("a[data-integration-id][data-integration-action][data-integration-pk][data-captcha]").click(function(t){var e=$(this).attr("data-captcha");if("v2"==e)t.stopImmediatePropagation(),grecaptcha.getResponse()?submitCustomForm.call(this,t):(t.preventDefault(),$(this).parent().find(".heroik-recaptcha-error").length||$(this).before('<span class="heroik-recaptcha-error" style="color: red;">reCAPTCHA is not valid</p>'));else if("invisible"==e&&!grecaptcha.getResponse()){t.stopImmediatePropagation(),t.preventDefault();var i=$("#"+$(this).parent().first().attr("id")+"-inv-recaptcha");i.length&&$(i)[0].click()}}),$("a[data-integration-id][data-integration-action][data-integration-pk]").click(function(t){submitCustomForm.call(this,t)}),$("a[data-integration-type][data-integration-list-id][data-captcha]").click(function(t){var e=$(this).attr("data-captcha");if("v2"==e)t.stopImmediatePropagation(),grecaptcha.getResponse()?submitForm.call(this,t):(t.preventDefault(),$(this).parent().find(".heroik-recaptcha-error").length||$(this).before('<span class="heroik-recaptcha-error" style="color: red;">reCAPTCHA is not valid</p>'));else if("invisible"==e&&!grecaptcha.getResponse()){t.stopImmediatePropagation(),t.preventDefault();var i="#"+$(this).parent()[0].id+"-inv-recaptcha";$(i).click()}}),$("a[data-integration-type][data-integration-list-id]").click(function(t){submitForm.call(this,t)}),$(".newmodal-close-element, .modal-close-element").click(function(){var t=$(".contentWrapper")[0].style;t.WebkitFilter="",t.MozFilter="",t.OFilter="",t.MsFilter="",t.filter="",$(this).closest(".modal-element").removeClass("modal-visible"),$("html").css("overflow","auto"),$("body").css("overflow","initial")}),$(window).resize(function(){alignCenter($(".modal-visible .modal-vertical")),calculateVideoSize()}),$('.btn-element[href^="#popup"], .image-a-wripper[href^="#popup"], .text-block-editor-p a[href^="#popup"], .target-action-tiny a[href^="#popup"], .navigation-link[href^="#popup"]').click(function(t){t.preventDefault(),openPopup(t,t.currentTarget.getAttribute("href"))}),$("div [data-blog-url]").click(function(t){window.location.href=$(this)[0].dataset.blogUrl}),$(".blog-paginator a").click(function(t){blogsCount>0&&!t.currentTarget.hasAttribute("data-disabled")&&(t.preventDefault(),window.location.href=$(this).attr("href")+"&blogs_count="+blogsCount)}),$("a.btn-element, .text-block-editor-p a, .target-action-tiny a").click(function(t){var e=!1;if(this.dataset.hideButtonIds&&(e=!0,this.dataset.hideButtonIds.split(",").forEach(function(t,e,i){$(t).fadeOut(500)})),this.dataset.showButtonIds&&(e=!0,this.dataset.showButtonIds.split(",").forEach(function(t,e,i){var a=$(t);a.fadeIn(500),a.removeClass("hide-section"),(a.hasClass("vertical-align-top")||a.hasClass("vertical-align-middle")||a.hasClass("vertical-align-bottom"))&&a.css("display","block")})),e&&t.preventDefault(),location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var i=$(this.hash);if((i=i.length?i:$("[name="+(this.hash.slice(1)||'""')+"]")).length)return $("html, body").animate({scrollTop:i.offset().top},500),!1}}),$(document).on("keyup","input[data-integration-type]",function(t){if(13===t.keyCode){var e=$(this).attr("data-integration-type"),i=$(this).closest(".section-class-link").find('a[data-integration-type="'+e+'"]').first();e&&i.length>0&&i[0].click()}});var windowClickCallback=function(t){var e=t.target;$(e).closest(".smart-section-nav__list").length||$(e).hasClass("smart-section-nav__list")||closeDropDown()};function updateQueryStringParameter(t,e,i){var a=new RegExp("([?&])"+e+"=.*?(&|$)","i"),o=-1!==t.indexOf("?")?"&":"?";return t.match(a)?t.replace(a,"$1"+e+"="+i+"$2"):t+o+e+"="+i}if($("i.mobile-menu").click(function(t){var e;t.stopPropagation();var i=$(this).closest("nav")[0].id+"-ul",a=$("#"+i),o=$(this).closest(".section-class-link");if(o.hasClass("smart-section-nav-dropdown")){e="#"+i+"_cloned";var n=$(e);n.length&&(n.toggleClass("visually-hidden"),n.hasClass("visually-hidden")?window.removeEventListener("click",windowClickCallback):window.addEventListener("click",windowClickCallback),n.css("top",o.outerHeight()))}else a.toggleClass("mobile-menu-show");closeDropDown(e),$(this).closest(".section-class-link").toggleClass("navigation-is-active"),$(this).closest(".navigationPage").toggleClass("navigation-is-active"),$(this).toggleClass("open")}),$(".video-preview-image").click(function(t){t.stopPropagation(),$(this).css("display","none");var e=$(this).siblings()[0];e.src.length&&e.src.includes("?")&&!e.src.includes("autoplay")?e.src=e.src+"&autoplay=1":e.src.length&&!e.src.includes("?")&&(e.src=e.src+"?autoplay=1")}),$(".swipebox").click(function(){var t=$(this);setTimeout(function(){var e=t.attr("data-background"),i=t.attr("data-opacity");e?$(".mfp-bg").css("background",e):$(".mfp-bg").css("background","#0b0b0b"),i?$(".mfp-bg").css("opacity",i):$(".mfp-bg").css("opacity",.85)},1)}),$(".featherlight-video").click(function(){var t=$(this);setTimeout(function(){var e=$(t).attr("data-featherlight"),i=$(t).attr("data-autoplay");if(e){var a=$("iframe.featherlight-inner").first(),o=a.parent(),n=$.parseHTML(e),s=$(n).attr("src");i&&("true"===i.toLowerCase()||!0===i?s=updateQueryStringParameter(s,"autoplay",1):"false"!==i.toLowerCase()&&!1!==i||(s=updateQueryStringParameter(s,"autoplay",0))),$(n).attr("src",s),a.remove(),o.append(n)}},1)}),cookieData&&"undefined"!==cookieData){var cookieDataObj=JSON.parse(cookieData)[0].fields;cookieDataObj.consent_bar_visible&&(window.cookieconsent_options={message:cookieDataObj.text_to_display,dismiss:cookieDataObj.button_text,learnMore:"More info",link:null})}function sliderHandler(t,e){var i=t.find(".row.is-active-testimonial-row"),a=null,o=null;if("fade_in"==e&&(a="slide-fade-in",o="slide-fade-out"),i.hasClass("is-active-testimonial-row-clicked"))i.removeClass("is-active-testimonial-row-clicked");else{if(t.find(".fake-testimonial-row").length){var n=t.find(".row.is-active-testimonial-row").children().clone(!0,!0),s=t.find(".row.is-pre-active-testimonial-row");s.empty(),$(n).appendTo(s)}var r=i.prev();0===r.length&&(r=t.find(".row").last()),r.hasClass("is-pre-active-testimonial-row")&&r.removeClass("is-pre-active-testimonial-row").removeClass(o),i.length||(i=t.find(".row").first());var l=i.removeClass("is-active-testimonial-row").removeClass(a).addClass("is-pre-active-testimonial-row").addClass(o).next();0===l.length&&(l=t.find(".row").first()),l.hasClass("is-post-active-testimonial-row")&&l.removeClass("is-post-active-testimonial-row");var c=l.addClass("is-active-testimonial-row").addClass(a).next(),d=$(l).find(".image-shape-circle img");if(d.length&&d.resize(),0===c.length&&(c=t.find(".row").first()),c.addClass("is-post-active-testimonial-row"),t.find(".slider-testimonial").length){var p=t.find(".slider-testimonial span.active").removeClass("active").next();0===p.length&&(p=t.find("div.slider-testimonial span").first()),p.addClass("active")}}}function throttle(t,e){void 0===e&&(e=100);var i=null;return function(){if(null===i){var a=this,o=arguments;i=setTimeout(function(){t.apply(a,o),i=null},e)}}}if($(".pre-built-navigation").each(function(){$(this).parents(".col").first().addClass("column-navigation")}),$(".slider-testimonial span").click(function(t){var e,i=$(this).index(),a=$(this).closest(".is-testimonial-section");if($(this).hasClass("active"))(e=a.find(".row")[i]).classList.add("is-active-testimonial-row-clicked");else{var o,n,s,r=a.find(".row").length-1;if(0===i?(o=r,n=1):i===r?(o=r-1,n=0):(o=i-1,n=i+1),a.find(".fake-testimonial-row").length){var l=a.find(".row.is-active-testimonial-row");l.length&&l[0].classList.remove("is-active-testimonial-row-clicked"),sliderHandler(a),(s=a.find(".row.is-active-testimonial-row"))[0].classList.add("is-active-testimonial-row-clicked")}else{$(this).closest(".slider-testimonial").find(".active")[0].classList.remove("active"),$(this)[0].classList.add("active"),(e=a.find(".is-active-testimonial-row")).length&&e[0].classList.remove("is-active-testimonial-row");var c=a.find(".is-pre-active-testimonial-row");c.length&&c[0].classList.remove("is-pre-active-testimonial-row");var d=a.find(".is-post-active-testimonial-row");d.length&&d[0].classList.remove("is-post-active-testimonial-row"),a.find(".row")[n].classList.add("is-post-active-testimonial-row"),a.find(".row")[o].classList.add("is-pre-active-testimonial-row"),(s=a.find(".row")[i]).classList.add("is-active-testimonial-row","is-active-testimonial-row-clicked");var p=$(s).find(".image-shape-circle img");p.length&&p.resize()}}}),$(".is-testimonial-section").length&&$(".is-testimonial-section").each(function(){var t=$(this),e=this;$(this).find('[data-element-testimonials="is_deleted"]').each(function(t,i){var a=i.closest(".row");a&&-1!==$(a).index()&&($(e).find(".slider-testimonial span")[$(a).index()].remove(),a.remove())}),1===$(e).find(".slider-testimonial span").length&&$(e).find(".slider-testimonial span").remove();var i=0,a=$(this).find(".row.is-active-testimonial-row").first().attr("id");a||(a=$(this).find(".row").first().attr("id")),$(this).find(".row").each(function(t,e){$(e).addClass("is-active-testimonial-row");var o=$(e).find(".image-shape-circle img");o.length&&o.resize(),$(e).find(".col").each(function(t,e){i<$(e).height()+30&&(i=$(e).height()+30)}),i<$(e).height()&&(i=$(e).height()),$(e).attr("id")!==a&&$(e).removeClass("is-active-testimonial-row")}),$(this).height(i);var o=$(this).closest(".is-testimonial-section").find(".row").length,n=parseInt($(this)[0].dataset.testimonialdelay);n||(n=2e3);var s=$(this)[0].dataset.transitiontype,r=$(this).closest(".is-testimonial-section.testimonial-01").find(".is-post-active-testimonial-row.is-pre-active-testimonial-row");if(r.length){var l=r.clone();r.removeClass("is-pre-active-testimonial-row"),l.removeClass("is-post-active-testimonial-row").addClass("fake-testimonial-row"),$(l).insertAfter(r)}o&&o>1&&setInterval(function(){sliderHandler(t,s)},n)}),$('.navigation-link[href^="#"]').click(function(){if(this.hash&&"#"!=this.hash){var t=$(this.hash);t.length&&$("html, body").animate({scrollTop:t.offset().top},300)}}),$(".stick-to-top").length){var scrollLast,checkScroll=function(){var t=$(window).scrollTop(),e=$(".stick-to-top"),i=e.height();e&&e.length&&$("body").css({"padding-top":i}),t<i&&e.hasClass("fix__top")?(e.removeClass("stick-to-top__to-bottom").removeClass("stick-to-top__to-top"),e.addClass("stick-to-top__top")):e.removeClass("stick-to-top__top"),t>i&&t<scrollLast&&e.hasClass("fix__top")?e.addClass("stick-to-top__to-top"):e.removeClass("stick-to-top__to-top"),t>i&&t>scrollLast&&e.hasClass("fix__bottom")?e.addClass("stick-to-top__to-bottom"):e.removeClass("stick-to-top__to-bottom"),scrollLast=t};checkScroll(),$(window).on("scroll",throttle(checkScroll,250))}$(window).scroll(function(){var t=$(".fixed-top-position");t.length&&$(this).scrollTop()?t.addClass("sticked-nav-after-scroll"):t.length&&t.removeClass("sticked-nav-after-scroll")}),$(".section-class-link").hover(function(t){$(this).addClass("active-section-nav")},function(t){$(this).removeClass("active-section-nav")}),$(document).ready(function(){if(function(t,e){var i=e,a=t;i||(i=window.location.href),a=a.replace(/[\[\]]/g,"\\$&");var o=new RegExp("[?&]".concat(a,"(=([^&#]*)|&|#|$)")).exec(i);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null}("grid")){var t=$(".container-center-width-wrap.grid-view")[0];$(t).removeClass("hidden")}}),$(document).ready(function(){$("#tmp_nav-26978").closest(".col").addClass("navigation-page-column")}),$("#popup-16763617>.modal-element-sidebar:not(:has(.close-popup)), #popup-16763617>.modal-element-sidebar:has(.prebuilt-OptIn-1)").addClass("default-close-button").append('<a href="#" onclick="return false" class="modal-close-element"><i style="color: #2a2e4e;" class="glyphicon glyphicon-remove color"></i></a>'),$("#popup-16763617>.modal-element-sidebar:not(.default-close-button) .close-popup").append('<span class="newmodal-close-element"></span>'),$(document).ready(function(){});
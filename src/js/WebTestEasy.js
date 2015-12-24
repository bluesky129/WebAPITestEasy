/*
	Create By WFSO 2015/12/24 21:18:55
*/

!function($){
	"strict"
	if(typeof $ != "function"){
		throw new Error("Please load the jQuery!");
	}
	var HE = {
			body: $("body").html(''),
			form: $("<form>"),
			input: $("<input type='text'>"),
			file: $("<input type='file'>"),
			submit:$("<input type='submit'>"),
			script: $("<script>"),
			div: $("<div>"),
			span: $("<span>"),
			label: $("<label>"),
			p: $("<p>"),
			a: $("<a>"),
			ul: $("ul"),
			li: $("li"),
			get:function(eName){
				return this[eName].clone();
			}
		},
		array = [],
		obj = {};
	slice = array.slice;
	toString = obj.toString;
	function callBack(result){
		console.log(result);
	}
	$.fn.extend({
		addFE:function(options){
			var defaults={
				actiion:"",
				method:"POST",
				enctype:"application/x-www-form-urlencoded",
				text:[],
				file:[],
				submit:true
			};
			var options = $.extend(defaults,options||{});
			var form = HE.get("form");
			form.attr("action",options.action).attr("method",options.method).attr("enctype",options.enctype);
			form.addText(options.text);
			form.addFile(options.file);
			form.addSubmit();
			if($.type(this) === "string"){
				$(this[0]).append(form);
			}else{
				this.append(form);
			}
			return this;
		},
		addForm:function(){
			var form = HE.get("form");
			form.addText(slice.call(arguments));
			form.addSubmit();
			if($.type(this) === "string"){
				$(this[0]).append(form);
			}else{
				this.append(form);
			}
			return this;
		},
		addText:function(){
			var array = [];
			for(var i in arguments){
				if(typeof arguments[i] === "string"){
					var div = HE.get("div");
					var label = HE.get("label").text(arguments[i]);
					var input = HE.get("input").attr("name",arguments[i]);
					div.append(label).append(input);
					array.push(div);
				}
			}
			if($.type(this) === "string"){
				$(this[0]).append(array);
			}else{
				this.append(array);
			}
			return this;
		},
		addFile:function(){
			var array = [];
			for(var i in arguments){
				if(typeof arguments[i] === "string"){
					var div = HE.get("div");
					var label = HE.get("label").text(arguments[i]);
					var file = HE.get("file").attr("name",arguments[i]);
					div.append(label).append(file);
					array.push(div);
				}
			}
			if($.type(this) === "string"){
				$(this[0]).append(array);
			}else{
				this.append(array);
			}
			return this;
		},
		addSubmit:function(){
			var submit = HE.submit.clone();
			if($.type(this) === "string"){
				$(this[0]).append(submit);
			}else{
				this.append(submit);
			}
			return this;
		},
		bindSubmit:function(){
			return this.undelegate("form","submit").delegate("form","submit",function(){
				this.ajaxSubmit();
				return false;
			});
		},
		unbindSubmit:function(){
			return this.undelegate("form","submit");
		},
		ajaxSubmit:function(){
			var data = this.serialize();
			var method = $.get;
			if(this.attr("method").toLowerCase() == "post"){
				method = $.post;
			}
			method(this.attr("action"),data,callBack);
			return this;
		}
	});

}(jQuery);
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
			div:$("<div class='layer'>"),
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
	function parseArguments(args){
		console.log(args.length);
		console.log( $.type(args[0]));
		if(args.length == 1 && $.type(args[0]) === "array"){
			return args[0];
		}else{
			return slice.call(args);
		}
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
			if(options.id){
				form.attr("id",options.id);
			}
			if(options.class){
				form.addClass(options.class);
			}
			form.addText(options.text);
			if(options.file.length){
				form.attr("enctype","multipart/form-data");
			}
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
			console.log(arguments);
			var array = [];
			var args = parseArguments(arguments);
			console.log(args);
			for(var i in args){
				if(typeof args[i] === "string"){
					var div = HE.get("div");
					var label = HE.get("label").text(args[i]);
					var input = HE.get("input").attr("name",args[i]);
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
			var args = parseArguments(arguments);
			for(var i in args){
				if(typeof args[i] === "string"){
					var div = HE.get("div");
					var label = HE.get("label").text(args[i]);
					var file = HE.get("file").attr("name",args[i]);
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
			this.undelegate("form","submit");
			this.delegate("form","submit",function(e){
				console.log(e.target);
				$(e.target).ajaxSubmit();
				console.log($(e.target));
				return false;
			});
			return this;
		},
		unbindSubmit:function(){
			return this.undelegate("form","submit");
		},
		ajaxSubmit:function(){
			var defaults={
					success:callBack,
					contentType:"application/x-www-form-urlencoded",
					type:"get"
				},
				setting = {
					url:this.attr("action")
				};

			var data = {};
			var arrData = this.serializeArray();
			for(var i in arrData){
				if(arrData[i].name && arrData[i].value){
					data[arrData[i].name] = arrData[i].value;
				}
			}
			if(this.attr("enctype") == "application/json"){
				setting.data = JSON.stringify(data);
			}else{
				setting.data = data;
			}
			if(this.attr("method")){
				setting.type=this.attr("method");
			}
			if(this.attr("enctype")){
				setting.contentType=this.attr("enctype");
			}
			var options = $.extend(defaults,setting);
			$.ajax(options);
			return this;
		}
	});

}(jQuery);
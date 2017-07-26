function l(l){ console.log(l);};
function makeMovable(element){
  if(!element.style.position=="fixed" || !element.style.position=="absolute" ){
    console.log("Make sure that your movale element has either fixed or absolute position");
    return false;
  }

  element.click=function(e){
    l(window.event.clientX);
    l(window.event.clienty);
    x_pos = b.all ? a.event.clientX : e.pageX;
      y_pos = b.all ? a.event.clientY : e.pageY;

  };
}






//-----------------------------------------------------


var $qc={
  showUserControl:false,
  ele:document.body,
  event:null,
  buttonClose:null,
  html:{input:null,select:null,display:null,min:null,close:null,
    run:null,prev:null,next:null,box:null,mainbody:null,parent:null, child:null,infoEle:null,
  },
  elementCreator:function(){
            var element=document.createElement(arguments[0]);
            
          //initilaize arrtibutes
          for (var i=1; i<arguments.length ; i++) {
            var each=arguments[i]
            if(typeof(each)==='object'){
              for (keys in each) {
                if(keys==='text'){
                  var text=document.createTextNode(each[keys]);
                  element.appendChild(text);
                  continue;
                }
                element.setAttribute(keys,each[keys]);
              }
            }
          }
          return element;
      
  },
  qcBoxToHtml:function(){
    
var divMainBox=this.elementCreator("div", {class:"dont-include", id:"qc-main-box", style:"z-index:100000;top:10px;right:10px;position:fixed;width:300px;height:50px;box-shadow:0 0 5px grey;background-color:#eee;padding:10px;font-family:monospace"});
 document.body.appendChild(divMainBox);

var divMinClose=this.elementCreator("div" , {class:"dont-include", style:"position: absolute; top:2px;z-index:100001; right:2px"});
divMainBox.appendChild(divMinClose);
var buttonMin=this.elementCreator("button" ,{ id:"qc-min",   class:"dont-include" ,style:"padding:2px;font-size: 9px;  font-weight: bold;color:orange", text:"-"});
var buttonClose=this.elementCreator("button", { id:"qc-close" , class:"dont-include",style:"padding:2px; font-size: 9px;color:red;", text:"X"});
divMinClose.appendChild(buttonMin);
divMinClose.appendChild(buttonClose);

var divMainBody=this.elementCreator("div",{id:"qc-main-body", class:"dont-include"}); 
    divMainBox.appendChild(divMainBody);

    var divSectionSelect=this.elementCreator("div", {class:"dont-include" , style:" padding:2px;position: absolute;top: 18px; "});
        divMainBody.appendChild(divSectionSelect);
     var select=this.elementCreator("select", { id:"qc-select-action" , class:"dont-include" ,style:"border:1px solid #ccc;outline:none"});
       this.actionList.forEach(function(each){
        select.innerHTML=select.innerHTML +"<option class='dont-include'>"+each+"</option>";
       });
        
    var input=this.elementCreator("input" , {class:"dont-include",  type:"text", style:"border:1px solid #ccc;outline:none;width:185px;" ,id:"quick-change-input-field"});
    divSectionSelect.appendChild(select);
        divSectionSelect.appendChild(input);
    var divSectionButton=this.elementCreator("div" ,{class:"dont-include", style:"position: absolute; top: 2px; width:95%"});
        divMainBody.append(divSectionButton);
        var buttonPrev=this.elementCreator("button", {style:"padding:2px;margin-right:3px;font-size: 9px" ,class:"dont-include",id:"buttonPrev",text:'Prev'});
        var buttonNext=this.elementCreator("button", {style:"padding:2px;margin-right:3px;font-size: 9px" ,class:"dont-include",id:"buttonNext",text:'Next'});
        var buttonParent=this.elementCreator("button", {style:"padding:2px;margin-right:3px;font-size: 9px" ,class:"dont-include",id:"buttonParent",text:'Parent'});
        var buttonChild=this.elementCreator("button", {style:"padding:2px;margin-right:3px;font-size: 9px" ,class:"dont-include",id:"buttonChild",text:'Child'});
        
        var spanInfoEle=this.elementCreator("span", {id:"infoEle", class:"dont-include", style:"padding:2px;margin:0 10px;font-size: 11px;color:orange; cursor:help; border-bottom: 1px dashed green;", title:"Currently Selected Element",text:"body"});
        var buttonRun=this.elementCreator("button", {style:"padding:2px;font-size: 9px" ,class:"dont-include",id:"qc-runBut",text:'Run'});
        divSectionButton.appendChild(buttonPrev);
        divSectionButton.appendChild(buttonNext);
        divSectionButton.appendChild(buttonParent);
        divSectionButton.appendChild(buttonChild);
        divSectionButton.appendChild(spanInfoEle);
        divSectionButton.appendChild(buttonRun);
    
    
var divSectionTexare=this.elementCreator("div", {class:"dont-include"});
divMainBody.append(divSectionTexare);
var textarea=this.elementCreator("textarea",{style:"resize:vertical;position:absolute;text-align:start; background:#19383D;color:#eee;font-size:14px; font-family:monospace;width:98%;margin:-10px; max-width:98%;overflow:auto;top:50px;height:30px;max-height:590px;border:1px solid #ccc;outline:none", class:"dont-include", id:"quick-change-text-field"});
divSectionTexare.appendChild(textarea);
this.display=textarea;
this.input=input;
this.select=select;
this.html.input=input;
this.html.select=select;
this.html.display=textarea;
this.html.min=buttonMin;
this.html.close=buttonClose;
    this.html.run=buttonRun;
     this.html.prev=buttonPrev;
     this.html.next=buttonNext;
     this.html.parent=buttonParent;
     this.html.child=buttonChild;
     this.html.box=divMainBox;
     this.html.mainbody=divMainBody;
     this.html.infoEle=spanInfoEle;


return true;
  },
  actionList:[
        
        "querySelector",
        "class",
        "id",
        "event",
        "setAttribute",
        "innerHTML",
        "innerText",
        "style",
        "script",
        "hasAttribute",
        ],
  display:document.getElementById('quick-change-text-field'),
  runBut:document.getElementById('qc-runBut'),
  infoEle:document.getElementById('infoEle'),
  infoMsg:null,
  add:function(name,obj){
    if(this.actionList.indexOf(name)!= -1){
      console.error("There is already a option with name '"+name+"' Choose another name?");
      return false;
    }
    this.actionList.push(name);
      this.action[name]={
      onSelect:function(){
        //do nothing
      },
      onInput:function(){
        v
      },
      onRun:function(){//donothing
      },
    };
    if(obj){
      if(obj.onSelect){this.action[name].onSelect=obj.onSelect;}
    if(obj.onInput){ this.action[name].onInput=obj.onInput;}
    if(obj.onRun) {this.action[name].onRun=obj.onRun;}
    }
     return this.action[name];
    
  },
  minCloseMax:function(){
            $qc.html.min.onclick=function(){
              
          if(this.innerHTML=='-'){
            $qc.html.mainbody.style.display="none";
            this.innerHTML='+';
            $qc.html.box.style.width="27px";
            $qc.html.box.style.height="1px";
            
          }else{
            $qc.html.mainbody.style.display="block";
            this.innerHTML='-';
            $qc.html.box.style.width="300px";
            $qc.html.box.style.height="50px";
          }
        };
        $qc.html.close.onclick=function(){
          
          if (confirm('Are you sure you want to close?')) {

               $qc.html.box.parentNode.removeChild($qc.html.box);
            } else {
                // Do nothing!
            }
            
          
        };
  },
  init:function(){
    if(!this.qcBoxToHtml()) return false;
    this.selectByClick();
      this.buttonRole();
      this.minCloseMax();
      this.html.display.addEventListener("keydown",function(e){
                var code = (e.keyCode ? e.keyCode : e.which);
                
                //if(code==32 ||code==13||code==8){
                if(code==13){
                
                    this.style.height=parseInt(this.style.height) +12 +"px";
                }
              
                });

      this.html.input.addEventListener("keydown",function(e){
                var code = (e.keyCode ? e.keyCode : e.which);
                
                //if(code==32 ||code==13||code==8){
                if(code==13){
                
                    if($qc.html.select.value && $qc.html.input.value){
                      $qc.action[$qc.html.select.value.trim()].onInput();
                }
              }
                });
        this.html.select.onchange=function(){
          $qc.html.input.style.cursor="auto";
          $qc.html.input.placeholder="";
          $qc.html.input.value="";
          $qc.html.display.value="";
          $qc.html.display.style.height="30px";
          if(!$qc.html.select.value) return false;
          $qc.action[$qc.html.select.value.trim()].onSelect();
        };

        this.html.input.onchange=function(){
          if($qc.html.select.value && $qc.html.input.value){
            $qc.action[$qc.html.select.value.trim()].onInput();
          }
        };

        this.html.run.onclick=function(e){

          if($qc.html.select.value){
            
            $qc.action[$qc.html.select.value.trim()].onRun();
          }
            e.stopPropagation();
            e.preventDefault();
        };
         
      
    
  },
  selectByClick:function(element){
    
    var elements=element && isHTMLElement(element)?element:document.getElementsByTagName('*');
      Array.prototype.forEach.call(elements,function(el){
           //if(!el.classList.contains("dont-include")){
            el.addEventListener("click",function(e){
                //console.log(this);
                if(!el.classList.contains("dont-include")){
                  
                    //var oldClass=this.getAttribute("class");
                     //classNameInput.value=oldClass;
                     //currentElement.style.border="";
                     
                     $qc.ele=this;
                     if($qc.html.select.value){
                      $qc.action[$qc.html.select.value.trim()].onSelect();
                        if($qc.html.input.value) $qc.action[$qc.html.select.value.trim()].onInput();
                        
                      }
                                 //this.style.boxShadow="0px 0px 5px #ccc";
                     $qc.html.infoEle.innerText=this.nodeName.toLowerCase()+"#"+this.id;

                     //infoBarMsg="";
                     
                }
                
                e.stopPropagation();
                e.preventDefault();

              },false);
        //}
    });
    


  },
  buttonRole:function(){
    
    var buttonParent=$qc.html.parent;
        var buttonPrev=$qc.html.prev;
        var buttonNext=$qc.html.next;
        var buttonChild=$qc.html.child;
  
       
        nextElement=function(){
          
            if($qc.ele.nextElementSibling && $qc.ele.nextElementSibling.classList.contains("dont-include")){ return false;}
            return $qc.ele.nextElementSibling;
        };
        prevElement=function(){
            return $qc.ele.previousElementSibling;
        };
        childElement=function(){
            return $qc.ele.firstElementChild;
        };
        parent=function(){
            return $qc.ele.parentElement;
        };
        
        buttonNext.onclick=function(){
            if(nextElement()){
                //currentElement.style.border="";

                $qc.ele=nextElement();
                $qc.html.infoEle.innerText=$qc.ele.nodeName.toLowerCase()+"#"+$qc.ele.id;
                if($qc.html.select.value){
                      $qc.action[$qc.html.select.value.trim()].onSelect();
                        if($qc.html.input.value) $qc.action[$qc.html.select.value.trim()].onInput();
                        
                      }

               //$qc.infoMsg.innerHTML="";
            }else{
                
                //$qc.infoMsg.innerHTML="("+"<span style='color:red'>It has no next sibling Element</span>)";
                return false;
            }
        };
        buttonPrev.onclick=function(){
            if(prevElement()){
                //$qc.ele.style.border="";
                $qc.ele=prevElement();
                $qc.html.infoEle.innerText=$qc.ele.nodeName.toLowerCase()+"#"+$qc.ele.id;
                if($qc.html.select.value){
                      $qc.action[$qc.html.select.value.trim()].onSelect();
                        if($qc.html.input.value) $qc.action[$qc.html.select.value.trim()].onInput();
                        
                      }
                //$qc.infoMsg.innerHTML="";
                
            }else{
                //console.log("clicked");
                //$qc.infoMsg.innerHTML="("+"<span style='color:red'>It has no Previous sibling Element</span>)";
                return false;
            }
        };
        buttonParent.onclick=function(){
            if(parent()){
                //$qc.ele.style.border="";
                $qc.ele=parent();
                $qc.html.infoEle.innerText=$qc.ele.nodeName.toLowerCase()+"#"+$qc.ele.id;
                if($qc.html.select.value){
                      $qc.action[$qc.html.select.value.trim()].onSelect();
                        if($qc.html.input.value) $qc.action[$qc.html.select.value.trim()].onInput();
                        
                      }
                //$qc.infoMsg.innerHTML="";
                
            }else{
                //console.log("clicked");
                //$qc.infoMsg.innerHTML="("+"<span style='color:red'>It has no Parent Element</span>)";
                return false;
            }
        };
        buttonChild.onclick=function(){
            if(childElement()){
                //$qc.ele.style.border="";
                $qc.ele=childElement();
                $qc.html.infoEle.innerText=$qc.ele.nodeName.toLowerCase()+"#"+$qc.ele.id;
                if($qc.html.select.value){
                      $qc.action[$qc.html.select.value.trim()].onSelect();
                        if($qc.html.input.value) $qc.action[$qc.html.select.value.trim()].onInput();
                        
                      }
                //$qc.infoMsg.innerHTML="";
                
            }else{
                //console.log("clicked");
                //$qc.infoMsg.innerHTML="("+"<span style='color:red'>It has no child Element</span>)";
                return false;
            }
        }
        
  },
  action:{
    class:{
      onSelect:function(){
        $qc.html.input.value=$qc.ele.getAttribute('class');
        
      },
      onInput:function(){
        $qc.ele.setAttribute("class",$qc.html.input.value);
      },
      onRun:function(){
        //do Nothing;
      },
    },

    id:{
      onSelect:function(){
        $qc.html.input.value=$qc.ele.id;
      },
      onInput:function(){
        $qc.ele.setAttribute("id",$qc.html.input.value);
      },
      onRun:function(){},
    },

    event:{
      onSelect:function(){
        $qc.html.input.placeholder="type event eg. click";
      },
      onInput:function(){
        $qc.event=$qc.html.input.value.trim();
        $qc.html.display.value="function(e){\n\n\n}";
        $qc.html.display.style.height="70px";
      },
      onRun:function(){
        if(!$qc.html.input.value.trim()) return false;
        var f=new Function("a", "return b="+$qc.html.display.value);
          if($qc.ele.addEventListener){ 
          $qc.ele.addEventListener($qc.event,f(),false);
          return true;
        }else{
          $qc.ele.attachEvent("on"+$qc.event,f());
          return true;
        }
      },
    },

    script:{
      onSelect:function(){
        //do nothing
      },
      onInput:function(){
        //
      },
      onRun:function(){
        if(!$qc.html.select.value=="script") return false;
        var s=document.createElement("script");
        s.innerText="try{" + $qc.html.display.value + ";}catch(e){console.error(e);}";
        document.body.append(s);
        s.parentNode.removeChild(s);
      },
    },

    style:{
      onSelect:function(){
        //do nothing
      },
      onInput:function(){
        var propertyNvalue=$qc.html.input.value.replace(";","").replace(/"/g,"").split(/:|=/);
         $qc.ele.style[propertyNvalue[0].replace(/-([a-z])/g,function(m){return m[1].toUpperCase();})]=propertyNvalue[1];
      },
      onRun:function(){//donothing
      },
    },

    hasAttribute:{
      onSelect:function(){
        //do nothing
      },
      onInput:function(){
        //
        if($qc.ele.hasAttribute($qc.html.input.value)){
          $qc.html.display.value="yes:'"+$qc.html.input.value+"="+$qc.ele.getAttribute($qc.html.input.value)+"'";

        }else{
          $qc.html.display.value="No";
        }
      },
      onRun:function(){},
    },

    innerText:{
      onSelect:function(){
        $qc.html.display.value=$qc.ele.innerText;
        $qc.html.input.style.cursor="not-allowed";
      },
      onInput:function(){
        //do nothing
      },
      onRun:function(){
        $qc.ele.innerText=$qc.html.display.value;
        $qc.html.input.style.cursor="auto";
      },
    },
    sample:{
      onSelect:function(){
        //do nothing
      },
      onInput:function(){
        //
      },
      onRun:function(){},
    },
  
    setAttribute:{
      onSelect:function(){
        //do nothing
      },
      onInput:function(){
        var input=$qc.html.input.value.trim().split(/:|=/);
        if(!input.length==2) return false;

        $qc.ele.setAttribute(input[0],input[1].replace(/'|"/g,""));
      },
      onRun:function(){},
    },

    innerHTML:{
      onSelect:function(){
        $qc.html.display.value=$qc.ele.innerHTML;
        $qc.html.input.style.cursor="not-allowed";
      },
      onInput:function(){
        //do nothing
      },
      onRun:function(){
        $qc.ele.innerHTML=$qc.html.display.value;
        $qc.html.input.style.cursor="auto";
      },
    },
    querySelector:{
      onSelect:function(){
        //
      },
      onInput:function(){
        //do nothing 
        if(document.querySelector($qc.html.input.value)){
          $qc.ele=document.querySelector($qc.html.input.value);
          if($qc.ele){
            $qc.html.infoEle.innerText=$qc.ele.nodeName.toLowerCase()+"#"+$qc.ele.id;
          }
        }
        
        
        
      },
      onRun:function(){
        //do nothing

      },
    },
  }

}

$qc.init();













var	acssDesignBarLocked=false;
var currentElement=modifyElement(document.body);
var acssInputField;
// var infoMsg;
// var infoEle;

// function setClassToField(){
// 	acssInputField.value=currentElement.element.getAttribute('class');
// }
function acssInputHandler(){
	// console.log(acssInputField);
	acssInputField.addEventListener("keydown",function(e){
                if(acssDesignBarLocked){return false;}
                var code = (e.keyCode ? e.keyCode : e.which);
                //if(code==8){getClassList="";}
                if(code==32 ||code==13||code==8){
                    if(acssInputField.value.trim()){
                            currentElement.element.setAttribute("class",acssInputField.value.trim());
                    		classPrinter.main(currentElement.element);
                    
                    }
                }
                });
}
function buttonRole(){
		var buttonParent=document.getElementById("buttonParent");
        var buttonPrev=document.getElementById("buttonPrev");
        var buttonNext=document.getElementById("buttonNext");
        var buttonChild=document.getElementById("buttonChild"); 
  
       
        nextElement=function(){
        	
        		if(currentElement.element.nextElementSibling && currentElement.element.nextElementSibling.classList.contains("dont-include")){ return false;}
            return currentElement.element.nextElementSibling;
        };
        prevElement=function(){
            return currentElement.element.previousElementSibling;
        };
        childElement=function(){
            return currentElement.element.firstElementChild;
        };
        parent=function(){
            return currentElement.element.parentElement;
        };
        
        buttonNext.onclick=function(){
            if(nextElement()){
                //currentElement.style.border="";
                currentElement=modifyElement(nextElement());
                infoEle.innerText=currentElement.element.nodeName.toLowerCase()+"#"+currentElement.element.id;

		           infoMsg.innerHTML="";
		           setClassToField();
                 //settleOldClass(currentElement);
            }else{
                
                infoMsg.innerHTML="("+"<span style='color:red'>It has no next sibling Element</span>)";
                return false;
            }
        };
        buttonPrev.onclick=function(){
            if(prevElement()){
                //currentElement.style.border="";
                currentElement=modifyElement(prevElement());
                infoEle.innerText=currentElement.element.nodeName.toLowerCase()+"#"+currentElement.element.id;
                infoMsg.innerHTML="";
                setClassToField();
                 //settleOldClass(currentElement);
            }else{
                //console.log("clicked");
                infoMsg.innerHTML="("+"<span style='color:red'>It has no Previous sibling Element</span>)";
                return false;
            }
        };
        buttonParent.onclick=function(){
            if(parent()){
                //currentElement.style.border="";
                currentElement=modifyElement(parent());
                infoEle.innerText=currentElement.element.nodeName.toLowerCase()+"#"+currentElement.element.id;
                infoMsg.innerHTML="";
                setClassToField();
                 //settleOldClass(currentElement);
            }else{
                //console.log("clicked");
                infoMsg.innerHTML="("+"<span style='color:red'>It has no Parent Element</span>)";
                return false;
            }
        };
        buttonChild.onclick=function(){
            if(childElement()){
                //currentElement.style.border="";
                currentElement=modifyElement(childElement());
                infoEle.innerText=currentElement.element.nodeName.toLowerCase()+"#"+currentElement.element.id;
                infoMsg.innerHTML="";
                setClassToField();
                 //settleOldClass(currentElement);
            }else{
                //console.log("clicked");
                infoMsg.innerHTML="("+"<span style='color:red'>It has no child Element</span>)";
                return false;
            }
        };

        // buttonSave.onclick=function(){
        //     //doing nothigs now
        // };
        // buttonCancel.onclick=function(){
        //     classNameInput.value=oldClass;
        // }
};
function quickChangeSelectOnClick(element){
		var elements=element && isHTMLElement(element)?element:document.getElementsByTagName('*');
    	Array.prototype.forEach.call(elements,function(el){
        	 //if(!el.classList.contains("dont-include")){
		        el.addEventListener("click",function(e){
		            //console.log(this);
		            if(!el.classList.contains("dont-include")){
		            	
		                //var oldClass=this.getAttribute("class");
		                 //classNameInput.value=oldClass;
		                 //currentElement.style.border="";
		                 currentElement=modifyElement(this);
		                 //this.style.boxShadow="0px 0px 5px #ccc";
		                 //settleOldClass();
		                 infoEle.innerText=this.nodeName.toLowerCase()+"#"+this.id;

		                 infoBarMsg="";
		                 setClassToField();
		            }
		            
		            e.stopPropagation();
		            e.preventDefault();

		        	},false);
	    	//}
		});
    };//end of quickChangeventilizer

    function quickChangeSelectByIdInput(selector){
    	if(isHTMLElement(selector)){
    		selector.onchange=function(){
    			//console.log(this.value);
	            if(document.getElementById(this.value)){
	            	
	                currentElement=modifyElement(document.getElementById(this.value));
	                infoMsg='';
	                infoEle.innerText=currentElement.element.nodeName.toLowerCase()+"#"+currentElement.element.id;
	                setClassToField();
	                //currentElement.element.style.boxShadow="0px 0px 5px #ccc";
	                //settleOldClass(currentElement);
	            }else{
	                infoMsg="("+"<span style='color:red'>There is no element with id:"+this.value+"</span>)";
	            }
	            
	        };
    	}

    };//End of Selector

 function actionHandle(action,statement){
 	console.log(action);
 		if(action=='raw'){
 			var s=new Element("script");//"try{" + script+ "}catch(e){console.log(e);}";
 			s.text("try{" +statement+ ";}catch(e){console.error(e);}");
 			s.appendTo(document.body).remove();
 		}else if(action=='apendTo'){

 		}else{
 			//"currentElement."+action+"("+statement+")";
 			//currentElement[action](statement);
 			var s=new Element("script");//"try{" + script+ "}catch(e){console.log(e);}";
 			s.text("currentElement."+action+"("+statement.replace(/[/][/].+ /g, "")+");");

 			s.appendTo(document.body).remove();
            
 		}
 } 

function main(){
	//init()
	//actionHandle
	var action=document.getElementById("quickChangeSelect").value;
	//console.log(action);
	var script=document.getElementById("quickChangeTextArea").value;
	actionHandle(action,script);

}
 
function quickChangeSelectAction(selectAction){
document.getElementById(selectAction).onchange=function(){
	if(actionObj.hasOwnProperty(this.value)){
		document.getElementById("quickChangeTextArea").value="" + actionObj[this.value].sample;
	}
}
}
function init(click){
	launchQuickChange();
	
 acssInputField=document.getElementById('quickChangeAcssInput')||"hello";
 var infoMsg=document.getElementById('infoMsg');
 var infoEle=document.getElementById('infoEle');
// action="";
//var acssInputField=document.getElementById('quickChangeAcssInput');
var oldElement="";
      quickChangeSelectOnClick();
      quickChangeSelectByIdInput(document.getElementById("quickChangeIdInput"));
      quickChangeSelectAction("quickChangeSelect");
      buttonRole();
      acssInputHandler();
      document.getElementById("quickChangeApplyButton").onclick=function(){
    	//currentElement.element.style.boxShadow="";
		main();

    };
    document.getElementById("quickChangeMin").onclick=function(){
	if(this.innerHTML=='Hide'){
		document.getElementById("quickChangeDisplay").style.display="none";
		this.innerHTML="Show";
		document.getElementById("quickChangeBox").style.width="75px";
		document.getElementById("quickChangeBox").style.height="10px";
		
	}else{
		document.getElementById("quickChangeDisplay").style.display="block";
		this.innerHTML="Hide";
		document.getElementById("quickChangeBox").style.width="250px";
		document.getElementById("quickChangeBox").style.height="300px";
	}
};
document.getElementById("quickChangeClose").onclick=function(){
	if (confirm('Are you sure you want to close?')) {
    // Save it!
    document.getElementById("quickChangeBox").style.display="none";
		} else {
		    // Do nothing!
		}
		
	
};


	}//end of init
	
//--------------ScriptManager-------------

//---------------------------action Helper----------------------//
var actionObj={

  forEachChild:{
	  	desc:'',
	   sample:'function(e){\n\n\n}\n'
	},
  forAllChild:{
	  	desc:'',
	   sample:'function(e){\n\n\n}'
	   },//'Affects all childs and childs of child',
  text:{
	  	desc:'',
	   sample:'"Type you text inside the quote "'
	   },//'Append supplied text to the Element.',
  setAttr:{
	  	desc:'Give the name of attribute followed by its value seperated by ",", you can type ", true" to append with current values',
	   sample:'"src", "../img/example.png"'
	   },//'SetAttribute, e.g class, text-danger',
  delAttr:{
	  	desc:'Removes Given Attribute',
	   sample:'"src"'
	   },//'Removes the given Attribute',
  append:{
	  	desc:'Append element you can create new element, if you leave blank a new div will get appended',
	   sample:'"h1",{id:"h1", class:"text-success",text:"Hello World"}'
	   },//'Append',
  appendTo:{
	  	desc:'Append Current selected Element to another Element give the id or click once you selected the menu',
	   sample:'"idOfElementwhereYouWantToAppend"'
	   },//'Apend this elemnent to another element',
  styler:{
	  	desc:'gives  element a style in bulk',
	   sample:"{width:'30px',height:'60px','\'font-family\':'monospace'}"
	   },//"{'width':'30px','height':'60px'} or width:30px" ,
  event:{
	  	desc:'Give you element multiple event liseners or single click, function(){} ',
	   sample:'{\nclick:function(){\n this.style.color="red"\n}, \nmouseup:function(){\n//some actons\n}\n}' 
	   },//'Give a event and callback function e.g click:function(){}',
  if:{
	  	desc:'Type condition followed by action on true and action on false',
	   sample:'currentElement.element.id,\n function(e){\n alert(e.element.id);\n},\n function(e){\nalert("This Element has no id");\n}'
	},
  remove:{
	  	desc:'Removes Currently Selected element out of DOM tree',
	   sample:''
	},
	  replace:{
  	  	desc:'Replaces current Selected element with given Element in DOM tree',
  	   sample:'"li",{id:"newli", text:"This is new List", class:"someClasses"'
  	},
  feedData:{
      	desc:'Get Data from Remote using Ajax pass source ',
       sample:'"http://www.abcxyz.com/test.html",\nfunction(response,currentElement){}\n',
   },
  
};

// --------------------------------HTML Display-----------------------------
function launchQuickChange(){
	var innerHTML='<div id="quickChangeBox" style="margin:20px;width:250px;height:300px;position:fixed;bottom:0;right:0;box-shadow:0 0 5px grey;background-color:#eee;padding:10px;font-family:monospace" class="dont-include"> \
<div class="dont-include" style="display:inline-block;position:absolute;right:5px;bottom:4px"> \
<button class="dont-include" id="quickChangeMin">Hide</button>\
 <button class="dont-include" id="quickChangeClose">X</button>\
</div>\
<div id="quickChangeDisplay" class="dont-include">\
<header style="font-size:11px;border:1px solid #eee" class="dont-include" style=""> Working Element:\
<span style="color:orange" class="dont-include" id="infoEle">body</span>\
<span class="dont-include" id="infoMsg"></span> <br>\
<small class="dont-include">Click element on this page to select</small>\
</header>\
<div style="" class="dont-include">\
<div class="dont-include" style="">\
<label class="dont-include">Select by id </label>\
<input type="text" style="" id="quickChangeIdInput" class="dont-include" placeholder="type id without #">\
<div id="selectOption" class="dont-include" style="display:inline-block;font-size:11px">\
<button type="" class="dont-include" id="buttonPrev">Prev</button>\
<button type="" class="dont-include" id="buttonNext">Next</button>\
<button type="" class="dont-include" id="buttonParent">Parent</button>\
<button type="" class="dont-include" id="buttonChild">Child</button>\
</div>\
</div>\
</div>\
<div class="dont-include" style="margin:5px 0">\
<input type="" id="quickChangeAcssInput" class="dont-include" style="height:20px;width:106%;margin:0 -10px;border:1px solid #ccc;outline:none" placeholder="Input ACSS class names">\
</div>\
<div style="" class="dont-include">\
<div id="actiontab" class="dont-include">\
<label class="dont-include">Action</label>\
<select class="dont-include" id="quickChangeSelect">\
<option>raw</option>\
<option>forEachChild</option>\
<option>forAllChild</option>\
<option>text</option>\
<option>setAttr</option>\
<option>delAttr</option>\
<option>append</option>\
<option>appendTo</option>\
<option>styler</option>\
<option>event</option>\
<option>if</option>\
<option>remove</option>\
<option>replace</option>\
<option>feedData</option>\
</select>\
</div>\
<br>\
<div>\
<textarea style="background:#19383D;color:#eee;font-size:14px; font-family:monospace;width:265px;margin:0 -10px;border-radius:5px;height:150px;border:1px solid #ccc;outline:none" class="dont-include" id="quickChangeTextArea">\
\
                </textarea>\
</div>\
<button id="quickChangeApplyButton" class="dont-include" style="font-size:11px">Done</button>\
</div>\
</div> \
</div> ';
	
// var box=document.createElement("div");
// box.innerHTML=innerHTML;
// document.body.append(box);
};

//init();
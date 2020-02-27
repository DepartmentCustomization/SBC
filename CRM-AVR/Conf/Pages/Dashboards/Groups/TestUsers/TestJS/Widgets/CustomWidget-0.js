(function () {
  return {
    /*
    <div class="mahi_holder">
    <div class="container">
      <div class="row bg_1">
        <h2><i>Введите данные пользователя</i></h2>
        <div class="col-3">
            <input class="effect-9" type="text" placeholder="Пользователь">
              <span class="focus-border">
                <i></i>
              </span>
          </div>
          <span>
            <button type="button" class="btn btn--primary btn--inside uppercase">Send</button>
            
            
          </span>
      </div>
    </div>
</div>
*/
    
    title: [],
    hint: '',
    formatTitle: function() {},
    customConfig:
                `
                <style>
                .disabledbutton {
    pointer-events: none;
    opacity: 0.4;
}.

.modal1 {
                            display: none;
                            position: fixed;
                            z-index: 0; 
                            left: 0;
                            bottom:-63px;
                            width: 100%;
                            height: 100%; 
                            overflow: auto; 
                            background-color: rgb(0,0,0); 
                            background-color: rgba(0,0,0,0.4);
                        }
                        
                        .modal1-content {
                            background-color: #fefefe;
                            border-radius:5px;
                            margin: 15% auto; 
                            padding: 20px;
                            border: 1px solid #888;
                            width: 80%; 
                            height: 55%;
                            box-shadow: rgb(178, 178, 178) 1px 1px 2px;
                        }
                        
                        .close1 {
                            position: relative;
                            top: -25px;
                            right: -10px;
                            color: #aaa;
                            float: right;
                            font-size: 28px;
                            font-weight: bold;
                        }
                        
                        .close1:hover,
                        .close1:focus {
                            color: black;
                            text-decoration: none;
                            cursor: pointer;
                        }


input,
span,
label,
textarea {
  font-family: 'Ubuntu', sans-serif;
  display: block;
  margin: 10px;
  padding: 5px;
  border: none;
  font-size: 22px;
}

textarea:focus,
input:focus {
  outline: 0;
}
/* Question */

input.question,
textarea.question {
  font-size: 48px;
  font-weight: 300;
  border-radius: 2px;
  margin: 0;
  border: none;
  width: 80%;
  background: rgba(0, 0, 0, 0);
  transition: padding-top 0.2s ease, margin-top 0.2s ease;
  overflow-x: hidden; /* Hack to make "rows" attribute apply in Firefox. */
}
/* Underline and Placeholder */

input.question + label,
textarea.question + label {
  display: block;
  position: relative;
  white-space: nowrap;
  padding: 0;
  margin: 0;
  width: 10%;
  border-top: 1px solid red;
  -webkit-transition: width 0.4s ease;
  transition: width 0.4s ease;
  height: 0px;
}

input.question:focus + label,
textarea.question:focus + label {
  width: 80%;
}

input.question:focus,
input.question:valid {
  padding-top: 35px;
}

textarea.question:valid,
textarea.question:focus {
  margin-top: 35px;
}

input.question:focus + label > span,
input.question:valid + label > span {
  top: -100px;
  font-size: 22px;
  color: #333;
}

textarea.question:focus + label > span,
textarea.question:valid + label > span {
  top: -150px;
  font-size: 22px;
  color: #333;
}

input.question:valid + label,
textarea.question:valid + label {
  border-color: green;
}

input.question:invalid,
textarea.question:invalid {
  box-shadow: none;
}

input.question + label > span,
textarea.question + label > span {
  font-weight: 300;
  margin: 0;
  position: absolute;
  color: #8F8F8F;
  font-size: 48px;
  top: -66px;
  left: 0px;
  z-index: -1;
  -webkit-transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
  transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
}

input[type="button"] {
  -webkit-transition: opacity 0.2s ease, background 0.2s ease;
  transition: opacity 0.2s ease, background 0.2s ease;
  display: block;
  opacity: 0;
  margin: 10px 0 0 0;
  padding: 10px;
  cursor: pointer;
}

input[type="button"]:hover {
  background: #EEE;
}

input[type="button"]:active {
  background: #999;
}

input.question:valid ~ input[type="button"]/*, textarea.question:valid ~ input[type="button"]*/ {
  -webkit-animation: appear 1s forwards;
  animation: appear 1s forwards;
}

input.question:invalid ~ input[type="button"]/*, textarea.question:invalid ~ input[type="button"]*/ {
  display: none;
}

@-webkit-keyframes appear {
  100% {
    opacity: 1;
  }
}

@keyframes appear {
  100% {
    opacity: 1;
  }
}

$background: #f5f6fa;
$text: #9c9c9c;
$input-bg-color: #fff;
$input-text-color: #a3a3a3;
$button-bg-color: #7f8ff4;
$button-text-color: #fff;
:root {
	background: $background;
	color: $text;
	font: 1rem "PT Sans", sans-serif;
}

.uppercase {
	text-transform: uppercase;
}                    

.btn {
	display: inline-block;
	background: transparent;
	color: inherit;
	font: inherit;
	border: 0;
	outline: 0;
	padding: 0;
	transition: all 200ms ease-in;
	cursor: pointer;
	
	&--primary {
		background: $button-bg-color;
		color: $button-text-color;
		box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1);
		border-radius: 2px;
		padding: 12px 36px;
		
		&:hover {
			background: darken($button-bg-color, 4%);
		}
		
		&:active {
			background: $button-bg-color;
			box-shadow: inset 0 0 10px 2px rgba(0, 0, 0, .2);
		}
	}
	
	&--inside {
		margin-left: -96px;
	}
}


   h2 {
    font-family: 'Damion', cursive;
    font-weight: 400;
    color: #4caf50;
    font-size: 35px;
    text-align: center;
    position: relative;
}
h2:before {
    position: absolute;
    content: '';
    width: 100%;
    left: 0;
    top: 22px;
    background: #4caf50;
    height: 1px;
}
h2 i {
    font-style: normal;
    background: #fff;
    position: relative;
    padding: 10px;
}
:focus{outline: none;}

/* necessary to give position: relative to parent. */
input[type="text"]{font: 15px/24px 'Muli', sans-serif; color: #333; width: 100%; box-sizing: border-box; letter-spacing: 1px;}

:focus{outline: none;}

.col-3{float: left; width: 27.33%; margin: 40px 3%; position: relative;} /* necessary to give position: relative to parent. */
input[type="text"]{font: 35px/24px "Lato", Arial, sans-serif; color: #0e96ff; width: 100%; box-sizing: border-box; letter-spacing: 1px;}

.effect-1, 
.effect-2, 
.effect-3{border: 0; padding: 7px 0; border-bottom: 1px solid #ccc;}

.effect-1 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
.effect-1:focus ~ .focus-border{width: 100%; transition: 0.4s;}

.effect-2 ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
.effect-2:focus ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}

.effect-3 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; z-index: 99;}
.effect-3 ~ .focus-border:before, 
.effect-3 ~ .focus-border:after{content: ""; position: absolute; bottom: 0; left: 0; width: 0; height: 100%; background-color: #4caf50; transition: 0.4s;}
.effect-3 ~ .focus-border:after{left: auto; right: 0;}
.effect-3:focus ~ .focus-border:before, 
.effect-3:focus ~ .focus-border:after{width: 50%; transition: 0.4s;}

.effect-4,
.effect-5,
.effect-6{border: 0; padding: 5px 0 7px; border: 1px solid transparent; border-bottom-color: #ccc; transition: 0.4s;}

.effect-4:focus,
.effect-5:focus,
.effect-6:focus{padding: 5px 14px 7px; transition: 0.4s;}

.effect-4 ~ .focus-border{position: absolute; height: 0; bottom: 0; left: 0; width: 100%; transition: 0.4s; z-index: -1;}
.effect-4:focus ~ .focus-border{transition: 0.4s; height: 36px; border: 2px solid #4caf50; z-index: 1;}

.effect-5 ~ .focus-border{position: absolute; height: 36px; bottom: 0; left: 0; width: 0; transition: 0.4s;}
.effect-5:focus ~ .focus-border{width: 100%; transition: 0.4s; border: 2px solid #4caf50;}

.effect-6 ~ .focus-border{position: absolute; height: 36px; bottom: 0; right: 0; width: 0; transition: 0.4s;}
.effect-6:focus ~ .focus-border{width: 100%; transition: 0.4s; border: 2px solid #4caf50;}

.effect-7,
.effect-8,
.effect-9{border: 1px solid #ccc; padding: 7px 14px 9px; transition: 0.4s;}

.effect-7 ~ .focus-border:before,
.effect-7 ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
.effect-7 ~ .focus-border:after{top: auto; bottom: 0;}
.effect-7 ~ .focus-border i:before,
.effect-7 ~ .focus-border i:after{content: ""; position: absolute; top: 50%; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.6s;}
.effect-7 ~ .focus-border i:after{left: auto; right: 0;}
.effect-7:focus ~ .focus-border:before,
.effect-7:focus ~ .focus-border:after{left: 0; width: 100%; transition: 0.4s;}
.effect-7:focus ~ .focus-border i:before,
.effect-7:focus ~ .focus-border i:after{top: 0; height: 100%; transition: 0.6s;}

.effect-8 ~ .focus-border:before,
.effect-8 ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.3s;}
.effect-8 ~ .focus-border:after{top: auto; bottom: 0; left: auto; right: 0;}
.effect-8 ~ .focus-border i:before,
.effect-8 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.4s;}
.effect-8 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0;}
.effect-8:focus ~ .focus-border:before,
.effect-8:focus ~ .focus-border:after{width: 100%; transition: 0.3s;}
.effect-8:focus ~ .focus-border i:before,
.effect-8:focus ~ .focus-border i:after{height: 100%; transition: 0.4s;}

.effect-9 ~ .focus-border:before,
.effect-9 ~ .focus-border:after{content: ""; position: absolute; top: 0; right: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.2s; transition-delay: 0.2s;}
.effect-9 ~ .focus-border:after{top: auto; bottom: 0; right: auto; left: 0; transition-delay: 0.6s;}
.effect-9 ~ .focus-border i:before,
.effect-9 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.2s;}
.effect-9 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0; transition-delay: 0.4s;}
.effect-9:focus ~ .focus-border:before,
.effect-9:focus ~ .focus-border:after{width: 100%; transition: 0.2s; transition-delay: 0.6s;}
.effect-9:focus ~ .focus-border:after{transition-delay: 0.2s;}
.effect-9:focus ~ .focus-border i:before,
.effect-9:focus ~ .focus-border i:after{height: 100%; transition: 0.2s;}
.effect-9:focus ~ .focus-border i:after{transition-delay: 0.4s;}

.effect-10, 
.effect-11, 
.effect-12,
.effect-13,
.effect-14,
.effect-15{border: 0; padding: 7px 15px; border: 1px solid #ccc; position: relative; background: transparent;}

.effect-10 ~ .focus-bg{position: absolute; left: 0; top: 0; width: 100%; height: 100%; background-color: #ededed; opacity: 0; transition: 0.5s; z-index: -1;}
.effect-10:focus ~ .focus-bg{transition: 0.5s; opacity: 1;}

.effect-11 ~ .focus-bg{position: absolute; left: 0; top: 0; width: 0; height: 100%; background-color: #ededed; transition: 0.3s; z-index: -1;}
.effect-11:focus ~ .focus-bg{transition: 0.3s; width: 100%;}

.effect-12 ~ .focus-bg{position: absolute; left: 50%; top: 0; width: 0; height: 100%; background-color: #ededed; transition: 0.3s; z-index: -1;}
.effect-12:focus ~ .focus-bg{transition: 0.3s; width: 100%; left: 0;}

.effect-13 ~ .focus-bg:before,
.effect-13 ~ .focus-bg:after{content: ""; position: absolute; left: 0; top: 0; width: 0; height: 100%; background-color: #ededed; transition: 0.3s; z-index: -1;}
.effect-13:focus ~ .focus-bg:before{transition: 0.3s; width: 50%;}
.effect-13 ~ .focus-bg:after{left: auto; right: 0;}
.effect-13:focus ~ .focus-bg:after{transition: 0.3s; width: 50%;}

.effect-14 ~ .focus-bg:before,
.effect-14 ~ .focus-bg:after{content: ""; position: absolute; left: 0; top: 0; width: 0; height: 0; background-color: #ededed; transition: 0.3s; z-index: -1;}
.effect-14:focus ~ .focus-bg:before{transition: 0.3s; width: 50%; height: 100%;}
.effect-14 ~ .focus-bg:after{left: auto; right: 0; top: auto; bottom: 0;}
.effect-14:focus ~ .focus-bg:after{transition: 0.3s; width: 50%; height: 100%;}

.effect-15 ~ .focus-bg:before,
.effect-15 ~ .focus-bg:after{content: ""; position: absolute; left: 50%; top: 50%; width: 0; height: 0; background-color: #ededed; transition: 0.3s; z-index: -1;}
.effect-15:focus ~ .focus-bg:before{transition: 0.3s; width: 50%; left: 0; top: 0; height: 100%;}
.effect-15 ~ .focus-bg:after{left: auto; right: 50%; top: auto; bottom: 50%;}
.effect-15:focus ~ .focus-bg:after{transition: 0.3s; width: 50%; height: 100%; bottom: 0; right: 0;}


.effect-16, 
.effect-17, 
.effect-18{border: 0; padding: 4px 0; border-bottom: 1px solid #ccc; background-color: transparent;}

.effect-16 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
.effect-16:focus ~ .focus-border,
.has-content.effect-16 ~ .focus-border{width: 100%; transition: 0.4s;}
.effect-16 ~ label{position: absolute; left: 0; width: 100%; top: 9px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-16:focus ~ label, .has-content.effect-16 ~ label{top: -16px; font-size: 12px; color: #4caf50; transition: 0.3s;}

.effect-17 ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
.effect-17:focus ~ .focus-border,
.has-content.effect-17 ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}
.effect-17 ~ label{position: absolute; left: 0; width: 100%; top: 9px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-17:focus ~ label, .has-content.effect-17 ~ label{top: -16px; font-size: 12px; color: #4caf50; transition: 0.3s;}

.effect-18 ~ .focus-border{position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; z-index: 99;}
.effect-18 ~ .focus-border:before, 
.effect-18 ~ .focus-border:after{content: ""; position: absolute; bottom: 0; left: 0; width: 0; height: 100%; background-color: #4caf50; transition: 0.4s;}
.effect-18 ~ .focus-border:after{left: auto; right: 0;}
.effect-18:focus ~ .focus-border:before, 
.effect-18:focus ~ .focus-border:after,
.has-content.effect-18 ~ .focus-border:before,
.has-content.effect-18 ~ .focus-border:after{width: 50%; transition: 0.4s;}
.effect-18 ~ label{position: absolute; left: 0; width: 100%; top: 9px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-18:focus ~ label, .has-content.effect-18 ~ label{top: -16px; font-size: 12px; color: #4caf50; transition: 0.3s;}

.effect-19,
.effect-20,
.effect-21{border: 1px solid #ccc; padding: 7px 14px; transition: 0.4s; background: transparent;}

.effect-19 ~ .focus-border:before,
.effect-19 ~ .focus-border:after{content: ""; position: absolute; top: -1px; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
.effect-19 ~ .focus-border:after{top: auto; bottom: 0;}
.effect-19 ~ .focus-border i:before,
.effect-19 ~ .focus-border i:after{content: ""; position: absolute; top: 50%; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.6s;}
.effect-19 ~ .focus-border i:after{left: auto; right: 0;}
.effect-19:focus ~ .focus-border:before,
.effect-19:focus ~ .focus-border:after,
.has-content.effect-19 ~ .focus-border:before,
.has-content.effect-19 ~ .focus-border:after{left: 0; width: 100%; transition: 0.4s;}
.effect-19:focus ~ .focus-border i:before,
.effect-19:focus ~ .focus-border i:after,
.has-content.effect-19 ~ .focus-border i:before,
.has-content.effect-19 ~ .focus-border i:after{top: -1px; height: 100%; transition: 0.6s;}
.effect-19 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-19:focus ~ label, .has-content.effect-19 ~ label{top: -18px; left: 0; font-size: 12px; color: #4caf50; transition: 0.3s;}

.effect-20 ~ .focus-border:before,
.effect-20 ~ .focus-border:after{content: ""; position: absolute; top: 0; left: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.3s;}
.effect-20 ~ .focus-border:after{top: auto; bottom: 0; left: auto; right: 0;}
.effect-20 ~ .focus-border i:before,
.effect-20 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.4s;}
.effect-20 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0;}
.effect-20:focus ~ .focus-border:before,
.effect-20:focus ~ .focus-border:after,
.has-content.effect-20 ~ .focus-border:before,
.has-content.effect-20 ~ .focus-border:after{width: 100%; transition: 0.3s;}
.effect-20:focus ~ .focus-border i:before,
.effect-20:focus ~ .focus-border i:after,
.has-content.effect-20 ~ .focus-border i:before,
.has-content.effect-20 ~ .focus-border i:after{height: 100%; transition: 0.4s;}
.effect-20 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-20:focus ~ label, .has-content.effect-20 ~ label{top: -18px; left: 0; font-size: 12px; color: #4caf50; transition: 0.3s;}

.effect-21 ~ .focus-border:before,
.effect-21 ~ .focus-border:after{content: ""; position: absolute; top: 0; right: 0; width: 0; height: 2px; background-color: #4caf50; transition: 0.2s; transition-delay: 0.2s;}
.effect-21 ~ .focus-border:after{top: auto; bottom: 0; right: auto; left: 0; transition-delay: 0.6s;}
.effect-21 ~ .focus-border i:before,
.effect-21 ~ .focus-border i:after{content: ""; position: absolute; top: 0; left: 0; width: 2px; height: 0; background-color: #4caf50; transition: 0.2s;}
.effect-21 ~ .focus-border i:after{left: auto; right: 0; top: auto; bottom: 0; transition-delay: 0.4s;}
.effect-21:focus ~ .focus-border:before,
.effect-21:focus ~ .focus-border:after,
.has-content.effect-21 ~ .focus-border:before,
.has-content.effect-21 ~ .focus-border:after{width: 100%; transition: 0.2s; transition-delay: 0.6s;}
.effect-21:focus ~ .focus-border:after,
.has-content.effect-21 ~ .focus-border:after{transition-delay: 0.2s;}
.effect-21:focus ~ .focus-border i:before,
.effect-21:focus ~ .focus-border i:after,
.has-content.effect-21 ~ .focus-border i:before,
.has-content.effect-21 ~ .focus-border i:after{height: 100%; transition: 0.2s;}
.effect-21:focus ~ .focus-border i:after,
.has-conten.effect-21 ~ .focus-border i:after{transition-delay: 0.4s;}
.effect-21 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-21:focus ~ label, .has-content.effect-21 ~ label{top: -18px; left: 0; font-size: 12px; color: #4caf50; transition: 0.3s;}

.effect-22, 
.effect-23, 
.effect-24{border: 0; padding: 7px 15px; border: 1px solid #ccc; position: relative; background: transparent;}

.effect-22 ~ .focus-bg{position: absolute; left: 0; top: 0; width: 0; height: 100%; background-color: transparent; transition: 0.4s; z-index: -1;}
.effect-22:focus ~ .focus-bg, 
.has-content.effect-22 ~ .focus-bg{transition: 0.4s; width: 100%; background-color: #ededed;}
.effect-22 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-22:focus ~ label, .has-content.effect-22 ~ label{top: -18px; left: 0; font-size: 12px; color: #333; transition: 0.3s;}

.effect-23 ~ .focus-bg:before,
.effect-23 ~ .focus-bg:after{content: ""; position: absolute; left: 0; top: 0; width: 0; height: 0; background-color: #ededed; transition: 0.3s; z-index: -1;}
.effect-23:focus ~ .focus-bg:before,
.has-content.effect-23 ~ .focus-bg:before{transition: 0.3s; width: 50%; height: 100%;}
.effect-23 ~ .focus-bg:after{left: auto; right: 0; top: auto; bottom: 0;}
.effect-23:focus ~ .focus-bg:after,
.has-content.effect-23 ~ .focus-bg:after{transition: 0.3s; width: 50%; height: 100%;}
.effect-23 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-23:focus ~ label, .has-content.effect-23 ~ label{top: -18px; left: 0; font-size: 12px; color: #333; transition: 0.3s;}

.effect-24 ~ .focus-bg:before,
.effect-24 ~ .focus-bg:after{content: ""; position: absolute; left: 50%; top: 50%; width: 0; height: 0; background-color: #ededed; transition: 0.3s; z-index: -1;}
.effect-24:focus ~ .focus-bg:before,
.has-content.effect-24 ~ .focus-bg:before{transition: 0.3s; width: 50%; left: 0; top: 0; height: 100%;}
.effect-24 ~ .focus-bg:after{left: auto; right: 50%; top: auto; bottom: 50%;}
.effect-24:focus ~ .focus-bg:after,
.has-content.effect-24 ~ .focus-bg:after{transition: 0.3s; width: 50%; height: 100%; bottom: 0; right: 0;}
.effect-24 ~ label{position: absolute; left: 14px; width: 100%; top: 10px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.effect-24:focus ~ label, .has-content.effect-24 ~ label{top: -18px; left: 0; font-size: 12px; color: #333; transition: 0.3s;}              
                
                 
.test_lamps{
        display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}



.mainCol h1 {
    font-size: 1.6em;
    text-decoration: underline;
    color: #55a2bf;
    font-weight: normal;
    margin: 10px 0 0 0
}

.mainCol h1.smaller {
    font-size: 20px
}

.mainCol h2 {
    font-size: 16px;
    color: #697c94;
    font-weight: normal;
    margin: 5px 0 0 0
}

.mainCol h3 {
    font-size: 20px;
    color: #42acfe;
    padding: 0 0 0 20px;
    font-weight: normal
}

.highlight {
    color: #55a2bf
}

.tbl3 {
    width: 100%
}

.tbl3>tbody>tr>td {
    width: 33%;
    vertical-align: top;
    min-width: 200px
}

.links {
    padding: 10px
}

.links>ul {
    background-color: #efe;
    padding: 10px;
    list-style-type: none;
    border: 2px solid #42acfe;
    background: -moz-linear-gradient(top,#fff,#efe);
    background: -webkit-linear-gradient(top,#fff,#efe);
    background: -ms-linear-gradient(top,#fff,#efe)
}

.links>ul>li {
    font-size: 16px;
    padding: 2px 0
}

a.divLink {
    text-decoration: none
}

.mainWrapper>.head {
    position: relative;
    height: 85px;
    background-color: #fff;
    background-image: url(../img/head_left.jpg);
    background-repeat: no-repeat
}

a.mainLink {
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 90px
}

.mainWrapper>.head>.greenLine {
    position: relative;
    background-color: #74ff6c;
    height: 57px;
    margin-left: 435px;
    top: 25px
}

.mainWrapper>.body {
    min-height: 600px;
    background-color: #fff
}

.head_find {
    position: absolute;
    right: 13px;
    top: 41px
}

.head_find_text {
    width: 183px;
    font-size: 17px;
    box-shadow: 0 0 10px #fff;
    color: #555;
    border: 1px solid #55a2bf;
    outline: 0;
    height: 23px;
    border-radius: 0;
    padding: 1px 102px 1px 1px
}

.head_find_btn {
    border: 0;
    position: absolute;
    right: 3px;
    top: 3px;
    font-size: 16px;
    background: #42acfe;
    color: #fff;
    text-shadow: 2px 2px 15px #fff;
    height: 21px
}

.mainWrapper>.head>.topLinks {
    position: absolute;
    right: 8px;
    top: 4px
}

.layoutTable {
    table-layout: fixed;
    width: 100%
}

.layoutTable>tbody>tr>td {
    vertical-align: top;
    font-family: "Trebuchet MS",Helvetica,sans-serif;
    /*font-size: 15px*/
}

.layoutTable .leftCol {
    width: 243px;
    background-color: #fff
}

.layoutTable .centerCol {
    min-width: 915px;
    background-color: #fff;
    padding: 0px 10px
}

.layoutTable .rightCol {
    width: 200px;
    min-width: 200px;
    background-color: #fff
}

.foot {
    padding: 5px 0;
    background-color: #eee;
    color: #2b7b41;
    text-align: center;
    vertical-align: middle;
    position: relative;
    font-family: "Trebuchet MS",Helvetica,sans-serif;
    font-size: 15px;
    height: 15px;
    width: 100%;
    min-width: 1160px
}

.breadcrumbs {
    position: relative;
    width: 60%
}

.breadcrumbs ul {
    padding-left: 0;
    margin: 0
}

.breadcrumbs>ul>li {
    list-style-type: none;
    float: left;
    margin: 0 2px
}

.breadcrumbs>ul>li>ul {
    padding-left: 0;
    margin: 0
}

.breadcrumbs>ul>li>ul>li {
    list-style-type: none
}

.breadcrumbs .clear {
    clear: left
}

li>a,.in_link {
    color: #3a6e6f
}

.in_link:hover {
    text-decoration: underline
}

h1 {
    font-size: 23px;
    color: #42acfe;
    padding: 0 0 0 20px
}

h2 {
    font-size: 18px;
    color: #3a6e6f;
    font-weight: normal;
    padding: 0 0 0 20px
}

h3 {
    font-size: 15px;
    font-weight: bold;
    color: #444;
    padding: 0 0 0 20px
}

.test_group_contents li {
    color: red;
    padding: 3px 0;
    list-style-position: inside
}

.breadcrumbs>ul>li>ul {
    display: inline
}

.breadcrumbs>ul>li>ul>li {
    display: block
}

.breadcrumbs_group {
    float: left
}

.breadcrumbs_group>li {
    width: 300px
}

.test_attention {
    font-size: 1.1em;
    color: #ee0b60
}

.tsImgBtn {
    padding: 0;
    margin: 0;
    position: relative;
    float: left
}

.tsImgBtn_bg {
    position: relative;
    left: 0;
    top: 0
}

.tsImgBtn_caption {
    position: absolute;
    left: 0;
    top: 0
}

.test_comment_dialog {
    padding: 10px;
    background-color: #fff;
    width: 520px
}

.qs_lamp {
    float: left;
    width: 4.5em;
    /*padding: 4px 3px 0 3px;*/
    cursor: pointer;
    /*padding-left: 1em;*/
}

.qs_lamp.hover {
    background-color: #c6ffb3
}

.qs_lamp:hover {
    /*background-color: #c6ffb3*/
    background-color: #3f7ab754
}

.qs_lamp.current_qs {
    /*background-color: #76ff48;*/
    background-color: #3f7ab794;
    cursor: default
}
.qs_lamp:active {
    /*background-color: #76ff48;*/
    background-color: #3f7ab794;
    cursor: default
}


.qs_lamp_ua,.qs_lamp_a,.qs_lamp_ra,.qs_lamp_wa {
    width: 3em;
    height: 3em;
    margin-left: 0.8em;
}

.qs_lamp_caption {
    text-align: center;
    color: #3a6e6f;
    font-size: 3em
}

.qs_lamp_ua {
        background-size: cover;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsVJREFUeNpUVD1TFEEQ7Zmd3VUvMLLKQBMyq0ysg/wwoO4XYCopP4hUUy8xMBCtUsyBIiSSRBPNVLjZnY8eX/csKAu9sNvdr1+/nl7z9t0nKvhpbEOz2T2a3e2p7btl17rdvm23nGseN01DZM03hB1TKavEfJhSphAiMWcyxpCTGwJwGbk9YaaDwryQR2sNCYiFIex+KfSUc94zpXxB7D5izjUTTsuFlRGuBaqcMUAEoEOyc5YasaaavDdWCy5A5QwMtuUBOWR/XV7R2o8bMaWjUriXLlrcNBntOmthBDNqjQEgGDBRT5k/h5g2/DCSTWOkwYcVp1STlAkSkIRH0C6k3RvSv/oOhnqUuBC6WKXE5MBqxxqeg6AGgQhZUwEgLH6rSUNlUlKbEz+AOOZ5jHEHJMxLTIi6rq0AohnQeTKT6zBUG8XON+Dyf8T0xjHsOYRsClDfddS2lkT6jDaj5CHYcaOT074mYXPOiIkASTTGQD6ETWH0sE7EaoIILXqwnBMkJVt9YhWpUIBvGAONEHn0A63X/oHT3lFtKqggMhmSPDDCuVGjemC07RjRzgAmAPLDQN6PxqLtH1UP9CziwbKKK+AW2lRTkIqt/usczSvlp9Q9yVmqJJIxisNIYKFbl5koi27izFlHD61YfCcWrbySFwOABuxOiBBR2sEO5YmlWJ5EFt917Cjxte3XDgfvI2ieQrx56+qJlpNypwWzaS3qtIQF66J6DxONIDjen4LRBzcR340hfb2yA4lomtSx7prqQ5VVRBsyLawUXa49IUek29Xtl+rQ9AKBz0NI73/z0Ce0FfRcYfNNBRJxg0wrAAhsQsgBKEt4L4SKuxHTmiOQeRZTPPizzguPHcS36FZrcooT9AEoPiNmHxTOp2/QPyC5gA6H2UbgEofxBTZ7CzCPqO7Zd9yPsUFvUPRQ1p/+m+xfAQYAfEryuxHbVMEAAAAASUVORK5CYII=")
}

.qs_lamp_ua::after {
    color: rgba(0,0,0,0);
    content: "o";
    font-size: 103px;
    text-shadow: -4px -46px 19px #969a96;
}

.qs_lamp_a {
        background-size: cover;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RJREFUeNpck8uPFUUUxr+qrn7d58yAQQUNiAs1bswM+8EFmY07A1vZ8mf4R7DVLbNwY4xgjLBhBYTlBOOQGGFgYO6rbz+rq6r9au7FhZ2c7r63z/c73zl9Wnz7/U8wxmE8iPHFx1u4dG4DZ8a9vc1BfH2QRFeSWH2kggBC4J8OeGRau1807d2TRYmXJ0sUlUYQSKiQJ+c6BMwUwOdta25rbXcbBySCzwQhUhIkxs66L43rblrrHvD3LcaB13mQrLU5BaHrdvNSP51WZjezEjUUWqlgZAAjfEgYlqpZoPSFGvMUHa7aroNuLdQvh8e4mEaffHZudB9JCrMRIUCIhNEjLCZErdyiobLsJDIjMKtMXJTNH0ez4nJRtc+Vfr3An8N4X0QJJhsKuYkAG6HnQgwoSkHbxAhWLpzEwki8YUw1MM81JotyP6v0jsLx4hqyZPtZ7yyelSFQKXxT00kjkGiBSJFLN5YtefER/z+qBN6WwCKzyKbF9iQrrimMku8gE4BizKkYCPzcE5jG4IwAzXZG5GvSjmvgMBP4OwNeLQXyhUVzUqGYZTcVNvs7GG4CW1vwM0IVsGyHh5zqw8riRi3xQcQhE/RX5fD7ktYIwoR/TFrSae3tbEeJUe/9bjwCzg6BjR5hnFHH0bIaig53Xku/Bzg9vC3CkRMwZ58TxpQ2Z+V76vIwxWQUYTakfx99thgyHMW1F3M1MoZfEedWw+ItJJ+HdN9n4ToWKg3E8QjdcAYmCIZkkMMtA1/Z6vBCD+J+gWZQEsL9QsPEJYu36RtpnXscNg0tV3zAq2amMRTZlZivne+eYO+AkIj3sQ+/+g5pSng/fswzflC6xpkqZ6WCNjk8TaAh0JpVK/wW0fK35kwa9lsxpy5wwVS4SPin4/RH5aT8TTr7ZCtfbudhjMa35PfYOwqZJeS6vTWspvN8gTibI80yBM484bLdU6c5QlwPdX14Ppvhpf8UfGv9AUHxalb+8OCWToscMUEfLmegBpZa3/070HOev06q/Nfz1sYLCia+xZiLGqg1yJy25Ucwzpfc+kpTt7fSrkFr2H1evmLC7Wje7o4paOnIyFWKcgYhC0SN5os1D5h/i3HwTv8faA07YFxl4l5SmRtxXV3hkC6sn77gh/uIN3c417v43/GvAAMAk/DF4sYaalkAAAAASUVORK5CYII=")
}

.qs_lamp_a::after {
    color: rgba(0,0,0,0);
    content: "o";
    font-size: 81px;
    text-shadow: 4px -31px 15px #0af
}

.qs_lamp_ra {
        background-size: cover;
    /*background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5FJREFUeNpUU8tuHEUUPVXdPdPztnFiAopBCgmQCAmBE4kVmrCI/AOYFRIRbMiX8AXZwhb/QBIWJPvEiiIWlggYgu3Y4/F4nv2sF6c6DhLVKlXN3HvPPffcW+K7H76HMhrdZhvvr13G2uo7ONd9Y6PX6m42Gs0bcS1eC4MQEG4PwGOl9VaWZ/fHszEORodI8xShDBB6J+MspJAQQlxVSt0tdNFXTiMWFk5aCOkgIHrG2o+MMbe1NY/ofIf+OwHjAgLJvCxgLZ0d+oskfTrLJ/3UJShlARNouMCDgSdgpIFyJQqV94sif8qYm56E0iXC7d1nWG52L5nVdx/KJikyd0s00JNtKNmErVgZOCeg+JXIkZgEs2JWT7Lk18Fk8B7P3fC34T9Y65zfEg0Jd04hQoA2gTqihSbaaCAmeADCEaZAQrZzO8WpPsUoGWM8nWwt8vn1EMeHt/YWJ+t73VN8rBcobInACMS6jtjEiFxUle5LmOs5TvQQAzXESTHCKD3FcDJZp/C3QnSWv0E0owD7eJZwL/7G5+0ZbJ36hASARjtsMYHCpBzjZXqEo2yAYTbCcDHGZDLF+GRxW3S+/OD3+ZK6grcWwMoxsMQmd/2+hq9713Gt/SGWoh60LXBMFgfJAAezY+yNxhi8mGD0nHFH2R/i6refzeyK68zeNjg8rwCygfwL1WK3UH8TiC6wbbxr2ooBkKTACX/vcz/nfolpuNJZZjCw2pK41GKFTYu0fgUHboaRZpB5AaQ8LV6BvT4FdxQDzRrQCkQYymjAeesIttdxYAIh0AsELgQdiPgi2/0pSupTcn5ynnlJraRCVrApjRKySVvXHofsyBORu8su42TnDqYOqFBUCX1pAW+xCDhbrapSxyR+UFXE4YxKpHGOtJU98bYfXUk2CwdL3VxOkMLBKa+JgzbsnGaQ8mw0ioLdzFhVEqBRxlgOuv5t/hQyzS/WYFvM3bqoc+xCiYqP8RpQEllxQ2ApDMEr1lPeJ/Tl6bTcrtWiB6F3oiybthB/yrF/nNYbwRcCVxcIA1cBOQ6pLF6xxpQ+9GUMH7vb9DkqIOq8S8G/cIm456yr+wDHDovYVY+1SmZ4z3khkKUMyERJshs+1ttDnC3+8ZDmT0Qm7trS9fmoENTI78xDalZb0qPwZYtH9L9D+juv4/8DOitxh8ab1GcDqfhKZ7jBgIveRvr7HJHHvP5MXe8L/H/9K8AAbLj5G+nkhscAAAAASUVORK5CYII=")*/
    background-image: url("data:image/png;base64,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")
}

.qs_lamp_ra::after {
    color: rgba(0,0,0,0);
    content: "o";
    font-size: 99px;
    text-shadow: -3px -46px 15px #0f0
}

.qs_lamp_wa {
    background-size: cover;
    /*background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxZJREFUeNpck8lu1EAQhv+22+OxwzBkFBASoLBJKBIHUMI9cEA8QeBIrjwQV7iSJwAOEIkDB0A5ciKIJcqQZRaP491u/nIaBGmppj3uqq/+riqr9+vraKoKXq+H/o0bmFtcRGcweNDp99fcMLzjBMElV2sYpX4oYz40ZbnRJMnLfDRCtruL8ugIDs+1/JimgXIcKKWWUBRPTZ6vMgCOvDcGdvWNMTdNXa83db1J3ycM+CxxjuvCqfK8BXGtVnG8lY7Hq5KFMB5WgIU5AuT/pihQp+lqnWVbVHlXYmv66oOtLXj9/tXTi4tvFdXNKQV0u3Dm5uCEIbTA+L5dVIk0RR3HyKdTv5rN3qTD4TUm3tbTb98QLixsgBINswX0d3wfLmvWwoLgGMTMJsuA2QzNZILy8BD5eCy2UUbRio6i6H4ax8u8ErwoQkOZvDtcwjTN6XTaq0lDFM/V/j6a4RDlwQESxmSj0XIxmdzXQcd/nFclBDSbTtH7/h197qqs4EpdpH6ijGrN4QjNzk/UBBVUdMSYmL684roOz51d8ZmtwwL7SYJK2vruHQoC/eEunKUl4MwZQEBUU+/sINvbayFTQibxEeosXdH+YHAejUE4P8BpqugnMbz9A5RfvyJj/YL5eaiFBdSsXcr6sBSYsFZjKh1TcUSj7rO6OxiAfWqLHPBlQOipy1cQxjN4lC+FNV+2UZiGZlCxfmx7O3ce965ypJ9Kc2p/kdiTsTMkcmpaR9M7BefCBbh1fdx2qpUhDVjPnNfM+SzWzlZV7WkO1EdCrlcyJjT2DGwy3Bas2qzS/srzUKoQtW2AJOgSYrJcBvSjTNoz2iMBpTRtIbIqBmn7iVQ2SSJ+hOf8LAwT+ByRJgieS9xr5vxE9+X8H4gUtzjx/4/ahPBMZkuKo9Qn19Ov7OxjjbAvjc1YWwXZCdAf1QJsIXJgzJpodqzfNu0eD/LGAma06ITN7JmFiOB7NvYvSNZb2m06bBpb+MwqTOyzvDPHkE1ut2xMuzT+X59pd+n4gPtD2h0GXsRx8E9uH2gvaC9PxOG3AAMAL4PSvEpvfR8AAAAASUVORK5CYII=")*/
    background-image: url("data:image/png;base64,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")
}

.qs_lamp_wa::after {
    color: rgba(0,0,0,0);
    content: "o";
    font-size: 99px;
    text-shadow: -3px -46px 15px #f00;
}

.test_qs_ansvars {
    margin: 0 auto;
    padding: 10px
}

.test_qs_var {
    border: 1px solid #bbb;
    padding: 1.4%;
    font-size: 1.1em;
    margin: 0.9%;
    box-shadow: 2px 2px 7px rgba(0,0,0,0.4);
    position: relative;
    height: 15%;
}

.test_qs_var.inline_var {
    display: inline;
    border: 0;
    box-shadow: none;
    padding: 0;
    line-height: 20px
}

.test_qs_var.hover {
    background-color: #d9ecff;
    cursor: pointer
}

.test_qs_var:hover {
    background-color: #d9ecff;
    cursor: pointer
}

.test_qs_var.pressed {
    background-color: #3f7ab794;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2)
}

.test_qs_var:active {
    background-color: #3f7ab794;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2)
}

.test_qs_var.checked,.test_qs_var.right {
    outline: 3px solid #74ff51;
    box-shadow: none;
    border: 1px solid #74ff51;
    background-color: #9fff7a;
}

.test_qs_var.wrong {
    outline: 3px solid #ff3535;
    box-shadow: none;
    border: 1px solid #ff3535;
    background-color: #fa7979;
}

.test_qs_var.semiright {
    outline: 3px solid #f2912f;
    box-shadow: none;
    border: 1px solid #f2912f;
    padding-bottom: 11px
}

.test_qs_var .right_order {
    position: absolute;
    font-size: 11px;
    right: 1px;
    bottom: -1px
}

.test_qs_var.right_column41 .right_order {
    position: relative
}

.test_qs_t5 {
    margin: 17px 0
}

.qs5_wrong {
    background-color: #ff3535!important;
    color: #fff!important;
    background-image: none!important
}

.yupSwap_target {
    background-color: #b9f2ff!important
}

.test_result_table {
    border-collapse: collapse
}

.test_result_table th {
    padding: 1px 4px;
    border: 1px solid #3a6e6f;
    text-align: center;
    background-color: #c0f9bf;
    font-size: 15px;
    color: #1b3149
}

.test_result_table td {
    padding: 1px 4px;
    border: 1px solid #3a6e6f
}

hr.test_delim {
    border: 1px solid green;
    width: 400px;
    margin: 20px;
    padding: 1px
}

.test_group {
    float: left;
    width: 470px;
    margin: 0 20px 20px 0
}

.test_group_image {
    background-image: url(/img/fldWtests.svgz);
    width: 72px;
    height: 72px;
    float: left;
    clear: left;
    margin: 0 10px 10px 0
}

.test_group_name {
    color: #42acfe;
    font-size: 18px
}

.test_group_name a {
    color: inherit
}

.test_group_name a:hover {
    text-decoration: none
}

.test_group_contents {
    color: #3a6e6f
}

.test_group .test_group_contents {
    margin: 3px 0 3px 15px
}

.test_group .test_group_contents li {
    position: relative;
    left: 14px
}

a.group_link {
    color: #3a6e6f;
    font-size: 16px
}

.test_group_contents a:hover {
    text-decoration: none
}

a.test_link {
    color: #426893
}

.group_all {
    font-weight: bold;
    color: #3a6e6f
}

.test_all {
    font-weight: bold;
    color: #426893
}

.red {
    color: red
}

.yupHelper_tooltip ul {
    list-style-type: circle;
    padding-left: 15px;
    margin-top: 4px
}

div.blank {
    background-color: #fff;
    padding: 10px
}

.helper {
    width: 16px;
    height: 16px;
    display: inline-block;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5dJREFUeNo8U21oW1UYfu65NzdJc5Mm6RLbJi1Z2tjWtRts0K0tBjb3wexwwynCBLXoQEEE90NwijgduF8T2cAfjvbHmExwiqgwqPvwYy2tNK5oa+dqU02bNkuzfCc39+Mcz8LwPRw4P97nfd7nPDzCxMSowCBYBDDZbSmWMlV503whdKgmPrLDED09lBG7jNKSnaX/bLclrrU77k0VDZdDYxIImCpxsCgKVPJYcqVf0+1PxMrRs51B/9ZoCAg6AUqBtSIGJxPA98nayV516syQd+YjidrFimmXJQGA15KrXFvree4P8+DlkUFgRwuQURlGZzTE7+voD1owHKHY4rU4LsxGP8xoTZGnWsZfpCCy5JELRmyjtWu6evDyu/uBcCPF+GIVR8ZyqBQ5vUfBpz9R9HfbcG5PFUfDFGPzW15wSOWlA/5fTpGKTjCefvz8cO8DMMPtdYb951dRyaTx7SsK1k404O19AqZnC3jzRxltzhq2e4q4ca///Xg52EVimfY+Zg3s3RfmWsDwwz8EWG7EyG4/DvU54JN1HOsBRGsOC6kiklUZYSWLmg78lnv0WWml4hsKeACXFfU6EmHQTviwN6RD1xhUKuO98XWYq2VsjzTAK4tIGRRNYh6LheYBSTOlJivBwyLo9Jo4GWV8GQnFioGRK2l8fTWHbTvdOL3bjmxRQ1k1INMiSpo1QHQKer+C/4tSAlXn3ggizt4q48o3KQwOuXD15Wb4FBGreQPVmgGVazApFYhdMtNz6xzIHu5ABNgsYv39yawMKAouHfOjWSFY3NAhMBO6bnCbrZBFmiD9/pWb8ZSKG3fNOkjj+ihj9Xtqj4LTx1vQ7hZxJ63VwRIMUNPEiupBR+PGdcJAFp1WfHXuZz7ArEKWDFRU/sW8eaCpgG4v110TYOo1EGrAazPxd6ERoiyxAd/dS+SBdW9snXxtPiUYr37B2TUVit2EwJsHLpp45oM8phM1POajCLhMxFYJbqZDOBqZP97tXE6J77wexTZ3vNzs0icvLnQ9P7PMSMBehNtuoNXjQHeHgeFQDcmcgc9jFnwZb8PhzoWPX9p8/Uxea4Bwa2IMPEzw27KYK3T0jt4Z+ixTde3q9gG7WnUoNoLZlIiZpACd6tnDm39/68mWqQsljWfU4AN4nLkIgR9GmuQCLVM75vLhp5cKm3ZmNVcfhdCgiJW/gs7c7R5X4rs2W/LfrO5EzZRBOPF/AgwA1oSivoszalMAAAAASUVORK5CYII=")
}

.filter {
    background-image: url(../img/filter.png);
    width: 820px;
    height: 140px
}

.link_feedback_intest {
    padding-left: 20px;
    position: relative;
    top: 10px;
    text-align: left;
    color: #3a6e6f;
    font-size: 14px
}

.aphorism {
    color: #4f9953;
    font-style: italic;
    line-height: 14px;
    position: absolute;
    right: 5px;
    text-align: right;
    top: 82px;
    width: 32%;
    font-size: 13px
}

.cart {
    position: absolute;
    right: 10px;
    top: 5px;
    text-align: center
}

.yupButton>div,.yupText>.yupTextInput,.yupForm td,.yupForm th,.yupForm .yupHTED,.yupForm .caption,.yupForm_caption,.yupForm a.link,.yupForm_link,.yupCalendar_calendar div,.yupCalendarDD td,.yupHelper_tooltip,.yupForm select,.yupCheckbox>div.caption,.yupPhone_caption,table.yupForm>tbody>tr>td,table.yupForm>thead>tr>th {
    font-size: 15px
}

.yupTextTime>input {
    width: 42px!important
}

.yupTextDate>input {
    width: 74px!important
}

.yupPeriodMonth>input {
    width: 66px!important
}

.yupPeriodYear>input {
    width: 35px!important
}

.yupCheckbox>div.chkbox {
    margin: 5px 2px 0!important
}

td.ddContainer {
    padding-top: 0!important
}

.gz_cell,.gz_cl,.gz_edC {
    font-size: 15px!important;
    font-family: "Trebuchet MS",Helvetica,sans-serif!important
}

.gz_o .gz_cl {
    background-color: #fdf9e6
}

.gz_selR>.gz_cl {
    background-color: #ecf5ff
}

.form_header {
    font-size: 16px;
    font-weight: bold
}

.yupForm_row {
    border-top: 3px solid #c4e8ee
}

table.yupForm>tbody>tr>td,.yupForm_row {
    background: -moz-linear-gradient(top,#fff,#f4f4f4);
    background: -webkit-linear-gradient(top,#fff,#f4f4f4);
    background: -ms-linear-gradient(top,#fff,#f4f4f4);
    font-family: "Trebuchet MS",Helvetica,sans-serif!important
}

.yupForm_col {
    padding: 2px 5px
}

table.yupForm>tbody>tr>td.firstCol,.yupForm_col1 {
    background-image: -moz-linear-gradient(left,#eee,#e7efef);
    background-image: -webkit-linear-gradient(left,#eee,#e7efef);
    background-image: -ms-linear-gradient(left,#eee,#e7efef);
    font-family: "Trebuchet MS",Helvetica,sans-serif!important
}

.yupForm div.yupHTED {
    background-color: #fff
}

.test_comment_as {
    max-height: 500px;
    overflow-y: auto
}

.yupHelper_tooltip,.yupButton>div,.yupDialog_body,.yupDialog_header,.yupForm a.link,.yupForm_link,.yupTextInput,.caption,.yupHTED,.head_find_btn {
    font-family: "Trebuchet MS",Helvetica,sans-serif!important
}

.yupDialog_body,.yupDialog_header {
    font-size: 15px!important
}

.question_block {
    margin: 15px 0
}

.question_title {
    font-size: 16px;
    font-weight: bold
}

.question_text {
    margin-top: 10px
}

.question_block .attention {
    font-style: italic
}

.answer_variants {
    margin: 7px 0
}

table.answer_variants {
    border-collapse: collapse
}

.answer_variants th {
    font-weight: normal;
    background-color: #eee
}

.answer_variants th,.answer_variants td {
    border: 1px solid #000;
    padding: 1px 4px
}

.questions_pager {
    margin-left: 0;
    padding-left: 0;
    list-style: none
}

.questions_pager li {
    float: left;
    margin: 0 2px
}

.qs_index_page {
    color: #000;
    font-weight: bold
}

.qs_index_page a {
    font-weight: normal;
    padding: 0 5px
}

.qs_index_page a:hover {
    background-color: #cbe6ff
}

.fwb {
    font-weight: bold
}

table.table50w50 {
    table-layout: auto;
    width: 100%
}

.table50w50>tbody>tr>td {
    width: 50%
}

.gz_cl.gz_disabled {
    background-color: #eaefef
}

                </style>
                
                
        
                    <!-- The modal1 -->
                    <div id="myModal1" class="modal1">
                        <!-- modal1 content -->
                        <div class="modal1-content">
                                <h1>Введите данные пользователя</h1>
                                <form style="padding-top: 8%;  position: sticky;">
                                  <input type="text" name="name" class="question" id="nme" required autocomplete="off" />
                                  <label for="nme"><span>ФИО пользователя?</span></label>
                                  <textarea name="message" rows="2" class="question" id="msg" required autocomplete="off"></textarea>
                                  <label for="msg"><span>Желаете указать примечание?</span></label>
                                  <input type="button" id="btn_createContent" value="ПОЕХАЛИ!" />
                                </form>
                        </div>
                    </div>
                    
                    
                     <!-- The modal2 -->
                    <div id="myModal2" class="modal1" style="display: none;">
                        <!-- modal2 content -->
                        <div class="modal1-content" style="margin: 10% auto; width: 85%;">
                                <h1>Результат</h1>
                                <form style="padding-top: 8%;  position: sticky; display: flex;">
                                <div>
                                  <input type="text" name="name" style="color: black;" class="question disabledbutton" value="" id="nme_res1" required autocomplete="off" />
                                  <label for="nme"><span>Общий итог:</span></label>
                                  <input style="margin-top: 53px;" type="button" id="btn_createContentResult" value="Закрыть результат" />
                                </div>
                                <div>
                                  <input type="text" name="name" style="color: black;" class="question disabledbutton" value="0 из 0" id="nme_res2" required autocomplete="off" />
                                  <label for="nme"><span>Кол-во верных ответов:</span></label>
                                </div>
                                <div>  
                                  <input type="text" name="name" style="color: black;" class="question disabledbutton" value="0% / 0%" id="nme_res3" required autocomplete="off" />
                                  <label for="nme"><span>Доля ответов "Верных / Неверных":</span></label>
                                </div>
                                  
                                </form>
                        </div>
                    </div>
                       
                
<body cz-shortcut-listen="true" style="height: 100%;">
<div class="mainLayout" style="height: 100%; display: none;" id="ContentBlock">
   <div class="mainWrapper" style="height: 100%;">
      <div class="body" style="height: 100%;">
         <table cellpadding="0" cellspacing="0" class="layoutTable" style="height: 100%;">
            <tbody style="height: 100%;"><tr style="height: 100%;">
               <td class="centerCol" style="height: 100%;">

                    
                    <div class="test_process" style="">
                        <div class="test_lamps" style="height:100px;">
                            <div class="qs_lamp current_qs">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">1</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">2</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">3</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">4</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">5</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">6</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">7</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">8</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">9</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">10</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">11</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">12</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">13</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">14</div>
                            </div>
                            <div class="qs_lamp">
                                <div class="qs_lamp_ua"></div>
                                <div class="qs_lamp_caption">15</div>
                            </div>
                                <div id="ResultView" style="display: none;">
                                  <input type="text" name="name" style="color: black; display: none;" class="question disabledbutton" value="result" id="nme_res1" required autocomplete="off" />
                                  <input style="margin-top: 40px;margin-left: 10px;" type="button" id="btn_createContentResult_View" value="Показать результат" />
                                </div>
                        </div>
                    
                    <div style="height:20px"></div>
                    <h1 id="ContentTitle" style="">Вопрос №1</h1>
                    <div class="test_qs_content" style="height: calc(40% - 180px);    font-size: 1.1em;">
                        <div style="height:20px"></div>
                        <div id="input_test_qs_text" class="test_qs_text"  style="font-size: 1.4em; height: 50%;">
                           
                        </div>
                    </div>    
                    
                    <div style="height:20px"></div>
                    <p id="input_test_attention_inQs" class="test_attention inQs">Внимание! Ответ будет дан сразу при выборе одного из предложенных вариантов </p>
                    <div id="input_test_qs_ansvars" class="test_qs_ansvars" style="display: inline-block;    height: 55%;    max-height: 55%;    width: 100%;">
                        <div class="test_qs_var">checked, кроме Internet Explorer</div>
                        <div class="test_qs_var">Этот код рушит браузер! Не запускайте его!!</div>
                        <div class="test_qs_var">true</div>
                        <div class="test_qs_var">checked всегда</div>
                    </div>
                    
                    
                    </div>
               </td>
            </tr>
         </tbody>
        </table>   
      </div>
   </div>
</div>
</body>
                `
    ,
    SessionId: 0,
    ContentNumber: 1,
    init: function() {
        
        let testUsers_Library = 'testUsers'; 
        
        if (!document.getElementById(testUsers_Library)) {
            let head  = document.getElementsByTagName('head')[0];
            let script  = document.createElement('script');
            script.id   = 'testUsers';
            script.type = 'text/javascript';
            script.src  = 'lib/testUsers/85e13b74a44d32421808252110.js';
            head.appendChild(script);
                      script.onload = function () {
                            let executeQuery = {
                                queryCode: 'base_q1',
                                limit: -1,
                                parameterValues: []
                            };
                            this.queryExecutor(executeQuery, this.load, this);
                            // console.log(this.SystemUserId);
                    }.bind(this);  
        } else {
           let executeQuery = {
                                queryCode: 'base_q1',
                                limit: -1,
                                parameterValues: []
                            };
                            this.queryExecutor(executeQuery, this.load, this);  
        };
    },
    
     load: function(data) {
         
            var modal = document.getElementById('myModal1');
            modal.style.display = "block";

               var BtnCreateContent = document.getElementById('btn_createContent');
                BtnCreateContent.addEventListener("click", function() {
                         let executeQuery = {
                                queryCode: 'CreateSession',
                                limit: -1,
                                parameterValues: [{key: "@UserName", value: document.getElementById('nme').value }, {key: "@Comment", value: document.getElementById('msg').value}]
                            };
                            this.queryExecutor(executeQuery, this.load2, this);
                        
                        
              }.bind(this), true);
     },
     
    load2: function(data) {
        // debugger;
     this.SessionId = data.rows[0].values[0];   
        
    var self = this;
        var els = document.getElementsByClassName("qs_lamp");
        Array.prototype.forEach.call(els, function(el) {
            el.addEventListener("click", function(el) {
            // debugger;
                var els2 = document.getElementsByClassName("qs_lamp");
                Array.prototype.forEach.call(els2, function(el2) {
                    el2.classList.remove("current_qs");
                }.bind(this));
                el.currentTarget.classList.add("current_qs");
                document.getElementById('ContentTitle').innerText = 'Вопрос №'+el.currentTarget.children[1].innerText
                this.Reload(el.currentTarget.children[1].innerText);
              }.bind(this), true);
        }.bind(this));    
        
        document.getElementById('ContentBlock').style.display = 'block';
         var modal = document.getElementById('myModal1');
            modal.style.display = "none";
            
       this.Reload(1);    
    },
    
    Reload: function(ContentNumber) {
        
                        let executeQuery = {
                                queryCode: 'LoadContent',
                                limit: -1,
                                parameterValues: [{key: "@SessionId", value: this.SessionId }, {key: "@ContentNumber", value: ContentNumber}]
                            };
                            this.queryExecutor(executeQuery, this.load3, this);
                        
        this.ContentNumber = ContentNumber;
    },
    
     
    load3: function(data) {
        
        
        document.getElementById('input_test_qs_text').innerHTML = '<b style="color: #4aacfede;font-size: 0.8em;">Тема по '+data.rows[0].values[5]+'</b><br>'+ data.rows[0].values[0];
        
        if (data.rows[0].values[4] == null) {
            document.getElementById('input_test_attention_inQs').innerText = 'Внимание! Ответ будет дан сразу при выборе одного из предложенных вариантов';
            document.getElementById('input_test_attention_inQs').style.color = 'red';
         
                if (document.getElementsByClassName('test_qs_var')[0]){
                     while (document.getElementsByClassName('test_qs_var')[0]) {
                    document.getElementsByClassName('test_qs_var')[0].remove();
                    }
                }
                
                var list = document.getElementById('input_test_qs_ansvars');
                var i;
                for (i = 0; i < data.rows.length; i++) {
                    var div = document.createElement('div');
                    div.className = "test_qs_var";
                    div.id = "var_div"+data.rows[i].values[1];
                    div.innerHTML = data.rows[i].values[2]+'<input class="ContVariant" id="ContVariant'+data.rows[i].values[1]+'" name="ContVariant" type="hidden" value="'+data.rows[i].values[1]+'">';
                    list.appendChild(div);
        
                    div.addEventListener("click", function(el) {
                   
                        // var els2 = document.getElementsByClassName("qs_lamp");
                        // Array.prototype.forEach.call(els2, function(el2) {
                        //     el2.classList.remove("current_qs");
                        // }.bind(this));
                        // el.currentTarget.classList.add("current_qs");
                        // document.getElementById('ContentTitle').innerText = 'Вопрос №'+el.currentTarget.children[1].innerText
                        // this.Reload(el.currentTarget.children[1].innerText);
                           let executeQuery = {
                                        queryCode: 'UpdateContentVariant',
                                        limit: -1,
                                        parameterValues: [{key: "@SessionId", value: this.SessionId }, {key: "@ContentNumber", value: this.ContentNumber}, {key: "@ContentVariantId", value: el.currentTarget.children[0].value}]
                                    };
                                    this.queryExecutor(executeQuery, this.VerVariant, this);
                                
                      }.bind(this), true);
                };
            
        } else  {
            
            document.getElementById('input_test_attention_inQs').innerText = 'Примечание: '+data.rows[0].values[6];
            document.getElementById('input_test_attention_inQs').style.color = 'green';
                            
            if (document.getElementsByClassName('test_qs_var')[0]){
                     while (document.getElementsByClassName('test_qs_var')[0]) {
                    document.getElementsByClassName('test_qs_var')[0].remove();
                    }
                }
                
                var list = document.getElementById('input_test_qs_ansvars');
                var i;
                for (i = 0; i < data.rows.length; i++) {
                    var div = document.createElement('div');
                    div.className = "test_qs_var";
                    div.id = "var_div"+data.rows[i].values[1];
                    div.innerHTML = data.rows[i].values[2]+'<input class="ContVariant" id="ContVariant'+data.rows[i].values[1]+'" name="ContVariant" type="hidden" value="'+data.rows[i].values[1]+'">';
                    list.appendChild(div);
                };
                
             this.VerVariantData = data;
        //if (Number(data.rows[0].values[0]) == Number(data.rows[0].values[1])) {
                    var self = this;
                    var els = document.getElementsByClassName("test_qs_var");
                    Array.prototype.forEach.call(els, function(el) {
                        //  debugger;
                        if(Number(el.children[0].value) == Number(data.rows[0].values[3])) {
                                el.classList.add("right");
                        }
                        else if(Number(el.children[0].value) == Number(data.rows[0].values[4])) {
                                el.classList.add("wrong");
                        };
                        el.classList.add("disabledbutton");
                        
                    }.bind(this));   
        };
                
        


        //     var BtnContent = document.getElementById('')
    //     document.getElementsByClassName('qs_lamp')
    //     BtnContent.addEventListener("click", function() {
    //       this.handleButtonClick("showWorstest", worstestBtn, greatestBtn);
    //   }.bind(this), true);
        
    },
   VerVariantData: [], 
    VerVariant: function(data) {
    //   debugger;
     this.VerVariantData = data;
        //if (Number(data.rows[0].values[0]) == Number(data.rows[0].values[1])) {
                    var self = this;
                    var els = document.getElementsByClassName("test_qs_var");
                    Array.prototype.forEach.call(els, function(el) {
                        // debugger;
                        if(Number(el.children[0].value) == Number(data.rows[0].values[0])) {
                                el.classList.add("right");
                        }
                        else if(Number(el.children[0].value) == Number(data.rows[0].values[1])) {el.classList.add("wrong");};
                        
                        //if(Number(el.children[0].value) == Number(data.rows[0].values[1])) {el.classList.add("wrong");};
                        //if(Number(el.children[0].value) == Number(data.rows[0].values[0])) {el.classList.add("right");};
                        el.classList.add("disabledbutton");
                    }.bind(this));   
       // };
      //debugger;
         //document.getElementById('input_test_attention_inQs').innerText = 'Внимание! Ответ будет дан сразу при выборе одного из предложенных вариантов';
         //document.getElementById('input_test_attention_inQs').style.color = 'red';
         
        var div = document.getElementsByClassName('current_qs')[0].children[0];
        if (Number(data.rows[0].values[0]) == Number(data.rows[0].values[1])) {
            /*div.remove("qs_lamp_ua");
            div.add("qs_lamp_ra");*/
            div.className = 'qs_lamp_ra';
            // document.getElementById('input_test_attention_inQs').innerText = 'Примечание: '+data.rows[0].values[2];
            // document.getElementById('input_test_attention_inQs').style.color = 'green';
        } else {
            /*div.remove("qs_lamp_ua");
            div.add("qs_lamp_wa");*/
            div.className = 'qs_lamp_wa';
            // document.getElementById('input_test_attention_inQs').innerText = 'Примечание: '+data.rows[0].values[2];
            // document.getElementById('input_test_attention_inQs').style.color = 'green';
        };
        
        if (document.getElementsByClassName('qs_lamp_ua').length > 0) {
            
                var y = document.getElementsByClassName('qs_lamp_ua')[0];
                                    // var y2 = y[0].nextElementSibling;
                                    var event = new Event("click");
                                    y.dispatchEvent(event);
                // document.getElementById('input_test_attention_inQs').innerText = 'Внимание! Ответ будет дан сразу при выборе одного из предложенных вариантов';
                // document.getElementById('input_test_attention_inQs').style.color = 'red';
        } else {
            document.getElementById('input_test_attention_inQs').innerText = 'Примечание: '+data.rows[0].values[2];
            document.getElementById('input_test_attention_inQs').style.color = 'green';
            let executeQuery = {
                        queryCode: 'LoadContentResult',
                        limit: -1,
                        parameterValues: [{key: "@SessionId", value: this.SessionId}]
                    };
                    this.queryExecutor(executeQuery, this.ResultContent, this);
        };
        
     },
     
     ResultContent: function(data) {
         
         var modal2 = document.getElementById('myModal2');
            modal2.style.display = "block";
            document.getElementById('ContentBlock').style.display = 'none';
           
           document.getElementById('nme_res2').value = data.rows[0].values[0]+' из '+(Number(data.rows[0].values[0])+Number(data.rows[0].values[1]));
           document.getElementById('nme_res3').value = data.rows[0].values[2]+'% / '+data.rows[0].values[3]+'%';
            
           if (Number(data.rows[0].values[2]) <= 15) {document.getElementById('nme_res1').value = 'Очень плохо'; document.getElementById('nme_res1').style.color = 'red';}
           if (Number(data.rows[0].values[2]) > 15 && Number(data.rows[0].values[2]) <= 35) {document.getElementById('nme_res1').value = 'Плохо'; document.getElementById('nme_res1').style.color = '#ff7300';}
           if (Number(data.rows[0].values[2]) > 35 && Number(data.rows[0].values[2]) <= 55) {document.getElementById('nme_res1').value = 'Нормально'; document.getElementById('nme_res1').style.color = '#899611';}
           if (Number(data.rows[0].values[2]) > 55 && Number(data.rows[0].values[2]) <= 75) {document.getElementById('nme_res1').value = 'Хорошо'; document.getElementById('nme_res1').style.color = '#53b116';}
           if (Number(data.rows[0].values[2]) > 75 && Number(data.rows[0].values[2]) <= 85) {document.getElementById('nme_res1').value = 'Отлично'; document.getElementById('nme_res1').style.color = '#16a4b1';}
           if (Number(data.rows[0].values[2]) > 85 && Number(data.rows[0].values[2]) <= 95) {document.getElementById('nme_res1').value = 'Прекрасно'; document.getElementById('nme_res1').style.color = '#1639b1';}
           if (Number(data.rows[0].values[2]) > 95) {document.getElementById('nme_res1').value = 'Лучше не бывает'; document.getElementById('nme_res1').style.color = '#161cb1';}
     
         var BtnResultContent = document.getElementById('btn_createContentResult');
         BtnResultContent.addEventListener("click", function() {
                       
            var modal2 = document.getElementById('myModal2');
            modal2.style.display = "none";
            document.getElementById('ContentBlock').style.display = 'block';    
            document.getElementById('ResultView').style.display = 'block';        
                        
              }.bind(this), true);
         
         var BtnResultContent2 = document.getElementById('btn_createContentResult_View');
         BtnResultContent2.addEventListener("click", function() {
                       
            var modal2 = document.getElementById('myModal2');
            modal2.style.display = "block";
            document.getElementById('ContentBlock').style.display = 'none';    
              }.bind(this), true); 
     }
    
    
};
}());

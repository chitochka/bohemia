var db = {}
let ls = localStorage;
ls.users = ls.users ? ls.users :   JSON.stringify({})


// var isAuth = function () {
// 	return new Promise(
// 			function(succeed, fail) {
// 				setTimeout(function(){
// 					var isAuth = localStorage.getItem('isAuth') == "true"
// 					console.log('PROMISE AUTH =', isAuth)
// 					isAuth ?
// 						succeed(true):
// 						fail(false)
// 				},0)
// 			})
// }


var isAuth = function () {
	return new Promise(
			function(succeed, fail) {
				setTimeout(function(){
					var isAuth = localStorage.getItem('isAuth')
					console.log('PROMISE AUTH =', isAuth)
					isAuth ? succeed(isAuth) : fail(false)
				},0)
			})
}

var isAuth1 = function () { return localStorage.getItem('isAuth') == "true"}

var isUserExist = (userName) => {
  var users = JSON.parse(localStorage.users)
  return  (Object.keys(users).indexOf(userName) >= 0)
} 

var isMailExist = (email) => { 
	var users = JSON.parse(localStorage.users)
	for (var user in users){
		if (users[user].email === email) return true
	}
	return false
}


var registrace = (user) => {
	return new Promise(
			function(succeed, fail) {
				setTimeout(function(){
      				if (isUserExist(user.loginName)) fail("Tento NickName jiz exestyuji") 
					else  if (isMailExist(user.email)) fail("Tento email jiz exestyuji")
					else {
						// var users = JSON.parse(ls.users)
						console.log("ok")
						// users[user.loginName] = user
				 		// ls.users = JSON.stringify(users);
						succeed("New user")
					}
				},1200)
			})
}

var prihlaseni = (userName, password) => {
	return new Promise(
			function(succeed, fail) {
				setTimeout(function(){
					var users = JSON.parse(ls.users)
					if (isUserExist(userName) && ( users[userName].password === password)) {
						ls.isAuth = userName
         				console.log('PROMISE IN ls.isAuth ='+ ls.isAuth )
           				succeed("UserName a Heslo jsou spravne")
			        } else fail("UserName nebo Heslo nejsou spravne") 
				},1500)
			})
}



var getData = () => {
	return new Promise(
			function(succeed, fail) {
				setTimeout(function(){
					var userName = ls.isAuth
					if (!ls.isAuth) fail(" CHYBA ")
					else { 
						var users = JSON.parse(ls.users)
						var data =users[userName]
						console.log('\n\nuserData', data   )
						succeed(data)
					}
				},500)
			})
}




/* VZOR  STRUKTURY  pro save v DB   */

window.
	uu = {
		loginName:'Alex',
		password:'aaa',
		email: "aa@aa.cz",
		jmeno : "",
		primeni: "",
		address:'',
		avatar : ""
	}






db = {
  isAuth : isAuth,
  registrace: registrace,
  prihlaseni: prihlaseni,
  getData
}

window.db=db
window.ls=localStorage

export default db 








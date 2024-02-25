var tweets = [];
var tweetid;
var userId = null;

function signUp() {
	const userData = {
		userName: document.getElementById("signUpName").value,
		userEmail: document.getElementById("signUpEmail").value,
		userPassword: document.getElementById("signUpPassword").value,
	};

	document.getElementById("signUpEmail").value = "";
	document.getElementById("signUpName").value = "";
	document.getElementById("signUpPassword").value = "";

	fetch("http://localhost:8080/postbook/webapi/twitter/users/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	})
		.then((resp) => {
			if (resp.status === 200) {
				// Sign-up success
				$('#signupSuccessModal').modal('show');
			} else {
				// Sign-up failed
				$('#signupFailModal').modal('show');
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

function signIn() {
	const userEmailInput = document.getElementById("signInEmail");
	const userPasswordInput = document.getElementById("signInPassword");
	const userData = {
		userEmail: userEmailInput.value,
		userPassword: userPasswordInput.value,
	};

	userEmailInput.value = "";
	userPasswordInput.value = "";

	fetch("http://localhost:8080/postbook/webapi/twitter/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	})
		.then((resp) => {
			if (resp.status === 200) {
				// Successful login
				console.log("success");
				$('#signInSuccessModal').modal('show'); // Show success modal
				document.getElementById("feed-tab").disabled = false;
				document.getElementById("profile-tab").disabled = false;
				document.getElementById("my-tweets-tab").disabled = false;
				document.getElementById("sign-in-tab").hidden = true;
				document.getElementById("sign-up-tab").hidden = true;
				document.getElementById("logout-tab").hidden = false;
				getTweets();
				const feedTabButton = document.getElementById("feed-tab");
				feedTabButton.click();
				return resp.json();
			} else if (resp.status === 204) {
				// No content
				throw new Error("Wrong email or password");
			}
		})
		.then((data) => {
			userId = data.userId;
			console.log(userId);
		})
		.catch((error) => {
			console.error("Error:", error);
			$('#signInFailureModal').modal('show'); // Show failure modal
		});
}


function signIn() {
	const userEmailInput = document.getElementById("signInEmail");
	const userPasswordInput = document.getElementById("signInPassword");
	const userData = {
		userEmail: userEmailInput.value,
		userPassword: userPasswordInput.value,
	};
	document.getElementById("signInEmail").value = "";
	userPasswordInput.value = "";

	fetch("http://localhost:8080/postbook/webapi/twitter/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	})
		.then((resp) => {
			if (resp.status === 200) {
				// Successful login
				$('#signInSuccessModal').modal('show');
				document.getElementById("feed-tab").disabled = false;
				document.getElementById("profile-tab").disabled = false;
				document.getElementById("my-tweets-tab").disabled = false;
				document.getElementById("sign-in-tab").hidden = true;
				document.getElementById("sign-up-tab").hidden = true;
				document.getElementById("logout-tab").hidden = false;
				getTweets();
				const feedTabButton = document.getElementById("feed-tab");
				feedTabButton.click();
				return resp.json();
			} else if (resp.status === 204) {
				// No content
				throw new Error("Wrong email or password");
			}
		})
		.then((data) => {
			userId = data.userId;
			console.log(userId);
		})
		.catch((error) => {
			console.error("Error:", error);
			$('#signInFailedModal').modal('show');
		});
}

function addTweet() {

	// const userName=document.getElementById("name").value;
	const tweetBody = document.getElementById("tweetBody").value;
	console.log(tweetBody);
	const tweetData = {
		// tweetBody: document.getElementById("body").value,
		tweetBody: tweetBody,
		user: {
			userId: userId
		},
	};
	fetch("http://localhost:8080/postbook/webapi/twitter/tweets/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(tweetData),
	})
		.then((resp) => {
			getTweets();
			resp.json();
		})
		.then(data => {
			console.log(data)
			tweetid = data.tweetId;
			alert("Tweet ADD.")
		});
}


function getTweets() {
	fetch("http://localhost:8080/postbook/webapi/twitter/tweets/getAllTweet", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	})
		.then((res) => res.json())
		.then((data) => {
			Object.assign(tweets, data);
			console.log("Data :", data);
			mapTweetsToCard(data);
		});
}

function mapTweetsToCard(tweets) {
	var listString = "";

	for (let i = 0; i < tweets.length; i++) {
		listString += `
            <div class="tweet-card">
                <div class="tweet-header">
                    <img src="${tweets[i].user.userAvatar}" alt="User Avatar" class="user-avatar">
                    <div class="user-info">
                        <div class="user-name">${tweets[i].user.userName}</div>
                        <div class="user-username">@${tweets[i].user.userName}</div>
                    </div>
                </div>

                <div class="tweet-content">
                    ${tweets[i].tweetBody}
                </div>

                <div class="tweet-actions">
                    <div class="action-button">
                        <button class="text-body-secondary" onclick="likeTweet(${tweets[i].tweetId})">Likes: ${tweets[i].tweetLikes}</button>
                    </div>
                    <div class="action-button">Retweet</div>
                </div>
            </div>`;
	}

	document.getElementById("namesList").innerHTML = listString;
}



function logout() {
	document.getElementById("feed-tab").disabled = true;
	document.getElementById("profile-tab").disabled = true;
	document.getElementById("my-tweets-tab").disabled = true;
	document.getElementById("sign-in-tab").hidden = false;
	document.getElementById("sign-up-tab").hidden = false;
	document.getElementById("logout-tab").hidden = true;

	const signInTabButton = document.getElementById("sign-in-tab");
	signInTabButton.click();

}

function viewMyTweets() {

	fetch(`http://localhost:8080/postbook/webapi/twitter/tweets/myTweet/${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(resp => resp.json())
		.then(data => {
			console.log(data);
			mapMyTweetsToCard(data)
		})

}

function mapMyTweetsToCard(tweets) {
    var listString = "";

    for (let i = 0; i < tweets.length; i++) {
        listString += `<div class="my-tweet-card" style="max-width: 540px;">
                            <div class="">
                                <div class="my-tweet-header">
                                    <img src="${tweets[i].user.userAvatar}" class="my-user-avatar" alt="...">
                                </div>
                                <div class="my-tweet-body">
                                    <div class="my-tweet-user-info">
                                        <h5 class="my-user-name">${tweets[i].user.userName}</h5>
                                        <p class="my-tweet-content">${tweets[i].tweetBody}.</p>
                                        <p class="my-tweet-likes">Likes: ${tweets[i].tweetLikes}</p>
                                    </div>
                                    <button type="button" class="my-delete-button" onClick="deleteTweet(${tweets[i].tweetId})"<i class="bi bi-trash"></i>Delete</button>
                                </div>
                            </div>
                        </div>`;
    }
    document.getElementById('mytweets').innerHTML = listString;
}


function likeTweet(tweetId) {

	fetch(`http://localhost:8080/postbook/webapi/twitter/tweets/likes/${tweetId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((resp) => {
			getTweets();
			resp.json()
		})
		.then((data) => console.log(data))
}

function deleteTweet(tweetId) {

	fetch(`http://localhost:8080/postbook/webapi/twitter/tweets/deleteTweet/${tweetId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then((resp)=>{
		myTweets();
		resp.json()
	})
	.then((data) => {
		console.log(data)
	})
}

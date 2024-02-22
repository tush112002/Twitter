package com.model;

public class Tweets {
	private int tweetId;
	private String tweetBody;
	private int tweetLikes;
	private Users user;

	
	public Tweets() {}
	public Tweets(int tweetId, String tweetBody, int tweetLikes) {
		super();
		this.tweetId = tweetId;
		this.tweetBody = tweetBody;
		this.tweetLikes = tweetLikes;
	}
	

	public Tweets(int tweetId, String tweetBody, int tweetLikes, Users user) {
		super();
		this.tweetId = tweetId;
		this.tweetBody = tweetBody;
		this.tweetLikes = tweetLikes;
		this.user = user;
	}


	public int getTweetId() {
		return tweetId;
	}

	public void setTweetId(int tweetId) {
		this.tweetId = tweetId;
	}

	public String getTweetBody() {
		return tweetBody;
	}

	public void setTweetBody(String tweetBody) {
		this.tweetBody = tweetBody;
	}

	public int getTweetLikes() {
		return tweetLikes;
	}

	public void setTweetLikes(int tweetLikes) {
		this.tweetLikes = tweetLikes;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Tweets [tweetId=" + tweetId + ", tweetBody=" + tweetBody + ", tweetLikes=" + tweetLikes + ", user="
				+ user + "]";
	}

}

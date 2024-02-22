package com.model;

public class Users {
	private int userId;
	private String userName;
	private String userEmail;
	private String userPassword;
	private String userBio;
	private String userAvatar;

	public Users() {

	}
	
	public Users(int userId) {
		super();
		this.userId = userId;
	}

	public Users(int userId, String userName, String userEmail, String userPassword, String userBio,
			String userAvatar) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.userBio = userBio;
		this.userAvatar = userAvatar;
	}

	public Users(int userId, String userName, String userEmail, String userBio, String userAvatar) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userEmail = userEmail;
		this.userBio = userBio;
		this.userAvatar = userAvatar;
	}

	public Users(int userId, String userName, String userEmail, String userAvatar) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.userEmail = userEmail;
		this.userAvatar = userAvatar;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserBio() {
		return userBio;
	}

	public void setUserBio(String userBio) {
		this.userBio = userBio;
	}

	public String getUserAvatar() {
		return userAvatar;
	}

	public void setUserAvatar(String userAvatar) {
		this.userAvatar = userAvatar;
	}

	@Override
	public String toString() {
		return "Users [userId=" + userId + ", userName=" + userName + ", userEmail=" + userEmail + ", userPassword="
				+ userPassword + ", userBio=" + userBio + ", userAvatar=" + userAvatar + "]";
	}

}

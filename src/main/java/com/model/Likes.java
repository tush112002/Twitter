package com.model;

public class Likes {
	private int likesCount;

	public Likes() {

	}

	public Likes(int likesCount) {
		this.likesCount = likesCount;
	}

	public int getLikesCount() {
		return likesCount;
	}

	public void setLikesCount(int likesCount) {
		this.likesCount = likesCount;
	}

	@Override
	public String toString() {
		return "Likes [likesCount=" + likesCount + "]";
	}

}

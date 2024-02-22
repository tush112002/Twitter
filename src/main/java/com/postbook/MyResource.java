package com.postbook;

import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.model.Likes;
import com.model.Post;
import com.model.Status;
import com.model.Tweets;
import com.model.Users;

import dao.PostsDAOImpl;
import dao.TweetDAOImpl;
import dao.UserDAOImpl;

@Path("twitter")
public class MyResource {

//	<------------------User url------------------>

	UserDAOImpl userImpl = new UserDAOImpl();

	@Path("users/add")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Status addUser(Users user) throws SQLException {
		return userImpl.signUp(user);
	}

	@Path("users/login")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Users loginUser(Users user) throws SQLException {
		return userImpl.signIn(user);
	}

	@Path("users/getUser")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Users getUser(Users user) throws SQLException {
		return userImpl.viewProfile(user);
	}

	@Path("users/updateUser")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Status updateUser(Users user) throws SQLException {
		return userImpl.updateProfile(user);
	}

//	<-----------------Tweets url------------------>

	TweetDAOImpl tweetImpl = new TweetDAOImpl();

	@Path("tweets/add")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Status addTweet(Tweets tweet) throws SQLException {
		return tweetImpl.addNewTweet(tweet);
	}

	@Path("tweets/myTweet/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Tweets> getMyTweet(@PathParam("id") int id) throws SQLException {
		return tweetImpl.viewMyTweet(id);
	}

	@Path("tweets/deleteTweet/{id}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public Status deleteTweet(@PathParam("id") int id) throws SQLException {
		return tweetImpl.deleteMyTweet(id);
	}

	@Path("tweets/getAllTweet")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Tweets> getAllTweet() throws SQLException {
		return tweetImpl.viewAllTweet();
	}
	
	@Path("tweets/likes/{id}")
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	public Likes likeTweet(@PathParam("id") int id) throws SQLException{
		return tweetImpl.incrementLikes(id);
	}
	

}

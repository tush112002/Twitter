package dao;

import java.sql.SQLException;
import java.util.List;

import com.model.Likes;
import com.model.Status;
import com.model.Tweets;


public interface TweetDAO {
	Status addNewTweet(Tweets tweet) throws SQLException;

	List<Tweets> viewMyTweet(int userId) throws SQLException;

	void updateMyTweet();

	Status deleteMyTweet(int tweetId) throws SQLException;

	List<Tweets> viewAllTweet() throws SQLException;
	
	Likes incrementLikes(int tweetId) throws SQLException;
}

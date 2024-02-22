package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.model.Likes;
import com.model.Status;
import com.model.Tweets;
import com.model.Users;

public class TweetDAOImpl implements TweetDAO {

	private Connection connection;

	public TweetDAOImpl() {
		// TODO Load the DBUtil class
		connection = DBUtil.getConnection();
		System.out.println("Tweet impl's connection= " + connection.hashCode());
	}

	@Override
	public Status addNewTweet(Tweets tweet) throws SQLException {
		// TODO Auto-generated method stub
		String sql = "Insert into Tweets (tweet_body, user_id) values(?, ?)";
		PreparedStatement pst = connection.prepareStatement(sql);

		pst.setString(1, tweet.getTweetBody());
		pst.setInt(2, tweet.getUser().getUserId());

		int res = pst.executeUpdate();

		return new Status((res == 1) ? true : false);

	}

	@Override
	public List<Tweets> viewMyTweet(int userId) throws SQLException {
		// TODO Auto-generated method stub
		String sql = "SELECT tweet_id,tweet_body,t.likes,u.user_id,u.user_name,u.user_email,u.user_avatar FROM TWEETS as t INNER JOIN  users as u on u.user_id=t.user_id where u.user_id=?";
		PreparedStatement pst = connection.prepareStatement(sql);

		pst.setInt(1, userId);
		ResultSet rs = pst.executeQuery();
		List<Tweets> list = new ArrayList<>();
		while (rs.next()) {
			list.add(new Tweets(rs.getInt(1), rs.getString(2), rs.getInt(3),
					new Users(rs.getInt(4), rs.getString(5), rs.getString(6), rs.getString(7))));
		}
		return list;

	}

	@Override
	public void updateMyTweet() {
		// TODO Auto-generated method stub

	}

	@Override
	public Status deleteMyTweet(int tweetId) throws SQLException {
		// TODO Auto-generated method stub

		String sql = "delete from tweets where tweet_id=?";
		PreparedStatement pst = connection.prepareStatement(sql);

		pst.setInt(1, tweetId);
		int res = pst.executeUpdate();

		Status s = new Status();
		if (res != 0) {
			s.setQueryStatus(true);
			return s;
		}
		s.setQueryStatus(false);
		return s;

	}

	@Override
	public List<Tweets> viewAllTweet() throws SQLException {
		String sql = "SELECT tweet_id,tweet_body,t.likes,u.user_id,u.user_name,u.user_email,u.user_avatar FROM TWEETS as t INNER JOIN  users as u on u.user_id=t.user_id";
		Statement st = connection.createStatement();

		ResultSet rs = st.executeQuery(sql);
		List<Tweets> list = new ArrayList<>();
		while (rs.next()) {
			list.add(new Tweets(rs.getInt(1), rs.getString(2), rs.getInt(3),
					new Users(rs.getInt(4), rs.getString(5), rs.getString(6), rs.getString(7))));
		}
		return list;

	}

	@Override
	public Likes incrementLikes(int tweetId) throws SQLException {
		String sql = "update tweets set likes= ((select nvl2(likes, likes, 0) from tweets where tweet_id=?)+1) where tweet_id=?;";

		PreparedStatement pst = connection.prepareStatement(sql);

		pst.setInt(1, tweetId);
		pst.setInt(2, tweetId);

		pst.executeUpdate();
		String likesSql = "select likes from tweets where tweet_id=?";
		PreparedStatement pst1 = connection.prepareStatement(likesSql);
		pst1.setInt(1, tweetId);
		ResultSet rs = pst1.executeQuery();
		int likes = -1;
		if (rs.next()) {
			likes = rs.getInt(1);
		}

		return new Likes(likes);
	}

}

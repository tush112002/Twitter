package dao;

import java.sql.SQLException;

import com.model.Status;
import com.model.Users;

public interface UserDAO {
	Status signUp(Users user) throws SQLException;

	Users signIn(Users user) throws SQLException;

	Users viewProfile(Users user) throws SQLException;

	Status updateProfile(Users user) throws SQLException;
}

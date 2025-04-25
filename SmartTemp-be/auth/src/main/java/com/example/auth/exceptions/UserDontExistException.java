package com.example.auth.exceptions;

public class UserDontExistException extends RuntimeException{
    public UserDontExistException(String message) {
        super(message);
    }

    public UserDontExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserDontExistException(Throwable cause) {
        super(cause);
    }
}

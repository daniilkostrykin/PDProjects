package com.dmitry.AutoPass.user;

public class EmailAlreadyRegisteredException extends RuntimeException {
    public EmailAlreadyRegisteredException(String msg) { super(msg); }
}

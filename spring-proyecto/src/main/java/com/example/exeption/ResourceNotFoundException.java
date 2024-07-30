package com.example.exeption;
public class ResourceNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 4897007402143992137L;

	public ResourceNotFoundException(String message) {
        super(message);
    }
}

package com.spring_boot_projects.RBAC;

import com.spring_boot_projects.RBAC.entities.Role;
import com.spring_boot_projects.RBAC.entities.User;
import com.spring_boot_projects.RBAC.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class RbacApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(RbacApplication.class, args);
	}

	public void run(String... args){
		Optional<User> adminAccount = userRepository.findByRole(Role.ADMIN);
		if(adminAccount.isEmpty()){
			User user = new User();

			user.setUsername("admin");
			user.setEmail("admin@gmail.com");
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
			user.setRole(Role.ADMIN);

			userRepository.save(user);
		}
	}

}

package com.spring_boot_projects.RBAC.dto;

import lombok.Data;

@Data
public class EmailRequest {

    private String to;
    private String subject;
    private String body;
;}

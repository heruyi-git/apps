/*
 * generate java source by Generator
 * Create time in $date Tue Oct 10 21:07:20 CST 2017
 * Copyright 2017-2026 org.uyi organization.
 */
package com.example.demo.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.uyi.h.dao.model.PageBean;
import org.uyi.h.web.controller.mvc.SpringWeb;

import com.example.demo.bll.service.IDemoSingleTable1Service;
import com.example.demo.dal.entity.DemoSingleTable1;

@Controller
/**
 * <p> action </p>
 * @author hry
 * @version Date: Tue Oct 10 21:07:20 CST 2017
 */
@RequestMapping("/")
public class AreaAction extends SpringWeb {

	@Autowired
	private IDemoSingleTable1Service service;
	
	@RequestMapping("/index")
	public  String index(DemoSingleTable1 model,
			String beginTime, String endTime) {
		request.setAttribute("a", "xx");
		PageBean<DemoSingleTable1> page = createPage(DemoSingleTable1.class)
				.orderDesc("id");
		service.findByPage(page, model, beginTime, endTime);
		return "index";
//		try {
//			response.sendRedirect("/WEB-INF/jsp/error.jsp");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return null;
	}
	
	
//	@RequestMapping("/login")
//	public String login() {
//		return "login";
//	}
	
	@RequestMapping("/errorx")
	public String error() {
		request.setAttribute("a", "xx");
		return "error";
	}


}

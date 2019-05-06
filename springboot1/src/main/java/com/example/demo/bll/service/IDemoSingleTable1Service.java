/*
 * generate java source by Generator
 * Create time in $date Wed Sep 20 22:24:42 CST 2017
 * Copyright 2017-2026 org.uyi organization.
 */
package com.example.demo.bll.service;

import org.uyi.h.dao.base.IBaseService;
import org.uyi.h.dao.model.PageBean;

import com.example.demo.dal.entity.DemoSingleTable1;


/**
 * <p> service </p>
 * @author hry
 * @version Date: Wed Sep 20 22:24:42 CST 2017
 */
public interface IDemoSingleTable1Service extends IBaseService<DemoSingleTable1>{

	public void findByPage(PageBean<DemoSingleTable1> page, DemoSingleTable1 en, String beginTime, String endTime);

}

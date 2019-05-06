/*
 * generate java source by Generator
 * Create time in $date Wed Sep 20 22:24:42 CST 2017
 * Copyright 2017-2026 org.uyi organization.
 */
package com.example.demo.bll.service.impl;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.uyi.h.dao.base.impl.BaseService;
import org.uyi.h.dao.model.PageBean;
import org.uyi.h.dao.model.Query;

import com.example.demo.bll.service.IDemoSingleTable1Service;
import com.example.demo.dal.dao.DemoSingleTable1Dao;
import com.example.demo.dal.entity.DemoSingleTable1;


/**
 * <p> serviceImpl </p>
 * @author hry
 * @version Date: Wed Sep 20 22:24:42 CST 2017
 */
@Service
public class DemoSingleTable1Service extends BaseService<DemoSingleTable1Dao, DemoSingleTable1> implements IDemoSingleTable1Service{

	@Transactional(readOnly=true)
	public void findByPage(PageBean<DemoSingleTable1> page,DemoSingleTable1 en, String beginTime, String endTime){
		Query<DemoSingleTable1> query = Query.forClass(DemoSingleTable1.class);
		query.andGe("addTime", beginTime).andLe("addTime", endTime);
		dao.findInPage(page, en, query);
//		dao.getSession("ZNHGLXT").findInPage(page, en, query);
	}
	
	@Autowired
	DemoSingleTable1Dao dao2;
	/**
	 * 测试分布式事务
	 */
//	@Transactional(propagation=Propagation.NESTED,isolation=Isolation.SERIALIZABLE)
	@Override
	public Serializable add(DemoSingleTable1 en) {
		System.out.println(dao2);
		dao.getSession().save(en);
//		return add2(en);
		dao.getSession("h").save(en);
		en.setId(1);
		return dao.getSession().save(en);
	}
	
//	@Transactional(propagation=Propagation.NESTED,isolation=Isolation.SERIALIZABLE)
//	public Serializable add2(DemoSingleTable1 en) {
//		// 跨数据库需要使用JTA事务管理器或自定义手动事务
//		Session session = dao.getSession("h");
//		try{
//			session.beginTransaction();
//			session.insert(en);
//			en.setId(1);
//			Serializable id = session.save(en);
//			session.commit();
//			return id;
//		}catch (Exception e) {
//			session.rollback();
//			throw new DALException(e);
//		}finally{
//			// connection closed by spring dataSourceUtils transaction
//		}
//	}

}

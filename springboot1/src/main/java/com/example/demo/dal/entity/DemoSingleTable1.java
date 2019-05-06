/*
 * generate java source by Generator
 * Create time in $date Wed Sep 20 22:24:42 CST 2017
 * Copyright 2017-2026 org.uyi organization.
 */
package com.example.demo.dal.entity;

import java.io.Serializable;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.format.annotation.DateTimeFormat;
import org.uyi.h.dao.annotation.Column;
import org.uyi.h.dao.annotation.PrimaryKeyGenerator;
import org.uyi.h.dao.annotation.Table;
import org.uyi.h.dao.annotation.PrimaryKeyGenerator.KeyGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;


/**
 * <p> entity </p>
 * @author hry
 * @version Date: Wed Sep 20 22:24:42 CST 2017
 */
@XmlRootElement(name = "table1")  
@Table(name = "demo_single_table1")
public class DemoSingleTable1 implements Serializable {

	public static final long serialVersionUID = 1L;

	/**------------------------------------------------------
	 *	ID
	 *-------------------------------------------------------*/
	@PrimaryKeyGenerator(type = KeyGenerator.increment)
	private Serializable id;
	public void setId(Serializable id){
		this.id=id;
	}
	public Serializable getId(){
		return id;
	}

	/**------------------------------------------------------
	 *	表名
	 *-------------------------------------------------------*/
	@Column(name = "table_name")
	private String tableName;
	public void setTableName(String tableName){
		this.tableName=tableName;
	}
	public String getTableName(){
		return tableName;
	}

	/**------------------------------------------------------
	 *	描述
	 *-------------------------------------------------------*/
	@Column(name = "table_desc")
	private String tableDesc;
	public void setTableDesc(String tableDesc){
		this.tableDesc=tableDesc;
	}
	public String getTableDesc(){
		return tableDesc;
	}

	/**------------------------------------------------------
	 *	添加时间
	 *-------------------------------------------------------*/
	@Column(name = "add_time")
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	private Date addTime;
	public void setAddTime(Date addTime){
		this.addTime=addTime;
	}
	public Date getAddTime(){
		return addTime;
	}

}

package com.example.demo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;
import org.springframework.transaction.jta.JtaTransactionManager;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.uyi.h.dao.pool.RoutingTransactionManager;
import org.uyi.h.dao.pool.RoutingTransactionManagerRegister;
import org.uyi.h.web.controller.mvc.viewResolver.ByteRangeViewResolver;
import org.uyi.h.web.controller.mvc.viewResolver.ExcelViewResolver;
import org.uyi.h.web.controller.mvc.viewResolver.ExceptionViewResolver;
import org.uyi.h.web.controller.mvc.viewResolver.Jaxb2MarshallingXmlViewResolver;
import org.uyi.h.web.controller.mvc.viewResolver.JsonViewResolver;
import org.uyi.h.web.controller.mvc.viewResolver.ProgressMultipartResolver;
import org.uyi.h.web.controller.socket.LogHandShake;
import org.uyi.h.web.controller.socket.LogWebSocketHandler;

import com.atomikos.icatch.jta.UserTransactionManager;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebMvc
@EnableTransactionManagement
@EnableWebSocket
@ComponentScan(basePackages = {"org.uyi.h.web.controller","org.uyi.h.dao.base.impl","com.example.demo.web"})
public class WebConfig extends /*WebMvcConfigurationSupport*/WebMvcConfigurerAdapter implements TransactionManagementConfigurer ,WebSocketConfigurer {

//	 @Bean
//	 public DynamicDataSourceRegister dynamicDataSourceRegister(){
//	 return new DynamicDataSourceRegister();
//	 }
//	 @Bean
//	 public DataSource dynamicDataSource() {
//	 DynamicDataSource dynamicDataSource = new DynamicDataSource();
//	 dynamicDataSource.setTargetDataSources(dynamicDataSourceRegister().getCustomDataSources());
//	 dynamicDataSource.setDefaultTargetDataSource(dynamicDataSourceRegister().getDefaultDataSource());
//	 return dynamicDataSource;
//	 }
//	 @Bean
//	 public PlatformTransactionManager txManager() {
//	 DataSourceTransactionManager routingTransactionManager = new
//	 DataSourceTransactionManager(dynamicDataSource());
//	 return routingTransactionManager;
//	 }
//	 @Bean
//	 public PlatformTransactionManager annotationDrivenTransactionManager() {
//	 return txManager();
//	 }

	// @Bean
	// public DynamicTransaction dynamicTxManager(){
	// return new DynamicTransaction();
	// }
	
//	/**
//	 * jta 事务管理
//	 */
//	@Bean(destroyMethod = "close", initMethod = "init")
//	public UserTransactionManager userTransactionManager() {
//	    UserTransactionManager userTransactionManager = new UserTransactionManager();
//	    userTransactionManager.setForceShutdown(false);
//	    return userTransactionManager;
//	}


	/**
	 * jdbc 事务管理
	 */
	@Bean
	public RoutingTransactionManagerRegister routingTransactionManagerRegister() {
		return new RoutingTransactionManagerRegister();
	}

	/**
	 * spring jdbc 注解事务管理 你说呢 还好啊这样呢 这样吧ww我 你说呢 wW好吧
	 */
	@Bean
	public PlatformTransactionManager annotationDrivenTransactionManager() {
		RoutingTransactionManager routingTransactionManager = new RoutingTransactionManager();
		routingTransactionManager.setTargetTransactionManagers(routingTransactionManagerRegister().getTargetTransactionManagers());
		return routingTransactionManager;
//		JtaTransactionManager jtaTransactionManager = new JtaTransactionManager();
//	    jtaTransactionManager.setTransactionManager(userTransactionManager());
//	    return jtaTransactionManager;
	}
     
     
	/*
	 * Configure sessionInterceptor Processing session timeout
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(sessionInterceptor()).addPathPatterns(
//				"/**");
	}

	/*
	 * Configure ContentNegotiatingViewResolver
	 */
	@Bean
	public ViewResolver contentNegotiatingViewResolver(
			ContentNegotiationManager manager) {
		ContentNegotiatingViewResolver resolver = new ContentNegotiatingViewResolver();
		resolver.setContentNegotiationManager(manager);

		// Define all possible view resolvers
		List<ViewResolver> resolvers = new ArrayList<ViewResolver>();

		resolvers.add(jaxb2MarshallingXmlViewResolver());
		resolvers.add(jspViewResolver());
		resolvers.add(excelViewResolver());
		resolvers.add(jsonViewResolver());
		resolvers.add(byteRangeViewResolver());
		resolver.setViewResolvers(resolvers);
		return resolver;
	}
	
	/*
	 * Configure View resolver to provide HTML output This is the default format
	 * in absence of any type suffix.
	 */
	@Bean
	public ViewResolver jspViewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
		viewResolver.setViewClass(JstlView.class);
		viewResolver.setPrefix("/WEB-INF/jsp/");
		viewResolver.setSuffix(".jsp");
		return viewResolver;
	}

	/*
	 * Configure View resolver to provide XML output Uses JAXB2 marshaller to
	 * marshall/unmarshall POJO's (with JAXB annotations) to XML
	 */
	@Bean
	public ViewResolver jaxb2MarshallingXmlViewResolver() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();  
//        marshaller.setClassesToBeBound(org.uyi.h.app.common.dal.entity.DemoSingleTable1.class,org.uyi.h.common.vo.result.Result.class);  
        marshaller.setPackagesToScan("org.uyi.h.app.common.dal.entity","org.uyi.h.common.vo.result");
        return new Jaxb2MarshallingXmlViewResolver(marshaller);  
	}

	/*
	 * Configure View resolver to provide JSON output using JACKSON library to
	 * convert object in JSON format.
	 */
	@Bean
	public ViewResolver jsonViewResolver() {
		return new JsonViewResolver();
	}

	/*
	 * Configure View resolver to provide XLS output using Apache POI library to
	 * generate XLS output for an object content
	 */
	@Bean
	public ViewResolver excelViewResolver() {
		return new ExcelViewResolver();
	}


	/*
	 * file upload
	 */
	@Bean
	public MultipartResolver multipartResolver() throws IOException {
		CommonsMultipartResolver multipartResolver = new ProgressMultipartResolver();
		multipartResolver.setMaxUploadSize((1024<<10)*2000);
		//multipartResolver.setUploadTempDir(new FileSystemResource("/upload/tmp"));
		return multipartResolver;
	}
	
	/*
	 * ByteRangeViewResolver
	 * ModelAndView mv = new ModelAndView("byteRangeView");  
		mv.addObject("file", new File("E:\\test.mp4"));  
		mv.addObject("contentType", "video/mp4");  
		return mv;  
	 */
	@Bean
	public ViewResolver byteRangeViewResolver() {
		return new ByteRangeViewResolver();
	}
	
	
	/*
	 * Configure ExceptionViewResolver resolver
	 */
	@Bean
	public HandlerExceptionResolver exceptionViewResolver() {
		return new ExceptionViewResolver();
	}
	
	
//	@Resource
//	MyWebSocketHandler handler;
	
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		// TODO Auto-generated method stub
		registry.addHandler(getSocketHandler() , "/ws").addInterceptors(new LogHandShake());

		registry.addHandler(getSocketHandler(), "/ws/sockjs").addInterceptors(new LogHandShake()).withSockJS();
	}
	
	@Bean
	public WebSocketHandler getSocketHandler() {
		return new LogWebSocketHandler();
	}
	

	/*
	 * static resources mapping -web.xml configuration
	 * jsp use /js/** --> /WEB-INF/js/
	 */
	// @Override
	// public void addResourceHandlers(ResourceHandlerRegistry registry) {
	// registry.addResourceHandler("/js/**").addResourceLocations("/js/");
	// }
	
	/*
	 * ResourceBundleMessageSource
	 * LocalResover
	 * ThemeResovler
	 */
//	@Bean  
//    public MessageSource messageSource() {  
//        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();  
//        messageSource.setBasename("config.messages.messages");  
//        return messageSource;  
//    }  

	/*
	 * Configure ContentNegotiationManager
	 */
	@Override
	public void configureContentNegotiation(
			ContentNegotiationConfigurer configurer) {
		configurer.ignoreAcceptHeader(true).defaultContentType(
				MediaType.TEXT_HTML);
	}
	
	/*
	 * configureMessageConverters
	 */
//	@Override
//    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
//        ObjectMapper objectMapper = Jackson2ObjectMapperBuilder.json().build();
//        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(objectMapper);
//        List<MediaType> mediaTypes = new ArrayList<MediaType>();
//        mediaTypes.add(MediaType.TEXT_HTML);
//        mediaTypes.add(MediaType.APPLICATION_XML);
//        mediaTypes.add(MediaType.APPLICATION_JSON);
//        converter.setSupportedMediaTypes(mediaTypes);
//        converters.add(converter);
//    }
	
}

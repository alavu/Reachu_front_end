//package com.ReachU.ServiceBookingSystem.configs;
//
//import jakarta.servlet.*;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.core.Ordered;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//
//@Component
//@Order(Ordered.HIGHEST_PRECEDENCE)
//public class SimpleCorsFilter implements Filter {
//
//    public SimpleCorsFilter() {
//    }
//
//    @Override
//    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
//        HttpServletResponse response = (HttpServletResponse) res;
//        HttpServletRequest request = (HttpServletRequest) req;
//
//        String originHeader = request.getHeader("Origin");
//        response.setHeader("Access-Control-Allow-Origin", originHeader != null ? originHeader : "*");
//        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With, Accept, Origin");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//
//        // Add security headers
//        response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//        response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//        response.setHeader("Cross-Origin-Resource-Policy", "same-origin");
//
//        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
//            response.setStatus(HttpServletResponse.SC_OK);
//        } else {
//            chain.doFilter(req, res);
//        }
//    }
//
//    @Override
//    public void init(FilterConfig filterConfig) {
//    }
//
//    @Override
//    public void destroy() {
//    }
//}

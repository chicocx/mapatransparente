package org.mapatransparente.controle;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.mapatransparente.entidade.Vontade;
import org.mapatransparente.persistencia.VontadeDao;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

/**
 * Servlet implementation class RegistrarVontade
 */
@WebServlet("/RegistrarVontade")
public class RegistrarVontade extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RegistrarVontade() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		VontadeDao vontadeDao = ctx.getBean(VontadeDao.class);
		Vontade vontade = new Vontade();
		vontade.setNome(request.getParameter("nome"));
		vontade.setNome(request.getParameter("cep"));
		
		vontadeDao.incluir(vontade);
		response.sendRedirect("mapa1.jsp");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}

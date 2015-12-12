package org.mapatransparente.persistencia;

import org.springframework.stereotype.Repository;

import br.com.ambientinformatica.jpa.persistencia.PersistenciaJpa;

import org.mapatransparente.entidade.Usuario;

@Repository("usuarioDao")
public class UsuarioDao extends PersistenciaJpa<Usuario> {

   private static final long serialVersionUID = 1L;

}

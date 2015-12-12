package org.mapatransparente.persistencia;

import org.springframework.stereotype.Repository;

import br.com.ambientinformatica.jpa.persistencia.PersistenciaJpa;

import org.mapatransparente.entidade.Contato;

@Repository("contatoDao")
public class ContatoDao extends PersistenciaJpa<Contato>{

   private static final long serialVersionUID = 1L;

}

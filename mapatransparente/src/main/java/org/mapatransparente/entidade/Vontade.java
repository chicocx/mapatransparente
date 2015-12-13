package org.mapatransparente.entidade;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Vontade {

	@Id
	@GeneratedValue(generator="vontade_seq", strategy=GenerationType.SEQUENCE)
	@SequenceGenerator(name="vontade_seq", sequenceName="vontade_seq", allocationSize=1, initialValue=1)
	private Integer id;

	private Date data = new Date();

	private String nome;
	
	private String cep;

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Integer getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}
}

import { Types, Model } from 'mongoose';

import { NotFoundError } from 'src/common/NotFoundError';
import { UserRepositoty } from '../UserRepository';
import { User } from '../User';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDTO } from '../DTOs/UserDTO';


@Injectable()
export class MongoUserRepository implements UserRepositoty {

	constructor(@InjectModel("USER_MODEL") private readonly mongoUser: Model<any>) { }

	nextId() {
		return new Types.ObjectId().toHexString();
	}

	async save(novoUsuario) {
		const { id } = novoUsuario;
		const user = await this.mongoUser.findOneAndUpdate(
			{ _id: id },
			{
				$set: {
					...novoUsuario.toJson(),
				},
			},
			{ upsert: true, new: true })
			.then(data => {
				return data
			})
			.catch(err => new Error(err.message));

		return User.fromJson(user)

	}

	async buscarPorId(id) {
		const idValido = Types.ObjectId.isValid(id);
		if (idValido) {
			const usuario = await this.mongoUser.findById(id);
			if (usuario) {
				return User.fromJson(usuario);
			}
		}
		throw new NotFoundError({
			detail: `O usuário com id ${id} não está registrado!`,
			source: 'id',
		});
	}

	async obterUsuariosPorId(usuariosIds) {
		const lista = [];
		for (let index = 0; index < usuariosIds.length; index++) {
			const id = usuariosIds[index];
			const usuario = await this.buscarPorId(id);
			lista.push(usuario);
		}
		return lista;
	}

	async findByLogin(login) {
		const usuario = await this.mongoUser.findOne({ login }, '-__v')
			.then(res => res);

		if (!usuario) return null;

		return User.fromJson({ ...usuario._doc, id: usuario._id });
	}

	async obterUsuariosPorDominio(dominio) {
		const usuarios = await this.mongoUser.find({ dominio }, '-__v');
		if (!usuarios || usuarios.length === 0) {
			return null;
		}
		const lista = [];
		for (let index = 0; index < usuarios.length; index++) {
			const usuario = await User.fromJson(usuarios[index]);
			lista.push(usuario);
		}
		return lista;
	}

	async obterUsuariosPorPassaporte(passaporteNome = null) {
		const usuarios = await this.mongoUser.find(
			{ 'passaportes.nome': { $in: passaporteNome } },
			'-__v'
		);
		if (!usuarios || usuarios.length === 0) {
			return null;
		}
		const lista = [];
		for (let index = 0; index < usuarios.length; index++) {
			const usuario = await User.fromJson(usuarios[index]);
			lista.push(usuario);
		}
		return lista;
	}

	async remover(id) {
		await this.mongoUser.deleteOne({ _id: id });
	}

	async buscarPorLoginESenha(login, senha) {
		const usuario = await this.mongoUser.findOne({
			login: `${login}`,
			senha: `${senha}`,
		});
		if (!usuario) return null;

		return User.fromJson(usuario);
	}

	async autorizar(nomeUsuario, roles) {
		const [usuario] = await this.mongoUser.find({
			nomeUsuario,
			'passaportes.nome': { $in: roles },
		}).select('nomeUsuario ativo cpf nome passaportes.nome -_id');

		if (usuario) {
			return {
				autorizado: true,
				passaportes: usuario.passaportes,
				nome: usuario.nome,
				nomeUsuario: usuario.nomeUsuario,
				cpf: usuario.cpf,
				ativo: usuario.ativo,
			};
		}

		return {
			autorizado: false,
		};
	}

	async registrarAcesso({
		ip,
		usuario,
		formaAutenticacao,
		dataHora,
		sucesso,
		mensagem,
	}) {
		//TODO: Implementar log
		// const log = new LogAcesso({
		// 	ip,
		// 	usuario,
		// 	formaAutenticacao,
		// 	dataHora,
		// 	sucesso,
		// 	admin: false,
		// 	mensagem,
		// });
		// await log.save();
	}
}

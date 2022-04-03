import { Inject, Injectable } from "@nestjs/common";

import { Assertion } from "src/common/Assertion";
import { UserService } from "src/users/controllers/UserService";
import { User } from "../../User";

import { UserRepositoty } from "src/users/UserRepository";
import { BadRequestError } from "src/common/BadRequestError";

@Injectable()
export class CreateUserService extends Assertion implements UserService {
  constructor(
    @Inject("USER_REPOSITORY") private readonly repository: UserRepositoty
  ) {
    super();
  }

  async execute(
    newId,
    { name, login, cpf, domain, password, authenticationType, admin }
  ) {
    throw new BadRequestError({
      detail: "Teste de mensagem de erro",
      source: "name",
    });

    await this._validarLoginDuplicado(login);

    const user = new User({
      id: newId,
      name,
      login,
      cpf,
      domain,
      authenticationType,
    });

    if (password) user.password = password;

    user.addHistoric("Criação do usuário", admin);

    return await this.repository.save(user);
  }

  async _validarLoginDuplicado(login) {
    const userWithSameLogin = await this.repository
      .findByLogin(login)
      .then((res) => res)
      .catch((err) => console.log(err));

    this.assertFalse(
      userWithSameLogin,
      `O nome de usuário ${login} já está registrado, não pode ser duplicado!`,
      "login"
    );
  }
}

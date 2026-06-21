import { AuthRepository } from "../repositories/auth.repository";
import { mapUser } from "../utils/mapper.util";

export class AuthService {
  private authRepository = new AuthRepository();

  public login = async (email: string, password: string) => {
    try {
      const user: any = await this.authRepository.findByEmail(email);

      if (!user?.length) {
        return { status: "error", code: 404, message: "User not found" };
      }

      if (user[0].password !== password) {
        return { status: "error", code: 400, message: "Incorrect password" };
      }

      return {
        status: "success",
        code: 200,
        message: "Login successfully",
        user: mapUser(user[0]),
      };
    } catch (error) {
      console.error("LoginService", error);
      return { status: "error", code: 500, message: "Unable to login" };
    }
  };
}

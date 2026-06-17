import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

class AuthController {
    private authService = new AuthService();

    public login = async (req: Request, res: Response) => {
        const { email, password } = req.body ?? {};
        const response = await this.authService.login(email, password);
        return res.status(response.code).json(response);
    }
}

export default new AuthController();
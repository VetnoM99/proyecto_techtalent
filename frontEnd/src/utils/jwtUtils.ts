import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  exp: number;
  sub: string;
  [key: string]: any;
}

export const isValidJwt = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    // Verifica que el token sea un JWT válido
    return token.split('.').length === 3;
  } catch (error) {
    return false;
  }
};

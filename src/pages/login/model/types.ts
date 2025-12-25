export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse =
  | {
      success: true;
      message: string;
      isFirstLogin: boolean;
      isDuplicateLogin: boolean;
    }
  | {
      success: false;
      message: string;
    };

export type LogoutResponse =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export type RefreshTokenResponse =
  | {
      success: true;
      accessToken: string;
    }
  | {
      success: false;
      message: string;
    };

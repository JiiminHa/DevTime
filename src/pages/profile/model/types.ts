export interface PresignedUrlResponse {
  presignedUrl: string;
  key: string;
}

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
}

export type PurposeType =
  | '취업 준비'
  | '이직 준비'
  | '단순 개발 역량 향상'
  | '회사 내 프로젝트 원활하게 수행'
  | '';

export type Purpose =
  | PurposeType
  | {
      type: '기타';
      detail?: string;
    };

export interface ProfileRequest {
  career: string;
  purpose: Purpose;
  goal: string;
  techStacks: string[];
  profileImage: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
}

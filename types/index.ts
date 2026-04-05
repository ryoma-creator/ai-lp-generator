// LP生成結果の型定義
export interface LPContent {
  headline: string;
  subheadline: string;
  cta: string;
  features: Feature[];
  steps: Step[];
  finalCta: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
}

// 生成フォームの入力値
export interface GeneratorFormData {
  productName: string;
  productDescription: string;
}

// Supabaseのgenerationsテーブル
export interface Generation {
  id: string;
  user_id: string;
  product_name: string;
  product_description: string;
  generated_content: LPContent;
  created_at: string;
}

// レートリミットの保存データ
export interface RateLimitData {
  count: number;
  lastReset: number;
}

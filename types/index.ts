// トーンの選択肢
export type Tone = "professional" | "casual" | "urgent" | "friendly" | "luxury";

// LP生成結果の型定義
export interface LPContent {
  headline: string;
  headlineReason: string;
  subheadline: string;
  subheadlineReason: string;
  cta: string;
  features: Feature[];
  steps: Step[];
  finalCta: string;
  finalCtaReason: string;
}

export interface Feature {
  title: string;
  description: string;
  reason: string;
}

export interface Step {
  title: string;
  description: string;
}

// 生成フォームの入力値
export interface GeneratorFormData {
  productName: string;
  productDescription: string;
  targetAudience: string;
  tone: Tone;
}

// AIによるターゲット層候補
export interface AudienceSuggestion {
  label: string;
  description: string;
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

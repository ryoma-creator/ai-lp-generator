// トーンの選択肢
export type Tone = "professional" | "casual" | "urgent" | "friendly" | "luxury";

// ヘッドラインバリアント（A/B選択用）
export interface HeadlineVariant {
  text: string;
  angle: string;       // "Loss Aversion" | "Benefit-First" | "Curiosity" etc.
  reason: string;
  recommended: boolean;
}

// SEOメタデータパック
export interface SEOPack {
  metaTitle: string;        // 60文字以内
  metaDescription: string;  // 155文字以内
  ogTitle: string;
  ogDescription: string;
}

// コンポーネントレイアウト推薦
export interface LayoutRecommendation {
  sections: string[];   // e.g. ["Hero", "Features", "How It Works", "CTA"]
  reasoning: string;
}

// LP生成結果の型定義
export interface LPContent {
  headline: string;              // 推奨ヘッドライン（headlineVariants[recommended]と同値）
  headlineReason: string;
  headlineVariants: HeadlineVariant[];
  subheadline: string;
  subheadlineReason: string;
  cta: string;
  features: Feature[];
  steps: Step[];
  finalCta: string;
  finalCtaReason: string;
  seo: SEOPack;
  layout: LayoutRecommendation;
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

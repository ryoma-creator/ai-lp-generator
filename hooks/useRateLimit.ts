"use client";

import { useCallback, useEffect, useState } from "react";
import type { RateLimitData } from "@/types";

const STORAGE_KEY = "ai_lp_rate_limit";
const MAX_PER_DAY = 10;
const MAX_PER_MINUTE = 3;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// レートリミット管理フック
export function useRateLimit() {
  const [remaining, setRemaining] = useState(MAX_PER_DAY);

  // localStorageからデータを読み込み、残り回数を計算
  const loadData = useCallback((): RateLimitData => {
    if (typeof window === "undefined") return { count: 0, lastReset: Date.now() };

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, lastReset: Date.now() };

    const data: RateLimitData = JSON.parse(raw);
    // 24時間経過でリセット
    if (Date.now() - data.lastReset > ONE_DAY_MS) {
      return { count: 0, lastReset: Date.now() };
    }
    return data;
  }, []);

  useEffect(() => {
    const data = loadData();
    setRemaining(Math.max(0, MAX_PER_DAY - data.count));
  }, [loadData]);

  // 1分以内のリクエスト数を取得
  const getRecentCount = useCallback((): number => {
    if (typeof window === "undefined") return 0;
    const raw = localStorage.getItem(`${STORAGE_KEY}_recent`);
    if (!raw) return 0;
    const timestamps: number[] = JSON.parse(raw);
    const oneMinuteAgo = Date.now() - 60 * 1000;
    return timestamps.filter((t) => t > oneMinuteAgo).length;
  }, []);

  // リクエスト実行可能かチェックし、カウントを増やす
  const consume = useCallback((): { ok: boolean; error?: string } => {
    const data = loadData();

    if (data.count >= MAX_PER_DAY) {
      return { ok: false, error: "1日の生成上限（10回）に達しました。明日また試してください。" };
    }

    const recentCount = getRecentCount();
    if (recentCount >= MAX_PER_MINUTE) {
      return { ok: false, error: "1分間の上限（3回）に達しました。少し待ってから試してください。" };
    }

    // カウント更新
    const newData: RateLimitData = { count: data.count + 1, lastReset: data.lastReset };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

    // 直近タイムスタンプ更新
    const raw = localStorage.getItem(`${STORAGE_KEY}_recent`);
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const oneMinuteAgo = Date.now() - 60 * 1000;
    const recent = timestamps.filter((t) => t > oneMinuteAgo);
    recent.push(Date.now());
    localStorage.setItem(`${STORAGE_KEY}_recent`, JSON.stringify(recent));

    setRemaining(Math.max(0, MAX_PER_DAY - newData.count));
    return { ok: true };
  }, [loadData, getRecentCount]);

  return { remaining, consume, maxPerDay: MAX_PER_DAY };
}

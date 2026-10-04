import assert from "node:assert/strict";
import test from "node:test";
import { requestWithdrawal } from "./withdrawal-request.ts";

function createWithdrawalFixtures(overrides: {
  user?: Record<string, unknown>;
  settings?: Record<string, string>;
  todayCount?: number;
} = {}) {
  const updates: Array<{ userId: number; data: Record<string, unknown> }> = [];
  const createdWithdrawals: Array<Record<string, unknown>> = [];
  const user = {
    id: 42,
    fullName: "Utilisateur test",
    balance: "10000.00",
    hasActiveProduct: true,
    isWithdrawalBlocked: false,
    mustInviteToWithdraw: false,
    ...overrides.user,
  };
  const wallet = {
    id: 8,
    userId: 42,
    accountName: "Compte test",
    accountNumber: "000000000",
    paymentMethod: "Mobile Money",
    country: "TG",
    isDefault: true,
  };
  let nextWithdrawalId = 1;

  const storage = {
    async getUser(userId: number) {
      return userId === user.id ? user : undefined;
    },
    async getSettings() {
      return {
        minWithdrawal: "1000",
        maxWithdrawalsPerDay: "2",
        withdrawalFees: "20",
        ...overrides.settings,
      };
    },
    async getTeamStats() {
      return { level1Invested: 1 };
    },
    async getDefaultWallet() {
      return wallet;
    },
    async getUserWithdrawalCountToday() {
      return overrides.todayCount ?? 0;
    },
    async updateUser(userId: number, data: Record<string, unknown>) {
      updates.push({ userId, data });
      Object.assign(user, data);
      return user;
    },
    async createWithdrawal(data: Record<string, unknown>) {
      const withdrawal = { id: nextWithdrawalId++, ...data };
      createdWithdrawals.push(withdrawal);
      return withdrawal;
    },
  };

  return { storage, updates, createdWithdrawals, user, wallet };
}

test("standard authenticated withdrawal keeps ordinary fees and creates no deposit", async () => {
  const fixtures = createWithdrawalFixtures();

  const result = await requestWithdrawal(42, 5000, fixtures.storage);

  assert.equal(result.amount, 5000);
  assert.equal(result.netAmount, 4000);
  assert.equal(result.withdrawal.status, "pending");
  assert.deepEqual(fixtures.updates, [
    { userId: 42, data: { balance: "5000.00" } },
  ]);
  assert.deepEqual(fixtures.createdWithdrawals, [
    {
      id: 1,
      userId: 42,
      amount: 5000,
      netAmount: 4000,
      fees: 1000,
      accountName: fixtures.wallet.accountName,
      accountNumber: fixtures.wallet.accountNumber,
      country: fixtures.wallet.country,
      paymentMethod: fixtures.wallet.paymentMethod,
      status: "pending",
    },
  ]);
  assert.equal(
    "depositId" in fixtures.createdWithdrawals[0],
    false,
    "withdrawal should not link to a deposit",
  );
  assert.equal(
    "prepaymentId" in fixtures.createdWithdrawals[0],
    false,
    "withdrawal should not link to a prepayment",
  );
});

test("invalid withdrawal amount is rejected without changing balance or creating a withdrawal", async () => {
  const fixtures = createWithdrawalFixtures();

  await assert.rejects(
    requestWithdrawal(42, 500, fixtures.storage),
    { message: "Montant minimum: 1000 FCFA" },
  );

  assert.deepEqual(fixtures.updates, []);
  assert.deepEqual(fixtures.createdWithdrawals, []);
});
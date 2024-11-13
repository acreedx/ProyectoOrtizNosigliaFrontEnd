import { AccountStatus } from "@/enums/accountStatus";
import { Account } from "@prisma/client";

export const accountPorDefecto: Account = {
  billingStatus: AccountStatus.SIN_DEUDA,
  balance: 0.0,
} as Account;

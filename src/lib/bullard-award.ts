export type BullardAwardRecipient = {
  category: "officer" | "nco";
  categoryLabel: string;
  name: string;
  role?: string;
  unit?: string;
};

export type BullardAwardClass = {
  year: number;
  recipients: [BullardAwardRecipient, BullardAwardRecipient];
};

/** Most recent first. Add a new class each year after NGAFL / St. Barbara's presentation. */
export const BULLARD_AWARD_RECIPIENTS: BullardAwardClass[] = [
  {
    year: 2026,
    recipients: [
      {
        category: "officer",
        categoryLabel: "Officer of the Year",
        name: "CPT Jacob Rinus",
        role: "Assistant S3 / B BTRY Commander",
        unit: "3-116 FA",
      },
      {
        category: "nco",
        categoryLabel: "NCO of the Year",
        name: "SSG Derick L. Bryant",
        role: "FDC Chief, A BTRY",
        unit: "2-116 FA",
      },
    ],
  },
  {
    year: 2025,
    recipients: [
      {
        category: "officer",
        categoryLabel: "Officer of the Year",
        name: "1LT Mason Saldana",
      },
      {
        category: "nco",
        categoryLabel: "NCO of the Year",
        name: "SSG Samuel Szeltner",
      },
    ],
  },
];

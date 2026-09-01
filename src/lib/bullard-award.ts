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
        unit: "2-116 FA",
      },
      {
        category: "nco",
        categoryLabel: "NCO of the Year",
        name: "SSG Samuel Szeltner",
        unit: "2-116 FA",
      },
    ],
  },
  {
    year: 2024,
    recipients: [
      {
        category: "officer",
        categoryLabel: "Officer of the Year",
        name: "1LT Merrill Lefan",
        unit: "2-116 FA",
      },
      {
        category: "nco",
        categoryLabel: "NCO of the Year",
        name: "SSG Garrett Ifland",
        unit: "2-116 FA",
      },
    ],
  },
  {
    year: 2023,
    recipients: [
      {
        category: "officer",
        categoryLabel: "Officer of the Year",
        name: "1LT Zachary Hammock",
        unit: "3-116 FA",
      },
      {
        category: "nco",
        categoryLabel: "NCO of the Year",
        name: "SSG Jason Eschenfelder",
        unit: "2-116 FA",
      },
    ],
  },
  {
    year: 2022,
    recipients: [
      {
        category: "officer",
        categoryLabel: "Officer of the Year",
        name: "SSG Justin Palidini",
        unit: "3-116 FA",
      },
      {
        category: "nco",
        categoryLabel: "NCO of the Year",
        name: "SSG Christopher McAlister",
        unit: "2-116 FA",
      },
    ],
  },
  {
    year: 2021,
    recipients: [
      {
        category: "officer",
        categoryLabel: "Officer of the Year",
        name: "1LT Joseph Maher",
        unit: "2-116 FA",
      },
      {
        category: "nco",
        categoryLabel: "NCO of the Year",
        name: "SGT Edward Hardiman",
        unit: "3-116 FA",
      },
    ],
  },
  {
    year: 2019,
    recipients: [
      {
        category: "officer",
        categoryLabel: "Officer of the Year",
        name: "1LT Alexander Collini",
        unit: "3-116 FA",
      },
      {
        category: "nco",
        categoryLabel: "NCO of the Year",
        name: "SGT David Donaldson",
        unit: "2-116 FA",
      },
    ],
  },
];

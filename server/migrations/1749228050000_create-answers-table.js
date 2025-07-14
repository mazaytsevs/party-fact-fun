export const up = (pgm) => {
  pgm.createTable("answers", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    fact_id: {
      type: "integer",
      notNull: true,
      references: '"facts"',
      onDelete: "cascade",
    },
    correct: { type: "boolean", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable("answers");
};

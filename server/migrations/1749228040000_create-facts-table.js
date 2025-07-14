export const up = (pgm) => {
  pgm.createTable("facts", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    fact: { type: "text" },
    ai_fact: { type: "text" },
    ai_title: { type: "text" },
    ai_image: { type: "text" },
  });
};

export const down = (pgm) => {
  pgm.dropTable("facts");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: { type: "text", notNull: true },
    email: { type: "text", notNull: true, unique: true },
  });
};

export const down = (pgm) => {
  pgm.dropTable("users");
};

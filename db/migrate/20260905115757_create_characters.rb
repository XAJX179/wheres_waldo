class CreateCharacters < ActiveRecord::Migration[8.0]
  def change
    create_table :characters do |t|
      t.integer :serial_no
      t.string :name
      t.decimal :x, precision: 10, scale: 2
      t.decimal :y, precision: 10, scale: 2
      t.integer :x_expand
      t.integer :y_expand

      t.timestamps
    end
  end
end

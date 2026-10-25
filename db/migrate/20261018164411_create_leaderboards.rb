class CreateLeaderboards < ActiveRecord::Migration[8.0]
  def change
    create_table :leaderboards do |t|
      t.string :name
      t.references :game_session, null: false, foreign_key: true

      t.timestamps
    end
  end
end

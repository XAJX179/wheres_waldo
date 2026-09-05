class CreateGameSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :game_sessions do |t|
      t.datetime :started_at
      t.datetime :ended_at
      t.string :characters_found

      t.timestamps
    end
  end
end

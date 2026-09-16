class GameSessionController < ApplicationController
  def create
    unless current_game_session
      @current_game_session = GameSession.new(characters_found: "", started_at: Time.now)
      if @current_game_session.save
        session[:game_session_id] = @current_game_session.id
        head :ok
      else
        head 500
      end
    end
  end
end

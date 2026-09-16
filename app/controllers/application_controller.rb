class ApplicationController < ActionController::API
  private
  def current_game_session
    @current_game_session ||= GameSession.find_by(id: session[:game_session_id])
  end
end

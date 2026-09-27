class ApplicationController < ActionController::API
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  after_action :set_csrf_token

  private
  def current_game_session
    @current_game_session ||= GameSession.find_by(id: session[:game_session_id])
  end

  def set_csrf_token
    response.headers["x-csrf-token"] = form_authenticity_token
  end
end

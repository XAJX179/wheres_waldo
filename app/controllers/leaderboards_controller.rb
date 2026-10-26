class LeaderboardsController < ApplicationController
  def index
    l = Leaderboard.includes(:game_session).order(Arel.sql("game_session.ended_at - game_session.started_at")).limit(20)
    result = l.map  do |i|
      {
        id: i.id,
        name: i.name,
        time: (i.game_session.ended_at - i.game_session.started_at).truncate(2).to_s + " seconds"
      }
    end
    render json: result
  end

  def create
    if current_game_session.characters_found.length == 5 && params[:name].length > 1
      name = params[:name]
      l = Leaderboard.new(name: name, game_session: current_game_session)
      l.save
      reset_session
      head :ok
    else
      head :bad_request
    end
  end
end
